
---

```markdown
# 🌍 Hyperlocal Internship Finder

An AI-first platform designed to **connect Tier 3 students with local internship opportunities**.  
This project integrates **scraping, AI matching, recruiter insights, and automation workflows** to democratize access to internships.

---

## 📘 Case Study & Resources

- **Case Study Deck (Google Stitch):** [View Deck](https://stitch.withgoogle.com/projects/5246867398106838461)  
- **Miro Board (Research & Flows):** [View Miro](https://miro.com/app/board/uXjVG3HpbzE=/?share_link_id=715179393918)  
- **Visily.ai Designs (UI Mockups):** [View Designs](https://app.visily.ai/projects/4c37c480-dc38-4bdc-a1f2-5aa965698596/boards/2510657)  
- **Jira Roadmap:** [View Jira](https://sfcollab.atlassian.net/jira/polaris/projects/HI/ideas/view/11488203?fullscreen=true)  

---

## 🛠️ Tech Stack

- **Frontend:** Lovable, Bolt.new, Google AI Studio  
- **Backend:** Node.js + Express (via Trae.ai orchestration)  
- **Database & Auth:** Supabase (Postgres + Auth)  
- **AI Layer:**  
  - OpenAI → Skill-role matching  
  - Claude → Fit evaluation  
  - Nvidia → Recommendation engine  
- **Workflows:** n8n, Make.com  
- **Analytics:** Mixpanel  
- **Design:** Visily.ai, Miro  
- **Testing:** Postman  

---

## 🚀 Run Locally

**Prerequisites:** Node.js, Supabase project, API keys

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/hyperlocal-internship-finder.git
   cd hyperlocal-internship-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set environment variables in `.env.local`:
   ```bash
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   GEMINI_API_KEY=your_google_ai_studio_key
   ```

4. Run the app:
   ```bash
   npm run dev
   ```

---

## 📂 Database Schema (Supabase/Postgres)

- **users** → student profiles  
- **internships** → scraped listings (company, role, stipend, location)  
- **applications** → student applications + status  
- **recommendations** → AI-matched internship suggestions  
- **analytics_events** → logs for Mixpanel sync  

---

## 🔗 API Endpoints (Express + Node.js)

- `GET /internships` → Fetch internship listings  
- `POST /apply` → Submit application  
- `POST /recommend` → AI skill-role matching  

---

## 📊 Analytics (posthog)

Tracked events:
- `internship_searched`
- `internship_viewed`
- `internship_applied`
- `recommendation_received`

Dashboards:
- Funnel: search → view → apply  
- Retention: weekly active users  
- Engagement: recommendation adoption  

---

## 🎨 Design & Collaboration

- **Visily.ai:** UI mockups (map dashboard, internship cards, filters)  
- **Miro:** Personas, journey maps, prioritization matrix  
- **Jira:** Roadmap with sprints (Scraper → AI Matching → Recruiter Dashboard → Predictor)  

---

## ✅ Testing

- Postman collections for `/internships`, `/apply`, `/recommend` endpoints  
- Automated tests for API response validation  

---

## 🏁 Roadmap

- **Phase 1:** Internship Scraper + Map UI  
- **Phase 2:** AI Matching Engine  
- **Phase 3:** Recruiter Dashboard  
- **Phase 4:** Placement Probability Predictor  

---

## 📜 License
MIT License © 2026 Mohammad Razeen Iqbal
```

