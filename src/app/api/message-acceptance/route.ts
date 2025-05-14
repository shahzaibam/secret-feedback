import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username } = await request.json();

        if (!username) {
            return new Response(JSON.stringify({ success: false, message: "Username is required" }), {
                status: 400,
            });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return new Response(JSON.stringify({ success: false, message: "User not found" }), {
                status: 404,
            });
        }

        // Toggle the value
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
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Toggle error:", error);
        return new Response(JSON.stringify({ success: false, message: "Internal server error" }), {
            status: 500,
        });
    }
}
