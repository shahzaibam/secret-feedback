import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    await dbConnect();

    const { email, password } = await request.json();

    const isUserExisting = await UserModel.findOne({ email });

    if (isUserExisting) {
        if (email === isUserExisting.email) {

            const isPasswordCorrect = await bcrypt.compare(password, isUserExisting.password);

            if (isPasswordCorrect) {

                const token = jwt.sign(
                    { _id: isUserExisting._id, email: isUserExisting.email },
                    process.env.JWT_SECRET!,
                    { expiresIn: "7d" }
                )

                return new Response(JSON.stringify({
                    success: true,
                    message: "You are successfully logged In",
                    token
                }), {
                    status: 200
                })
            } else {
                return new Response(JSON.stringify({
                    success: false,
                    message: "Please check your password again"
                }), {
                    status: 403
                })
            }
        } else {
            return new Response(JSON.stringify({
                success: false,
                message: "Please check your email again"
            }), {
                status: 403
            })
        }
    } else {
        return new Response(JSON.stringify({
            success: false,
            message: "User has not been found"
        }), {
            status: 404
        })
    }
}