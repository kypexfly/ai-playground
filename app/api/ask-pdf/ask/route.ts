import { NextResponse } from "next/server";

import { askQuestion } from "@/lib/ask-pdf";
import { PDFChatQuestion } from "@/lib/types";

export async function POST(request: Request) {
  try {
    // Validate
    const chatQuestion = (await request.json()) as PDFChatQuestion;
    const result = await askQuestion(
      chatQuestion.chatId,
      chatQuestion.question,
    );

    console.log(result);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Internal application error" },
      { status: 500 },
    );
  }
}
