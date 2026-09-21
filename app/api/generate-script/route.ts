import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, topic, platform, hookType, apiKey: userKey } = await req.json();

    const apiKey = userKey || process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "No OpenRouter API key found. Please enter your OpenRouter API key in the AI Studio settings or input field." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are VibeDocker's elite AI content director and script architect.
Your goal is to write high-voltage, high-retention creator scripts and viral hook packages for modern creators.
Keep the output structured, punchy, hyper-engaging, and tailored precisely for ${platform || "social media"}.
Include:
1. Viral Hook (First 3 seconds that stop the scroll)
2. Retention Body (High-energy points with visual pacing cues)
3. Call-to-Action (Punchy CTA)`;

    const userPrompt = prompt || `Create an explosive, high-converting script package about: "${topic || "Creator Growth"}" for platform: ${platform || "Instagram"} using hook style: ${hookType || "Curiosity Gap"}.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey.trim()}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "VibeDocker AI Studio",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `OpenRouter API error: ${err}` }, { status: response.status });
    }

    const data = await response.json();
    const generatedScript = data.choices?.[0]?.message?.content || "No script returned.";

    return NextResponse.json({ script: generatedScript });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
