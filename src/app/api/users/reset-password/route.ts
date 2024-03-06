import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs"

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id, token,password } = reqBody;
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
    //hashed the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Continue with the rest of your logic
    user.password = hashedPass;
    await user.save();

    return NextResponse.json({
      message: "password updated successfully",
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
