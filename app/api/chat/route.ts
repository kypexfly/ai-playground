import { OpenAIStream, StreamingTextResponse } from "ai";
import { OpenAIApi } from "openai-edge";

const openai = new OpenAIApi();

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (err) {
    console.log(err);
  }
}
