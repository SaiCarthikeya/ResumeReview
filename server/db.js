const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const initializeDb = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS resumes (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) NOT NULL,
      analysis JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(queryText);
    console.log("Database table 'resumes' is ready.");
  } catch (err) {
    console.error("Error initializing database table:", err);
  }
};

module.exports = { pool, initializeDb };