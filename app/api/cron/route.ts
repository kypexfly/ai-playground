import { removeOutdatedChats } from "@/lib/ask-pdf";

export async function POST(req: Request) {
  try {
    const { authKey } = await req.json();

    if (authKey !== process.env.AUTH_KEY) {
      return new Response("Unauthorized", { status: 401 });
    }

    await removeOutdatedChats();

    return new Response("OK");
  } catch (err) {
    console.log(err);
  }
}
