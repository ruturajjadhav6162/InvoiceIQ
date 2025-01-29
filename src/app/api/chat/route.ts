import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, fileContent } = await req.json();
    
    // Simulating backend response
    const reply = `You asked: "${message}". Here's an answer based on the image text: "${fileContent?.slice(0, 50)}..."`;

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
