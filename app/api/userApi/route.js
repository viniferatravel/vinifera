import db from "@/config/mongodbConfig";
import { User } from "@/_lib/model/user/user";
import { NextResponse } from "next/server";

export async function GET(request) {

    await db.connect()
    let result = [];

    result = await User.find()

    return NextResponse.json({ result: result, success: true })

}

export async function POST(request) {
    const success = false;
    const credentials = await request.json();
    await db.connect()
    const result = await User.findOne({ user_id : credentials.userID, user_role: credentials.user_role});

    return NextResponse.json({ result, success: true })

}