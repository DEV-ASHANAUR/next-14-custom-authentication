import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/dbConfig/dbConfig";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id, token } = reqBody;
    // Verify the JWT token
    const decode = await jwt.verify(token, process.env.JWT_SECRET!);

    // If the token is invalid or expired, handle the error
    if (!decode) {
      return NextResponse.json(
        { error: "Your token is invalid or expired!" },
        { status: 401 }
      );
    }
    // Continue with the rest of your logic (e.g., fetching the user)
    const user = await User.findOne({ _id: id });

    if (!user) {
      return NextResponse.json({ error: "User not exist!" }, { status: 404 });
    }
    if (user?.isVerfied) {
      return NextResponse.json({ error: "Already Verifired!" }, { status: 404 });
    }
    // Continue with the rest of your logic
    user.isVerfied = true;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("An error occurred:", error);

    // Handle specific errors if needed
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return NextResponse.json(
        { error: "Your token is invalid or expired!" },
        { status: 401 }
      );
    }
    // Handle other errors
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
