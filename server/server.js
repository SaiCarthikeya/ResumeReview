const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const { pool, initializeDb } = require('./db');

const app = express();
const port = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

// --- Gemini AI Setup ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// --- The Gemini Prompt ---
const getGeminiPrompt = (resumeText) => {
    return `
    You are an expert technical recruiter and career coach. Analyze the following resume text and provide a detailed analysis in a structured JSON format.

    Your response MUST be a single, valid JSON object and nothing else. Do not include any text before or after the JSON object.

    JSON Structure:
    {
      "personalDetails": {
        "name": "string",
        "email": "string",
        "phone": "string",
        "links": ["linkedin_url", "portfolio_url"]
      },
      "content": {
        "summary": "string",
        "experience": [{ "jobTitle": "string", "company": "string", "duration": "string", "responsibilities": ["string"] }],
        "education": [{ "degree": "string", "institution": "string", "year": "string" }],
        "projects": [{ "name": "string", "description": "string", "technologies": ["string"] }]
      },
      "skills": {
        "technical": ["string"],
        "soft": ["string"]
      },
      "aiFeedback": {
        "rating": "number (1-10)",
        "summary": "string (A concise summary of strengths and weaknesses)",
        "improvements": ["string (Actionable feedback points)"],
        "upskilling": ["string (Suggested skills to learn based on the resume)"]
      }
    }

    Resume Text:
    ---
    ${resumeText}
    ---
    `;
};

// --- API Routes ---

// 1. Upload and Analyze Resume
app.post('/api/upload', upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    // 1. Parse PDF to text
    const data = await pdf(req.file.buffer);
    const resumeText = data.text;

    // 2. Call Gemini for analysis
    const prompt = getGeminiPrompt(resumeText);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const analysisData = JSON.parse(responseText.replace(/```json|```/g, '').trim());

    // 3. Save to Database
    const dbResult = await pool.query(
      'INSERT INTO resumes (filename, analysis) VALUES ($1, $2) RETURNING *',
      [req.file.originalname, analysisData]
    );

    // 4. Send back to client
    res.status(201).json(dbResult.rows[0].analysis);

  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({ error: 'Failed to analyze resume.' });
  }
});

// 2. Get All Analyzed Resumes (for History Table)
app.get('/api/resumes', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, filename, created_at, 
              analysis->'personalDetails'->>'name' as name, 
              analysis->'personalDetails'->>'email' as email 
       FROM resumes ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resume history.' });
  }
});

// 3. Get Full Details for a Single Resume
app.get('/api/resumes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT analysis FROM resumes WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Resume not found.' });
      }
      res.json(result.rows[0].analysis);
    } catch (error) {
      console.error('Error fetching resume details:', error);
      res.status(500).json({ error: 'Failed to fetch resume details.' });
    }
});


// --- Start Server ---
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  initializeDb();
});