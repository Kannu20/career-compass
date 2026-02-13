import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText) {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 }
      );
    }

    const prompt = `
You are an ATS (Applicant Tracking System) evaluator.

Evaluate the following resume against standard ATS rules and ${
      jobDescription ? "the provided job description" : "general software roles"
    }.

Return STRICT JSON ONLY in this format:

{
  "atsScore": number (0-100),
  "strengths": string[],
  "issues": string[],
  "suggestions": string[]
}

Resume:
"""
${resumeText}
"""

${jobDescription ? `Job Description:\n"""${jobDescription}"""` : ""}
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "ATS Resume Analyzer",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Invalid AI response");
    }

    const parsed = JSON.parse(content);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "ATS analysis failed" },
      { status: 500 }
    );
  }
}

