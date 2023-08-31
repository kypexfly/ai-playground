import { InputChatbotValidator } from "@/lib/validator";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, apiKey } = InputChatbotValidator.parse(body);

    const config = new Configuration({
      apiKey: apiKey,
    });

    const openai = new OpenAIApi(config);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });

    if (!response.ok) {
      throw new Error(String(response.status));
    }

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      if (err.message === "401") {
        return new Response("401", { status: 401 });
      }
    }

    return new Response(JSON.stringify(err), { status: 500 });
  }
}
