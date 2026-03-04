import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs/promises';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

async function startServer() {
  const app = express();
  const PORT = 3004;

  app.use(express.json());

  // API Endpoints
  app.get("/api/internships", async (req, res) => {
    const { role, skill, location } = req.query;
    let query = supabase.from('internships').select('*');

    if (role) {
      query = query.ilike('role', `%${role}%`);
    }
    if (skill) {
      const skills = (skill as string).split(',').map(s => s.trim()).filter(s => s !== '');
      if (skills.length > 0) {
        const skillQueries = skills.map(s => `skills.ilike.%${s}%`).join(',');
        query = query.or(skillQueries);
      }
    }
    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    const { data: internships, error } = await query;
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const { data: savedInternships, error: savedError } = await supabase.from('saved_internships').select('internship_id');
    if (savedError) {
      return res.status(500).json({ error: savedError.message });
    }
    const savedSet = new Set(savedInternships.map(s => s.internship_id));

    res.json(internships.map(i => ({
      ...i,
      isSaved: savedSet.has(i.id)
    })));
  });

  app.post("/api/saved/toggle", async (req, res) => {
    const { internshipId } = req.body;
    if (!internshipId) return res.status(400).json({ error: "Missing internshipId" });

    const { data: existing, error: existingError } = await supabase.from('saved_internships').select('*').eq('internship_id', internshipId).single();

    if (existing) {
      const { error } = await supabase.from('saved_internships').delete().eq('internship_id', internshipId);
      if (error) return res.status(500).json({ error: error.message });
      res.json({ saved: false });
    } else {
      const { error } = await supabase.from('saved_internships').insert({ internship_id: internshipId });
      if (error) return res.status(500).json({ error: error.message });
      res.json({ saved: true });
    }
  });

  app.get("/api/saved", async (req, res) => {
    const { data, error } = await supabase.rpc('get_saved_internships');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  app.post("/api/apply", async (req, res) => {
    const { internshipId, applicantName } = req.body;
    if (!internshipId || !applicantName) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const { data, error } = await supabase.from('applications').insert({ internship_id: internshipId, applicant_name: applicantName }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true, applicationId: data.id });
  });

  app.post("/api/recommend", async (req, res) => {
    const recommendations = await fs.readFile('recommendations.json', 'utf-8');
    res.json(JSON.parse(recommendations));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
