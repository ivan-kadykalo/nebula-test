## Getting Started
- Install dependencies
    ```bash
    npm install # or yarn or pnpm or bun
    ````
- Run the development server:
    ```bash
    npm run dev # or yarn or pnpm or bun
    ```
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## About project
A dynamic quiz engine which delivers fast, interactive personality quizzes with flexible content control.

**Deployed on Vercel**
- [Live demo](https://quiz-engine.vercel.app/) -

### Tech Stack:
- **Framework:** Next.js (with SSG & ISR)
- **UI:** React + Tailwind CSS
- **State Management:** Redux Toolkit (with local persistence)
- **Language:** TypeScript

### Key Features & Implementation
- **Fast Data Fetching:** Pages are rendered using Static Site Generation (SSG) and Incremental Static Regeneration (ISR) for optimal performance.
- **State-Driven Quiz Logic:** Each quiz uses a dedicated Redux store. Progress is synced to localStorage via redux-persist, so users can reload or return later and continue from the exact point they left off — the full state is preserved across sessions.
- **Single-Route Navigation:** The quiz experience is fully managed on a single page, with state-driven rendering. It supports back/forward navigation and restores previously selected answers.
- **Dynamic Text Parsing:** A built-in template parser enables dynamic content generation (e.g., titles, descriptions) based on user answers.
- **Flexible Slide System:** Currently supports next types of slides:
  - single-choice-question
  - info
  (The system is designed to be easily extendable with additional slide types.)
- **Fully Configurable via JSON:** Quizzes are defined entirely through structured JSON files, allowing:
  - branching logic (different flows based on answers),
  - dynamic values in content,
  - customizable structure.
  
  → See /src/data/quizzes/README.md for full configuration documentation.
