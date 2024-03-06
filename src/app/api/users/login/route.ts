import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/dbConfig/dbConfig";

dbConnect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not exist!" }, { status: 404 });
  }
  //check password
  const validPass = await bcript.compare(password, user?.password);
  if (!validPass) {
    return NextResponse.json(
      { error: "Your password is not correct!" },
      { status: 404 }
    );
  }
  //check is verify email
  if (user?.isVerfied === false) {
    return NextResponse.json(
      { error: "Please verify your email!" },
      { status: 404 }
    );
  }

  //create token data
  const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  //create token
  const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({
    message: "Login successful",
    success: true,
  });
  response.cookies.set("token", token, {
    httpOnly: true,
  });
  return response;
}
