import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

const seedData = [
    { company: "TechNova", role: "Frontend Intern", stipend: "$500/mo", location: "Downtown Tech Hub", lat: 40.7128, lng: -74.0060, skills: "React, Tailwind", description: "Help build our next-gen dashboard." },
    { company: "GreenLoop", role: "Sustainability Analyst", stipend: "$400/mo", location: "Eco District", lat: 40.7306, lng: -73.9352, skills: "Data Analysis, Python", description: "Analyze environmental impact data." },
    { company: "DesignFlow", role: "UI/UX Intern", stipend: "$600/mo", location: "Creative Quarter", lat: 40.7580, lng: -73.9855, skills: "Figma, Adobe XD", description: "Create stunning user interfaces." },
    { company: "CodeCrafters", role: "Backend Intern", stipend: "$550/mo", location: "Silicon Alley", lat: 40.7484, lng: -73.9857, skills: "Node.js, SQL", description: "Optimize our server-side logic." },
    { company: "MarketMind", role: "Digital Marketing Intern", stipend: "$450/mo", location: "Business Bay", lat: 40.7061, lng: -74.0092, skills: "SEO, Content Writing", description: "Grow our social media presence." }
];

async function seed() {
    const { data, error } = await supabase.from('internships').insert(seedData);
    if (error) {
        console.error('Error seeding data:', error);
    } else {
        console.log('Data seeded successfully:', data);
    }
}

seed();