import db from "@/config/mongodbConfig";
import { viniferablog } from "@/_lib/model/blog/blog";
import { NextResponse } from "next/server";

export async function POST(request) {

    const payload = await request.json();
    await db.connect();

    if (payload.operation === "fetchallblog") {
        try {

            const fetchsingleblog = await viniferablog.find({}).sort({ date: -1 });
            console.log(fetchsingleblog, "fetchsingleblog");

            if (!fetchsingleblog) {
                return NextResponse.json({ status: 401, message: "blog not found" })
            }

            return NextResponse.json({ status: 200, message: "blog fetch successfully", fetchsingleblog })

        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    }
    else if (payload.operation === "fetchsinglejob") {
        try {

            const { _id } = payload;
            console.log(payload, "check payload");

            const fetchsingleblog = await viniferablog.findById(_id);
            console.log(fetchsingleblog, "fetchsingleblog");

            if (!fetchsingleblog) {
                return NextResponse.json({ status: 401, message: "blog not found" })
            }

            return NextResponse.json({ status: 200, message: "singleblog found successfully", fetchsingleblog })

        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    }


}