import db from "@/config/mongodbConfig";
import { Category } from "@/_lib/model/category/category";
import { NextResponse } from "next/server";

export async function GET(request) {
  let data = [];
  let data1 = {};
  let success = true;
  try {

    await db.connect()
    let category = request.nextUrl.searchParams.get('category');
    // console.log("category:::::>", category)
    data = await Category.find();
    data1 = await Category.findOne({category_name: category});
    // console.log("rEs::::>", data);
  } catch (error) {
    data = { result: error }
    success = false;
  }
  return NextResponse.json({ data, data1, success })
}

export async function POST(req) {
  const payload = await req.json();
  // console.log("Payload: ", payload);
  let data = [];
  let res = [];
  let success = true;

  await db.connect()

  if (payload.action === "edit") {

    // console.log("Edit")

    try {

      const categoryyy = await Category.updateOne({ id: payload.id }, {
        category_type: payload.category_type,
        category_name: payload.category_name,
        description: payload.description,
        status: payload.status
      });

      res = await Category.find();

      // console.log("Result Property: ", categoryyy);
      data = { result: "Data updated successfully" };

    } catch (error) {

      console.error("Error:", error);
      data = { result: error };
      success = false;

    }
    return NextResponse.json({ data, res, success });

  } else if (payload.action === "delete") {
    // console.log("Delete")
    try {

      const Categorys = await Category.deleteOne({ id: payload.id });
      res = await Category.find();
      // console.log("Result Property: ", Categorys);
      data = { result: "Data deleted successfully" };

    } catch (error) {

      console.error("Error:", error);
      data = { result: error };
      success = false;

    }
    return NextResponse.json({ data, res, success });

  } else if (payload.action === "deleteSelectedChecks") {
    // console.log("Delete Selected Checks")

    try {

      if ((payload.selectedChecks).join('') === 'all') {
        // console.log("ALL");

        try {

          const Categorys = await Category.deleteMany();
          res = await Category.find();
          // console.log("Result Property: ", Categorys);
          data = { result: "Data deleted successfully" };

        } catch (error) {

          console.error("Error:", error);
          data = { result: error };
          success = false;

        }
        return NextResponse.json({ data, res, success });

      } else {

        try {

          // console.log("payload.selectedChecks: ", payload.selectedChecks)
          const Categorys = await Category.deleteMany({ id: { $in: payload.selectedChecks } });
          res = await Category.find();
          // console.log("Result Property: ", Categorys);
          data = { result: "Data deleted successfully" };

        } catch (error) {

          console.error("Error:", error);
          data = { result: error };
          success = false;

        }
        return NextResponse.json({ data, res, success });




      }



    } catch (error) {

      console.error("Error:", error);
      data = { result: error };
      success = false;

    }
    return NextResponse.json({ data, res, success });

  } else if (payload.action === "editmany") {
    // console.log("Edit many", payload.ids,
      // payload.action,
      // payload.status)

    if ((payload.ids).join('') === 'all') {
      try {

        const Categorys = await Category.updateMany({}, { status: payload.status });

        res = await Category.find();

        // console.log("Result Property: ", Categorys);
        data = { result: "Data updated successfully" };

      } catch (error) {

        console.error("Error:", error);
        data = { result: error };
        success = false;

      }
      return NextResponse.json({ data, res, success });
    } else {
      try {

        const Categorys = await Category.updateMany({ id: { $in: payload.ids } }, { status: payload.status });

        res = await Category.find();

        // console.log("Result Property: ", Categorys);
        data = { result: "Data updated successfully" };

      } catch (error) {

        console.error("Error:", error);
        data = { result: error };
        success = false;

      }
      return NextResponse.json({ data, res, success });
    }






  } else {

    // console.log("Add")
    try {

      let search = await Category.find({
        category_type: { $regex: new RegExp(payload.category_type, 'i') },
        category_name: { $regex: new RegExp(payload.category_name, 'i') },
        description: { $regex: new RegExp(payload.description, 'i') }
      });

      // console.log("Search: ", search);

      if (search.length === 0) {
        res = await Category.find();
        payload.serial_id = res.length + 1;
        const Categorys = await Category.create(payload);
        res = await Category.find();
        // console.log("Result Property: ", Categorys);
        data = { result: "Data inserted successfully" };
      } else {
        res = await Category.find();
        data = { result: "Data already existed" };
      }


    } catch (error) {

      console.error("Error:", error);
      data = { result: error };
      success = false;

    }
    return NextResponse.json({ data, res, success });






  }


}