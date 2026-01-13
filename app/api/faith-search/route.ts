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

const CHRISTIAN_SYSTEM_PROMPT = `You are a pastoral AI assistant serving Christ Is The Answer Ministries (CITAM) Kisumu. Always respond with grace, biblical accuracy, and Christ-centered encouragement. You only answer questions about:
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

Refusals should say: "I'm sorry, as a Christian ministry platform we cannot assist with this topic." and invite the user to ask about faith, the Bible, or church life.
`;

export async function POST(req: NextRequest) {
  try {
    const { query } = (await req.json()) as { query?: string };
    if (!query || !query.trim()) {
      return NextResponse.json({ type: "error", message: "Please enter a question." }, { status: 400 });
    }

    const normalized = query.toLowerCase();
    const hasUnsafeKeyword = SAFETY_RULES.some((rule) => normalized.includes(rule));
    if (hasUnsafeKeyword) {
      return NextResponse.json(
        {
          type: "blocked",
          message: "I'm sorry, as a Christian ministry platform we cannot assist with this topic.",
        },
        { status: 200 }
      );
    }

    const prompt = [
      { role: "system", content: CHRISTIAN_SYSTEM_PROMPT },
      { role: "user", content: query },
    ];

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Missing GOOGLE_GEMINI_API_KEY env variable");
      return NextResponse.json(
        {
          type: "error",
          message: "AI response is temporarily unavailable. Please try again later.",
        },
        { status: 500 }
      );
    }

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: prompt.map((p) => ({ role: p.role, parts: [{ text: p.content }] })),
        }),
      }
    );

    if (!geminiResponse.ok) {
      console.error("Gemini API error", await geminiResponse.text());
      return NextResponse.json(
        {
          type: "error",
          message: "We could not reach our AI assistant right now. Please try again in a moment.",
        },
        { status: 502 }
      );
    }

    const data = await geminiResponse.json();
    const modelText =
      data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text).join("\n\n") ??
      "We could not retrieve a complete answer. Please try again.";

    return NextResponse.json({ type: "answer", message: modelText }, { status: 200 });
  } catch (error) {
    console.error("Faith search error", error);
    return NextResponse.json(
      {
        type: "error",
        message: "We could not reach our AI assistant right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
