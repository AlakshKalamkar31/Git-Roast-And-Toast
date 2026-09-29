# Code Roaster 🍳🔥
> *Your code. Our problem now.*

Code Roaster is an AI-powered developer tool that critiques user-submitted code with hilarious Hinglish roasts and delivers structured diagnostics, severity-categorized issues, and corrected code.

Built with an **architectural blueprint / technical drafting desk** aesthetic.

---

## ✨ Features
- **3 Roast Intensities**: Dry, Sharp, and Savage.
- **8 Supported Languages**: Python, JavaScript, TypeScript, Java, C, C++, Go, and Rust.
- **Compiler / Traceback Drawer**: Attach error tracebacks for contextual roasting.
- **Architectural Report**:
  - `01 // ROAST`: Witty critique powered by Gemini.
  - `02 // WHAT'S WRONG`: Issues categorized by `FATAL BUG`, `CODE SMELL`, and `OPTIMIZATION`.
  - `03 // FIX`: Corrected code with one-click copy and "Apply to Editor" support.
  - `04 // TAKEAWAY`: Actionable engineering advice.
- **Drafting Desk Aesthetics**: Monospace typography, hairline borders, technical drafting grid, and keyboard shortcuts (`Ctrl+Enter` / `⌘+Enter`).

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI & Styling**: React 19, Tailwind CSS v4
- **AI Engine**: Google Gemini API via official `@google/genai` SDK (`gemini-3.5-flash-lite`)
- **Typography**: Space Grotesk & JetBrains Mono

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/AlakshKalamkar31/Git-Roast-And-Toast.git
cd Git-Roast-And-Toast
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Get a free Gemini API key at [Google AI Studio](https://aistudio.google.com/apikey))*

### 4. Verify API connection
```bash
npm run check:api
```

### 5. Run local dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏛️ Credits
Made at **GDG Nashik Pre-DevFest Workshop**.
