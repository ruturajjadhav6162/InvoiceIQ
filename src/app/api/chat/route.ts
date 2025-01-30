import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { message, fileContent } = await req.json();
    
    // Simulating backend response
    const reply = `You asked: "${message}". Here's an answer based on the image text: "${fileContent?.slice(0, 50)}..."`;

    return NextResponse.json({ reply });
  
}
