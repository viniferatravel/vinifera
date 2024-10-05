import db from "@/config/mongodbConfig";
import { Location } from "@/_lib/model/location/location";
import { NextResponse } from "next/server";

export async function GET(req) {
    await db.connect();

    let selectedState = req.nextUrl.searchParams.get('state');

    const result = await Location.aggregate([
        {
            $group: {
                _id: "$state"
            }
        },
        {
            $project: {
                _id: 0,
                state: "$_id"
            }
        },
        {
            $sort: {
                state: 1
            }
        }
    ]);

    const states = result.map(item => item.state);

    // console.log("selectedState: ", selectedState)

    const result1 = await Location.find({ state: selectedState }).select('city -_id');

    return NextResponse.json({ result: states, result1: result1, success: true });
}



export async function POST(request) {
    const success = false;
    const credentials = await request.json();
    await db.connect()
    // const result = await User.findOne({ user_id : credentials.userID, user_role: credentials.user_role});

    return NextResponse.json({ result: "", success: true })

}