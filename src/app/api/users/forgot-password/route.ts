import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";
import { dbConnect } from "@/dbConfig/dbConfig";

dbConnect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email } = reqBody;

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not exist!" }, { status: 404 });
  }

  await sendMail({email,emailType:"reset",userId:user._id});

  return NextResponse.json({
    message: "Sent Reset Mail SuccessFully",
    status: 200,
  });

}
