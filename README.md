# 🕒 ScheduleGenie

AI-Powered Schedule Generator for Optimized Daily Planning.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Usage](#-usage) • [Roadmap](#-roadmap) • [Project Structure](#-project-structure)

---

## 🔍 Overview

ScheduleGenie is a full-stack, AI-native scheduling application designed to construct and optimize daily routines. Users specify goals, available daily hours, and total timeframe, and the system automatically parses and structures a comprehensive day-by-day roadmap.

Think of it as a personalized, AI-native alternative to static calendar tools, combining the intelligence of Google Gemini with the responsive user experience of Shadcn UI.

---

## ✨ Features

- 🧠 **AI-Generated Schedules** — Integrates Google's Gemini 1.5 Flash model to intelligently divide and schedule work blocks into tailored morning and afternoon blocks.
- 🔐 **Secure Google Authentication** — Utilizes Firebase Authentication to provide quick, secure Google Sign-in and persistent sessions.
- 💾 **Persistent Cloud Storage** — Saves user choices and generated timetables in Firestore for access across devices.
- 🎨 **Responsive Glassmorphic UI** — Implemented with Tailwind CSS, custom design choices, and subtle animations for a premium responsive layout.
- 🗑️ **Interactive Dashboard** — Inspect all previously generated timetables, view deep-dive outlines, and delete inactive schedules.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Core** | [React (v18.3.1)](https://react.dev/) |
| **Build & Run Tool** | [Vite (v5.4.1)](https://vite.dev/) |
| **Styling & Theme** | [Tailwind CSS (v3.4.10)](https://tailwindcss.com/) |
| **Design System** | [Shadcn UI](https://ui.shadcn.com/) |
| **Core Primitives** | [Radix UI](https://www.radix-ui.com/) |
| **Typography & Icons** | [Lucide React (v0.439.0)](https://lucide.dev/) |
| **AI Integration** | [Google Generative AI SDK (v0.17.1)](https://ai.google.dev/) |
| **Database & Auth** | [Firebase (v10.13.1)](https://firebase.google.com/) |
| **Routing** | [React Router DOM (v6.26.1)](https://reactrouter.com/) |
| **Form Handling** | [React Hook Form (v7.53.0)](https://react-hook-form.com/) |
| **Schema Validation** | [Zod (v3.23.8)](https://zod.dev/) |
| **Toast Notifier** | [Sonner (v1.5.0)](https://github.com/emilkowalski/sonner) |

---

## 📐 Architecture

ScheduleGenie is designed as a single-page application (SPA) built on React, Vite, and TypeScript. All logic layers are cleanly separated: front-end presentation (`src/pages`), UI elements (`src/components/ui`), core helper hooks/utilities (`src/lib`), and backend storage/AI connection wrappers (`src/Firebase`).

### System Top-Level Structure

```
ScheduleGenie/
├── public/               # Static assets & banner graphics
├── src/
│   ├── assets/           # App media and assets
│   ├── components/       # Shadcn UI and custom components
│   │   ├── shared/       # Cross-page shared components
│   │   └── ui/           # Radix UI wrapper primitives
│   ├── Firebase/         # Firestore database functions and Gemini setup
│   ├── lib/              # Styling helpers and Zod validators
│   ├── pages/            # View pages (Home, Dashboard, Create, Info)
│   ├── App.tsx           # Entry routing and user auth state watcher
│   ├── main.tsx          # Render tree root mounting
│   └── index.css         # Main stylesheet importing Google SUSE font
```

### Module Breakdown & Code Snippets

#### 1. Form Validation (`src/pages/CreateSchedule.tsx`)
Zod validates user input before sending data to the Gemini model API to prevent empty or faulty requests:

```typescript
export const formSchema = z.object({
  title: z.string().min(6, 'The title must be at least 6 characters'),
  hours: z.number().min(2, 'Min number of hours must be less than 2').max(18, 'Max number of hours must be less than 18'),
  days: z.number()
    .min(2, { message: "The minimum should be 2 days" })
    .max(10, { message: "The minimum should less than 10 days" }),
  task: z.string().min(6, 'The task must be at least 6 characters'),
})
```

#### 2. Gemini AI Integration (`src/Firebase/AIModel.tsx`)
Uses `gemini-1.5-flash` with a JSON-mode generation config to obtain structured schedule payloads:

```typescript
export const ai_prompt = "Create a schedule for {task} for {days} days working for {hours} hours a day dividing the day in afternoon and morning with objects containing task, duration and description in JSON format"

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};
```

#### 3. Database Schema Interface (`src/Firebase/functions.ts`)
The Firestore storage shape defines how scheduling records are structured and saved:

```typescript
export type ScheduleType = {
    id: string,
    useremail: string,
    userSeletion: {
        days: number,
        hours: number,
        task: string,
        title: string
    },
    scheduledata: {
        [dayKey: string]: {
            afternoon: { description: string, duration: string, task: string }[],
            morning: { description: string, duration: string, task: string }[]
        }
    }
}
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** — `v18.x` or higher
- **npm** or **yarn** package manager
- **Firebase Account** — To configure Auth and Firestore database
- **Gemini API Key** — From Google AI Studio

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Omkar-kamble82/ScheduleGenie.git
   cd ScheduleGenie
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the root directory and add the following keys:

```bash
# Firebase Client SDK Configuration
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_ID=your_firebase_app_id

# Google Gemini AI Config
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Database & Build Setup
1. Create a Firebase project in the Console.
2. Enable **Google Authentication** provider under **Build > Authentication > Sign-in method**.
3. Create a **Cloud Firestore** database. Add a collection named `UsersSG` and a collection named `Schedules`.
4. Deploy rules to allow read/write authorization filters if running in production mode.

### Running
To launch the Vite development server locally:
```bash
npm run dev
```
The server will boot on `http://localhost:5173`.

---

## 💡 Usage

### Available CLI Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Vite local development server on `localhost:5173`. |
| `npm run build` | Runs the TypeScript compiler and compiles production assets into `dist/`. |
| `npm run lint` | Runs ESLint analysis checks across the source tree. |
| `npm run preview` | Spins up a local server to preview the built package in `dist/`. |

---

## 🗺️ Roadmap

- [ ] Calendar sync capabilities (direct Google Calendar & Outlook calendar import export)
- [ ] Interactive task prioritization levels (Low / Medium / High priority flags)
- [ ] Task completion checkboxes and percentage tracker to display progress
- [ ] Desktop notifications / browser alerts for upcoming daily blocks
- [ ] Export schedule to PDF, CSV, or shareable URL links
- [ ] Real-time time-slot adjustment tips powered by Gemini suggestions

---

## 📂 Project Structure

<details>
<summary>Full file tree</summary>

```
ScheduleGenie/
├── public/
│   ├── banners/              # Banner graphics displayed randomly for schedule cards
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   ├── 3.jpg
│   │   ├── 4.jpg
│   │   ├── 5.jpg
│   │   ├── 6.jpg
│   │   └── 7.jpg
│   ├── banner.jpeg           # Hero background banner
│   ├── banner.png            # Hero banner illustration
│   ├── icon.png              # Website favicon
│   ├── loading.gif           # Spinner gif shown during AI scheduling execution
│   ├── logo.png              # App branding logo
│   ├── not-found.jpg         # 404 page banner
│   └── vite.svg              # Vite default logo
├── src/
│   ├── Firebase/
│   │   ├── AIModel.tsx       # Configures Gemini 1.5 Flash chat session and templates the AI prompt
│   │   ├── config.ts         # Initializes Firebase App, Auth, Firestore, and Storage with environment variables
│   │   └── functions.ts      # Authentication (Login/Logout) and database CRUD (set, get, list, delete schedules)
│   ├── components/
│   │   ├── shared/
│   │   │   ├── BudgetDropdown.tsx  # Unused legacy component from prototype
│   │   │   ├── Dayschedule.tsx     # Displays structured morning/afternoon tasks for a single day
│   │   │   ├── Loading.tsx         # Displays full-screen loading state with custom message
│   │   │   ├── Menu.tsx            # Navigation dropdown for authed users
│   │   │   ├── Navbar.tsx          # Responsive navbar managing login/menu visual logic
│   │   │   └── PeopleDropdown.tsx  # Unused legacy component from prototype
│   │   └── ui/
│   │       ├── button.tsx          # Shadcn Button component
│   │       ├── dropdown-menu.tsx   # Shadcn Dropdown Menu component
│   │       ├── form.tsx            # Shadcn Form controller utilizing react-hook-form
│   │       ├── input.tsx           # Shadcn Input text field
│   │       ├── label.tsx           # Shadcn Label element
│   │       ├── select.tsx          # Shadcn Select dropdown element
│   │       ├── sonner.tsx          # Shadcn Toast notifier
│   │       └── textarea.tsx        # Shadcn Textarea element
│   ├── lib/
│   │   ├── utils.ts          # Helper function to merge Tailwind classes using clsx & tailwind-merge
│   │   └── validator.ts      # Legacy validator schema file
│   ├── pages/
│   │   ├── CreateSchedule.tsx# Form page to input schedule criteria and dispatch Gemini API call
│   │   ├── Home.tsx          # Landing hero page containing the Google Login portal
│   │   ├── Notfound.tsx      # 404 error page
│   │   ├── ScheduleInfo.tsx  # Detail view showcasing the structured AI-generated timeline per day
│   │   └── Schedules.tsx     # Dashboard grid listing all historical schedules created by the user
│   ├── App.tsx               # Main routing map and global Auth state sync handler
│   ├── index.css             # Entry stylesheet importing Tailwind directives and Google SUSE font
│   ├── main.tsx              # React mounting root
│   └── vite-env.d.ts         # TypeScript Vite environment definitions
├── .gitignore                # Specified files to ignore in Git
├── components.json           # Tailwind paths and aliases configuration for Shadcn UI
├── eslint.config.js          # ESLint rules and settings
├── index.html                # Entry point HTML document
├── package-lock.json         # Lock file for npm dependency tree
├── package.json              # Project script runner configurations and third-party dependencies list
├── postcss.config.js         # CSS compiler postprocessing settings for Tailwind
├── tailwind.config.js        # Theme palette mapping and plugins (e.g., custom colors, tailwindcss-animate)
├── tsconfig.app.json         # TypeScript configuration for the React application
├── tsconfig.json             # Root TypeScript compiler ruleset
├── tsconfig.node.json        # TypeScript configuration for Vite/Node files
└── vercel.json               # SPA routing rewrite rule target for Vercel deployments
```
</details>
