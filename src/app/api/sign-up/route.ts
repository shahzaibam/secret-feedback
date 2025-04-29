import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export default async function POST(request: Request) {
    await dbConnect();

    const { username, email, password } = await request.json();


    //verify the username
    const isUsernameAtDB = await UserModel.findOne({
        username: username,
        isVerified: true
    });

    if (isUsernameAtDB) {
        return Response.json({
            success: false,
            message: "Username already taken",
        }, {
            status: 400
        })
    } else {
        console.log("no existe un username como este ")
    }



    // verify the Email
    const existingUserByThisEmail = await UserModel.findOne({ email })
    const newCode = Math.floor(1000000 + Math.random() * 900000);

    if (existingUserByThisEmail) {

        if (existingUserByThisEmail.isVerified) {
            return Response.json({
                success: false,
                message: "Email is already taken",
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUserByThisEmail.password = hashedPassword;
            existingUserByThisEmail.verifyCode = newCode.toString();

            await existingUserByThisEmail.save();
        }


    }


}