import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const prompt =
      "Crete a list of three open-ended and enaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an annonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing insetad om universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hooby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the question are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });
    const output = await response.text!;
    const messages = output.split("||");

    return Response.json(
      {
        success: true,
        messages: messages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("An unexpected error occured");
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
