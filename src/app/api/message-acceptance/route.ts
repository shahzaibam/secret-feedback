import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

// POST: Toggle acceptance
export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username } = await request.json();

        if (!username) {
            return new Response(JSON.stringify({ success: false, message: "Username is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return new Response(JSON.stringify({ success: false, message: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        user.isAcceptingMessage = !user.isAcceptingMessage;
        await user.save();

        return new Response(
            JSON.stringify({
                success: true,
                message: `Message acceptance updated to ${user.isAcceptingMessage}`,
                isAcceptingMessage: user.isAcceptingMessage,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Toggle error:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

// GET: Fetch current acceptance status
export async function GET(request: Request) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
        return new Response(JSON.stringify({ success: false, message: "Username is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
        return new Response(JSON.stringify({ success: false, message: "User not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(
        JSON.stringify({ success: true, isAcceptingMessage: user.isAcceptingMessage }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        }
    );
}
