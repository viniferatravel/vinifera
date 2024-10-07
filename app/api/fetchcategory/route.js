import db from "@/config/mongodbConfig";
import { Package } from "@/_lib/model/package/package";
import { NextResponse } from "next/server";

export async function GET(req) {
    await db.connect()
    let result = [];

    result = await Package.find({ status: "active" })

    return NextResponse.json({ result: result, success: true })
}

export async function POST(request) {

    const payload = await request.json();
    await db.connect();

    if (payload.operation === "fetchallpackage") {
        try {

            const fetchalldata = await Package.find({});
            // console.log(fetchalldata, "fetchalldata");

            if (!fetchalldata) {
                return NextResponse.json({ status: 401, message: "packages not found" });
            }

            return NextResponse.json({ status: 200, message: "fetch data sucessfully", fetchalldata })

        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    }
    else if (payload.operation === "fetchdatastatewise") {
        try {

            const { state } = payload;

            const fetchstatedata = await Package.find({ state });
            // console.log(fetchstatedata, "fetchstatedata");

            if (!fetchstatedata) {
                return NextResponse.json({ status: 401, message: "state not found" })
            }

            return NextResponse.json({ status: 200, message: "fetch data statewise", fetchstatedata })

        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    }
    else if (payload.operation === "fetchdatacitywise") {
        try {

            const { city } = payload;

            const fetchcitydata = await Package.find({ city });
            // console.log(fetchcitydata, "fetchcitydata")

            if (!fetchcitydata) {
                return NextResponse.json({ status: 401, message: "city not found" })
            }

            return NextResponse.json({ status: 200, message: "city fetch successfully", fetchcitydata })

        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    }
    else if (payload.operation === "fetchdatacategorieswise") {
        try {

            const { category } = payload;

            const packages = await Package.find({ category });
            // console.log(packages, "packages");

            if (packages.length === 0) {
                if (category === "ALL") {

                    const packages = await Package.find();
                    return NextResponse.json({ status: 200, message: "category fetch successfully", packages });

                } else {

                    const packages = await Package.find({ sub_category: category });
                    return NextResponse.json({ status: 200, message: "category fetch successfully", packages });

                }
            } else {

                if (!packages) {
                    return NextResponse.json({ status: 401, message: "category not found" })
                }

                return NextResponse.json({ status: 200, message: "category fetch successfully", packages });

            }


        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    } else if (payload.operation === "fetchsortpackage") {
        try {

            const fetchsortdata = await Package.find({}).sort({ _id: -1 }).limit(6);
            // console.log(fetchsortdata, "fetchsortdata");

            if (!fetchsortdata) {
                return NextResponse.json({ status: 401, message: "packages not found" });
            }

            return NextResponse.json({ status: 200, message: "fetch data sucessfully", fetchsortdata })

        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    } else if (payload.operation === "fetchcardpackage") {
        try {

            const fetchsortdata = await Package.find({}).sort({ _id: -1 }).limit(8);
            // console.log(fetchsortdata, "fetchsortdata");

            if (!fetchsortdata) {
                return NextResponse.json({ status: 401, message: "packages not found" });
            }

            return NextResponse.json({ status: 200, message: "fetch data sucessfully", fetchsortdata })

        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    } else if (payload.operation === "fetchinternational") {
        try {
            const fetchinternationaldata = await Package.find({ sub_category: { $in: ["INTERNATIONAL"] } });

            // Check if any packages were found
            if (fetchinternationaldata.length === 0) {
                return NextResponse.json({ status: 404, message: "Packages not found" });
            }

            return NextResponse.json({ status: 200, message: "Fetch data successfully", data: fetchinternationaldata });


        } catch (error) {
            console.error("Error during user registration:", error);
            return NextResponse.json({ status: 500, message: "An error occurred during registration" });
        }
    }
}