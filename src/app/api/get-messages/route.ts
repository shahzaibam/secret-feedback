import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(req: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json(
            { success: false, message: "Username is required" },
            { status: 400 }
        );
    }

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Ordenar mensajes del más reciente al más antiguo
        const sortedMessages = user.messages.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );

        return NextResponse.json({ success: true, messages: sortedMessages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
