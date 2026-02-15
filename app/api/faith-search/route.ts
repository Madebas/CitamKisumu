// app/api/faith-search/route.ts
import { NextRequest, NextResponse } from "next/server";

const SAFETY_RULES = [
  "sexual",
  "porn",
  "adult",
  "nsfw",
  "violent",
  "hate",
  "occult",
  "witchcraft",
  "new age",
  "illegal",
  "drugs",
  "crime",
  "murder",
];

const CHRISTIAN_SYSTEM_PROMPT = `You are a pastoral AI assistant serving Christ Is The Answer Ministries (CITAM) Kisumu. 
Always respond with grace, biblical accuracy, and Christ-centered encouragement. 
You only answer questions about:
- The Bible, Jesus, God, Holy Spirit
- Christian living, discipleship, prayer, worship, salvation
- Church life, sermons, CITAM ministries, events, devotions
- Clean, family-friendly, moral or inspirational topics related to Christianity

You must refuse to answer (with a kind, firm tone) any requests about:
- Sexual, pornographic, or suggestive content
- Violence, hate, discrimination
- Occult, witchcraft, new age spirituality
- Promotion of other religions that contradict Christianity
- Illegal, harmful, or unethical activities
- Topics unrelated to Christianity or faith-based encouragement

When refusing, respond only with: 
"I'm sorry, as a Christian ministry platform we cannot assist with this topic. Feel free to ask about the Bible, prayer, Christian living, or CITAM ministries."`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body as { query?: string };

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { type: "error", message: "Please enter a valid question." },
        { status: 400 }
      );
    }

    // Basic content safety filter (keyword-based)
    const normalized = query.toLowerCase().trim();
    const hasUnsafeKeyword = SAFETY_RULES.some((rule) => normalized.includes(rule));

    if (hasUnsafeKeyword) {
      return NextResponse.json(
        {
          type: "blocked",
          message:
            "I'm sorry, as a Christian ministry platform we cannot assist with this topic. Feel free to ask about the Bible, prayer, Christian living, or CITAM ministries.",
        },
        { status: 200 }
      );
    }

    // Prepare prompt
    const prompt = [
      { role: "system", content: CHRISTIAN_SYSTEM_PROMPT },
      { role: "user", content: query },
    ];

    // Read API key
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY?.trim();

    if (!apiKey) {
      console.error("[Faith-Search] Missing or empty GOOGLE_GEMINI_API_KEY environment variable");
      return NextResponse.json(
        {
          type: "error",
          message: "AI service is temporarily unavailable. Please try again later.",
        },
        { status: 503 } // Service Unavailable – more semantically correct
      );
    }

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds

    try {
      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: prompt.map((p) => ({
              role: p.role,
              parts: [{ text: p.content }],
            })),
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!geminiResponse.ok) {
        let errorText = "";
        try {
          errorText = await geminiResponse.text();
        } catch {
          errorText = "(no response body)";
        }

        console.error(
          `[Faith-Search] Gemini API error - status ${geminiResponse.status}: ${errorText}`
        );

        let userMessage = "We could not reach our AI assistant right now. Please try again in a moment.";

        try {
          const err = JSON.parse(errorText);
          const code = err?.error?.code;

          if (code === 429) {
            userMessage = "We've reached our daily AI usage limit. Please try again in a few minutes.";
          } else if (code === 401 || code === 403) {
            userMessage = "There is an authentication issue with the AI service. We'll resolve it soon.";
          } else if (code >= 500) {
            userMessage = "The AI service is experiencing temporary issues. Please try again shortly.";
          }
        } catch {
          // parsing failed → keep generic message
        }

        return NextResponse.json({ type: "error", message: userMessage }, { status: 503 });
      }

      const data = await geminiResponse.json();

      const modelText =
        data.candidates?.[0]?.content?.parts
          ?.map((part: { text?: string }) => part.text || "")
          .filter(Boolean)
          .join("\n\n") || "No complete answer was received. Please try rephrasing your question.";

      return NextResponse.json({ type: "answer", message: modelText }, { status: 200 });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      console.error("[Faith-Search] Fetch error:", fetchError);

      let message = "We could not reach our AI assistant right now. Please try again in a moment.";

      if (fetchError.name === "AbortError") {
        message = "The request took too long. Please try again.";
      }

      return NextResponse.json({ type: "error", message }, { status: 503 });
    }
  } catch (error: any) {
    console.error("[Faith-Search] Unexpected endpoint error:", error);
    return NextResponse.json(
      {
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}