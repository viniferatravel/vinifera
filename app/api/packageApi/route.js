import db from "@/config/mongodbConfig";
import { Package } from "@/_lib/model/package/package";
import { NextResponse } from "next/server";

export async function GET(request) {

    await db.connect()
    let result = [];

    result = await Package.find({ status: "active" })

    return NextResponse.json({ result: result, success: true })

}

export async function POST(request) {
    const success = false;
    const payload = await request.json();
    await db.connect()

    if (payload.action === "delete") {

        await Package.deleteOne({ package_id: payload.package_id });

        const result = await Package.find()

        return NextResponse.json({ result, success: true })

    } else if (payload.action === "edit") {

        await Package.updateOne({ package_id: payload.package_id }, payload);

        const result = await Package.find()

        return NextResponse.json({ result, success: true })

    } else {

        const result = await Package.create(payload);

        return NextResponse.json({ result, success: true })

    }


}