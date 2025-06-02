import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // o "gpt-4" si tienes acceso
            messages: [
                {
                    role: "system",
                    content: "Eres un generador de mensajes positivos y empáticos para enviar a otros de forma anónima.",
                },
                {
                    role: "user",
                    content: "Dame una sugerencia de mensaje positiva para alguien.",
                },
            ],
            max_tokens: 50,
            temperature: 0.9,
        });

        const suggestion = completion.choices[0].message.content;
        return NextResponse.json({ success: true, suggestion });
    } catch (error) {
        console.error("OpenAI Error full details:", error);
        return NextResponse.json(
            { success: false, message: `Error generating suggestion: ${error.message || error}` },
            { status: 500 }
        );
    }
}
