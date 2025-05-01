import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {

    await dbConnect();

    const { email, verifyCode } = await request.json();

    const isUserExisting = await UserModel.findOne({ email });

    if (isUserExisting) {
        if (isUserExisting.verifyCode === verifyCode) {

            isUserExisting.isVerified = true;

            await isUserExisting.save();

            return new Response(JSON.stringify({
                success: true,
                message: "User has been verified",
                isVerified: isUserExisting.isVerified
            }), {
                status: 200
            });

        } else {
            return new Response(JSON.stringify({
                success: false,
                message: "Verification code is incorrect"
            }), {
                status: 400
            })
        }
    } else {

        return new Response(JSON.stringify({
            success: false,
            message: "This user does not exist"
        }), {
            status: 404
        })

    }
}