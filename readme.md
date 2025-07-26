# 📄 Resume Analyzer AI

A full-stack web application designed to help users improve their resumes. It leverages the power of Google's Gemini LLM to provide automated analysis, structured feedback, and actionable insights.

## 📱 Screenshots

- **Main Upload Page:** `main-upload-page.png`
  ![Main Upload Page](./screenshots/main-upload-page.png)

- **Analysis Result View:** `analysis-result-view.png`
  ![Analysis Result View](./screenshots/analysis-result-view.png)

- **History Viewer:** `history-viewer.png`
  ![History Viewer](./screenshots/history-viewer.png)


---

## ✨ Features

* **AI-Powered Analysis:** Upload a resume in PDF format to have its text extracted and analyzed by the Gemini LLM.
* **Structured Data Extraction:** Automatically identifies and structures key information like personal details, work experience, education, projects, and skills.
* **Actionable Feedback:** Receive a resume rating on a 1-10 scale, a summary of improvement areas, and a list of suggested skills for upskilling.
* **Historical Viewer:** Browse all past analyses in a clean, responsive table.
* **Detailed Modal View:** Click on any historical entry to view its full, detailed analysis without leaving the page.
* **Modern & Responsive UI:** Built with React, Vite, and Tailwind CSS for a seamless experience on any device.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, Heroicons, Axios
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **AI Model:** Google Gemini API (`@google/generative-ai`)
* **File Handling:** `multer` (for uploads), `pdf-parse` (for text extraction)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:
* [Node.js](https://nodejs.org/) (v18.x or later)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* A running PostgreSQL instance (either locally or a free cloud instance from services like [Supabase](https://supabase.com) or [Neon](https://neon.tech)).

---

## 🚀 Setup and Installation

Follow these steps to get the application running locally.

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/SaiCarthikeya/ResumeReview.git](https://github.com/SaiCarthikeya/ResumeReview.git)
    cd resume-analyzer
    ```

2.  **Backend Setup**
    * Navigate to the server directory:
        ```bash
        cd server
        ```
    * Install backend dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `server` directory. Use the structure below:
        ```env
        # The port for your backend server
        PORT=5001

        # Your PostgreSQL connection string
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

        # Your Google AI (Gemini) API Key
        GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
        ```
        See the **Environment Variables** section below for more details.
    * Start the backend server:
        ```bash
        node server.js
        ```
        The server should now be running on `http://localhost:5001`.

3.  **Frontend Setup**
    * Open a new terminal window and navigate to the client directory:
        ```bash
        cd client
        ```
    * Install frontend dependencies:
        ```bash
        npm install
        ```
    * Start the Vite development server:
        ```bash
        npm run dev
        ```

4.  **Launch the App**
    Open your web browser and navigate to `http://localhost:5173` (or whatever port your Vite server is running on). You should now see the application!

---

## 🔑 Environment Variables

To run this project, you need to create a `.env` file in the `/server` directory with the following variables:

* `PORT`: The port on which your Express backend will run. Defaults to `5001`.
* `DATABASE_URL`: The full connection string for your PostgreSQL database.
    * Example: `postgresql://postgres:mysecretpassword@db.example.com:5432/mydatabase`
* `GEMINI_API_KEY`: Your API key from the [Google AI Studio](https://aistudio.google.com/).

---

## 🌐 API Endpoints

The backend server provides the following REST API endpoints:

| Method | Endpoint         | Description                                     |
| :---   | :---             | :---                                            |
| `POST` | `/api/upload`    | Uploads a PDF resume for analysis.              |
| `GET`  | `/api/resumes`   | Retrieves a list of all past resume analyses.   |
| `GET`  | `/api/resumes/:id` | Retrieves the full details for a single analysis. |