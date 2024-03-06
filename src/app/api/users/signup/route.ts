import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

dbConnect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { username, email, password } = reqBody;
  const user = await User.findOne({ email });

  //check if already have an user
  if (user) {
    return NextResponse.json({ error: "User Already exist!" }, { status: 400 });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPass });

  const savedUser = await newUser.save();

  await sendMail({email:savedUser.email,emailType:"verify",userId:savedUser._id});

  return NextResponse.json({
    data: savedUser,
    message: "User created SuccessFully",
    status: 200,
  });
}
