import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
import { InputValidator } from "@/lib/validator";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { input } = InputValidator.parse(body);

    // Default model: text-davinci-003
    // gpt-3.5-turbo is 10 times cheaper than default model.
    const llm = new OpenAI({
      temperature: 0,
      modelName: "gpt-3.5-turbo",
    });

    console.log(llm);

    const result = await llm.predict(input);

    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
  }
}
