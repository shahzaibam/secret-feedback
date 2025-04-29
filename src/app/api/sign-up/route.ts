import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await dbConnect();

    const { username, email, password } = await request.json();

    const existingUserByThisEmail = await UserModel.findOne({ email });
    const newCode = Math.floor(1000000 + Math.random() * 900000);

    if (existingUserByThisEmail) {
        if (existingUserByThisEmail.isVerified) {
            return new Response(JSON.stringify({ success: false, message: "Email is already taken" }), { status: 400 });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUserByThisEmail.password = hashedPassword;
            existingUserByThisEmail.verifyCode = newCode.toString();
            await existingUserByThisEmail.save();
            return new Response(JSON.stringify({ success: true, message: "User updated with new code" }), { status: 200 });
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode: newCode.toString(),
        verifyCodeExpiry: new Date(Date.now() + 60 * 60 * 1000),
        isVerified: false,
        isAcceptingMessage: true,
    });

    await newUser.save();

    return new Response(JSON.stringify({ success: true, message: "User successfully created" }), { status: 201 });
}
