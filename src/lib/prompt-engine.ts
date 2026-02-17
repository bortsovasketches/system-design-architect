import { DesignSystem } from './data';

interface DesignData {
    overview: string;
    points: string[];
    diagram: string;
    metrics?: Record<string, string>;
}

interface ScaffPrompt {
    situation: string;
    challenge: string;
    audience: string;
    format: string;
    foundations: string;
    fullPrompt: string;
}

export function generateScaffPrompt(systemName: string, level: string, data: DesignData): ScaffPrompt {
    // 1. Situation: High-level context - SCOPED DOWN
    const situation = `You are an expert Application Architect. I need you to build a **scoped-down MVP demo** of a "${systemName}" style application. The goal is NOT a full production app, but a **functional prototype for 1-2 users** that demonstrates the **core user journey** as simply as possible.`;

    // 2. Challenge: Technical constraints & hidden context
    // We extract "hidden" context from metrics and points
    const constraints = Object.entries(data.metrics || {})
        .map(([k, v]) => `- **${k}**: ${v}`)
        .join('\n');

    const challenge = `The focus is on the **KEY USER JOURNEY** only. Do not over-engineer.
    
    Context & Constraints:
    ${constraints}
    
    Architectural Essence:
    ${data.overview}
    
    Key Points:
    ${data.points.map(p => `- ${p}`).join('\n')}`;

    // 3. Audience: The AI Editor
    const audience = `Act as a pragmatic full-stack developer (Next.js, Tailwind, Lucide). You prioritize **simplicity** and **visual impact** over complex backend logic. **Mock data** is preferred over real databases for this MVP.`;

    // 4. Format: The 3-Layer Output
    const layer1 = `**Layer 1: Technical Stack (MVP)**\n- Framework: Next.js 14+ (App Router)\n- Styling: Tailwind CSS (with glassmorphism/aurora effects)\n- State: Local State (useState/useReducer) or Zustand\n- Icons: Lucide React\n- Data: Mock Data / Local Storage`;

    // Infer functional requirements from overview and points
    const layer2 = `**Layer 2: Functional Requirements**\n- Implement core features based on: ${data.overview}\n- Key capabilities: ${data.points.join(', ')}\n- Keep the UI responsive but focused on desktop first for the demo.`;

    const layer3 = `**Layer 3: Constraints & Limitations**\n- **HARD LIMIT**: Support only 1-2 concurrent users (local demo).\n- **DATA**: Use in-memory or local storage mock data. No complex DB setup.\n- **SCOPE**: Implement ONLY the happy path. No complex error handling or edge cases.`;

    const format = `${layer1}\n\n${layer2}\n\n${layer3}`;

    // 5. Foundations: Core principles
    const foundations = `Ensure the code is clean, readable, and visually impressive ("Vercel/Linear" aesthetic). **Explicitly state limitations** in the code comments or UI.`;

    // Combine into full copy-paste prompt
    const fullPrompt = `
# VibePath MVP System Design Prompt

## SITUATION
${situation}

## CHALLENGE
${challenge}

## AUDIENCE
${audience}

## FORMAT (The 3-Layer Build)
${format}

## FOUNDATIONS
${foundations}
    `.trim();

    return { situation, challenge, audience, format, foundations, fullPrompt };
}

export interface PromptPlaylist {
    skeleton: string;
    mockData: string;
    logic: string;
    polish: string;
    launch: string;
}

export function generatePlaylist(systemName: string, level: string, data: DesignData, scopes: string[] = []): PromptPlaylist {
    const isScopeActive = (scope: string) => scopes.includes(scope);

    // Track 1: The Skeleton
    const skeleton = `
I need to build a **scoped-down MVP** of a "${systemName}" application.
Start by creating the **Project Skeleton**.

**Tech Stack:**
- Next.js 14+ (App Router)
- Tailwind CSS
- Lucide React

**Requirements:**
- Create a clean, responsive layout shell (Sidebar, Header, Main Content area).
- Use a "Glassmorphism" aesthetic with dark mode by default.
- No database, no auth, no complex logic yet. Just the visual shell.
- Create a placeholder "Dashboard" page.
`.trim();

    // Track 2: The Data
    const mockData = `
Now let's create the **Data Layer**.
Instead of a real database, I want a robust \`data.ts\` file with **Mock Data**.

**Context:**
${data.overview}
${data.points.map(p => `- ${p}`).join('\n')}

**Requirements:**
- Create TypeScript interfaces for the core entities (e.g., User, ${systemName === 'ride-share' ? 'Ride, Driver' : 'Item, Post'}).
- Generate realistic mock data for these entities.
- ${isScopeActive('Realtime') ? 'Include fields for "status" or "isLive" to simulate realtime states.' : 'Keep the data static and simple.'}
- Export a helper function to simulate fetching this data (with a fake delay).
`.trim();

    // Track 3: The Logic
    const logic = `
Time to add **Interactivity**.
Connect the UI to the Mock Data.

**Requirements:**
- Fetch the data from \`data.ts\` and display it in a Grid or List.
- ${isScopeActive('Auth') ? 'Create a simple "Mock Auth Context" to simulate a logged-in user.' : 'Assume a hardcoded "Guest" user.'}
- ${isScopeActive('Database') ? 'Implement a "CRUD" flow using local state (useState) to simulate adding/deleting items.' : 'Read-only view is fine for now.'}
- ${isScopeActive('AI/ML') ? 'Add a "Simulate AI" button that shows a fake loading state and then returns a hardcoded "AI Prediction".' : ''}
- Keep it entirely client-side for this demo.
`.trim();

    // Track 4: The Polish
    const polish = `
Finally, let's **Polish the UI**.
Make it look like a "V0" or "Linear" style app.

**Requirements:**
- Add subtle micro-interactions (hover states, active states).
- Use \`framer-motion\` for smooth entrance animations.
- Ensure the color palette matches the vibe of a "${systemName}" app.
- Add tooltips or empty states where appropriate.
`.trim();

    // Track 5: The Launch
    const launch = `
Let's **Ship It**.
I want to deploy this demo to Vercel.

**Requirements:**
- Create a \`README.md\` with clear setup instructions.
- Ensure all images are using absolute paths or placeholders to avoid build errors.
- Add a "Deploy to Vercel" button in the README.
- Cleanup any unused imports or variables that might cause ESLint types failures during build.
`.trim();

    return { skeleton, mockData, logic, polish, launch };
}
