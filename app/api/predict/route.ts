import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
import { InputValidator } from "@/lib/validator";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { input } = InputValidator.parse(body);

    const llm = new OpenAI({
      temperature: 0,
    });

    const result = await llm.predict(input);

    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
  }
}
