import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import MessageModel, { Message } from "@/model/Message";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const { username, message } = await req.json();

        if (!username || !message) {
            return new Response(
                JSON.stringify({ success: false, message: "Username and message are required" }),
                { status: 400 }
            );
        }



        const user = await UserModel.findOne({ username });

        if (!user) {
            return new Response(
                JSON.stringify({ success: false, message: "User not found" }),
                { status: 404 }
            );
        }

        if (!user.isAcceptingMessage) {
            return new Response(
                JSON.stringify({ success: false, message: "User is not accepting messages" }),
                { status: 403 }
            );
        }


        // Crear y guardar mensaje en Messages collection
        const newMessage = new MessageModel({
            content: message,
            createdAt: new Date(),
        });

        await newMessage.save();

        user.messages.push({ content: message, createdAt: new Date() } as Message);
        await user.save();

        return new Response(
            JSON.stringify({ success: true, message: "Message sent successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending message:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error" }),
            { status: 500 }
        );
    }
}
