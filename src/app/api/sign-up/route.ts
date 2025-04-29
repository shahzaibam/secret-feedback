import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await dbConnect();

    const { username, email, password } = await request.json();

    const existingUserByThisEmail = await UserModel.findOne({ email });
    const newCode = Math.floor(1000000 + Math.random() * 900000);

    //check if there is any user associated with this email
    if (existingUserByThisEmail) {
        if (existingUserByThisEmail.isVerified) { //check if the user is verified, if it is then email is already taken
            return new Response(JSON.stringify({ success: false, message: "Email is already taken" }), { status: 400 });
        } else { //if it isn't verified update the user with the new password and new verify code and save it
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUserByThisEmail.password = hashedPassword;
            existingUserByThisEmail.verifyCode = newCode.toString();
            await existingUserByThisEmail.save();
            return new Response(JSON.stringify({ success: true, message: "User updated with new code" }), { status: 200 });
        }
    }


    //if arrives until here it means that it's a totally new user
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
