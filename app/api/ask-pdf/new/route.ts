import { createChat } from "@/lib/ask-pdf";
import { PDFPage } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Add validation of request
    const pages = (await request.json()) as PDFPage[];
    if (pages.length == 0) {
      return NextResponse.json({
        success: false,
        message: "At least one PDF page required",
      });
    }

    const chatId = await createChat(pages);

    return NextResponse.json({
      success: true,
      chatId: chatId,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Internal application error" },
      { status: 500 },
    );
  }
}
