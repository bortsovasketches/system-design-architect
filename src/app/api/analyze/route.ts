
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { LRUCache } from "lru-cache";

// --- Rate Limiting Setup ---
// Allow 5 requests per minute per IP
const rateLimit = new LRUCache<string, number>({
  max: 500,
  ttl: 60 * 1000,
  allowStale: false,
});

// --- Input Validation Schema ---
const AnalyzeRequestSchema = z.object({
  url: z.string().trim().url({ message: "Invalid URL format" }).max(200, { message: "URL too long" }),
});

// Define the response schema explicitly to ensure type safety in the prompt
const SYSTEM_DESIGN_SCHEMA = `
{
  "eli5": {
    "narrative": "A creative, simple analogy explaining the system...",
    "diagram": "Mermaid graph TD...",
    "metrics": { "difficulty": "Very Easy", "time": "Instant" }
  },
  "intermediate": {
    "narrative": "Technical explanation of core flows and architecture...",
    "diagram": "Mermaid graph TD...",
    "metrics": { "complexity": "Medium", "load": "High" }
  },
  "senior": {
    "narrative": "Deep dive into scalability, trade-offs, and specific technologies...",
    "diagram": "Mermaid graph TD...",
    "metrics": { "qps": "High", "consistency": "Eventual" }
  }
}
`;

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const currentUsage = rateLimit.get(ip) || 0;

    if (currentUsage >= 5) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again in a minute." },
        { status: 429 }
      );
    }
    rateLimit.set(ip, currentUsage + 1);

    // 2. Input Validation
    const body = await req.json();
    const validation = AnalyzeRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid Input", details: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { url } = validation.data;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "API Key Configured Incorrectly",
          details: "Please add GEMINI_API_KEY to your .env.local file."
        },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are a Senior Principal System Architect.
      Analyze the following website/service: "${url}".
      
      Generate a complete System Design Blueprint in strict JSON format.
      It must match the following schema exactly:
      ${SYSTEM_DESIGN_SCHEMA}

      CRITICAL:
      1. Return ONLY the JSON. No markdown formatting, no backticks.
      2. The 'diagram' fields MUST be valid Mermaid.js code (graph TD).
      3. **Mermaid Safety**:
         - ALWAYS quote node labels that contain spaces or special characters.
         - Example: Node["Complex Label (With Text)"] INSTEAD OF Node[Complex Label(With Text)].
         - Do NOT use parentheses inside node shapes unless the text is quoted.
      4. Be specific to the domain of "${url}".
      5. For 'eli5', use a creative, real-world analogy (e.g., 'A library', 'A pizza shop').
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up potential markdown formatting from LLM
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const data = JSON.parse(cleanJson);
      return NextResponse.json(data);
    } catch (e) {
      console.error("JSON Parse Error:", e, cleanJson);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
