import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { Email } from "@/_lib/model/email/email"
import db from "@/config/mongodbConfig";
import { Package } from "@/_lib/model/package/package";
import { Enquiry } from "@/_lib/model/enquiry/enquiry";
import { PassportEnquiry } from "@/_lib/model/passportenquiry/passportenquiry";
import { CorporateEnquiry } from "@/_lib/model/corporateenquiry/corporateenquiry";
import { Feedback } from "@/_lib/model/feedback/feedback";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

export async function POST(request) {

  const payload = await request.json();

  await db.connect()

  if (payload.operation === "sendpdfmail") {
    const { email, pdfUrl, _id } = payload

    try {
      const findpdf = await Package.findOne({ _id });

      console.log("FindPDF::::::>", findpdf)

      if (!findpdf) {
        return NextResponse.json({ status: 404, message: "Data not found" });
      }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your PDF is attached!',
        text: 'Please find your attached PDF.',
        attachments: [
          {
            filename: `${findpdf.package_id + "-" + findpdf.package_name + ".pdf"}`,
            path: pdfUrl,
          },
        ],
      });

      const newEmail = new Email({
        email: email,
        package_name: findpdf
      })
      console.log(newEmail, "newEmail");
      await newEmail.save();

      return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });

    } catch (error) {
      console.log("Errrrror::::::>", error)
      return NextResponse.json({ success: true, message: 'Error sending email' }, { status: 500 });
    }
  }
  else if (payload.operation === "sendenquirymail") {
    try {
      const { name, email, number, city, adults, date, query, termsAgreed, updatesAgreed } = payload;

      const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      if (!validateEmail(email)) {
        return NextResponse.json({ status: 401, message: 'Invalid email address' });
      }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Your Received Enquiry',
        html: `
          <h2>Contact Form Details</h2>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Number: ${number}</p>
          <p>City: ${city}</p>
          <p>Adults: ${adults}</p>
          <p>Date: ${date}</p>
          <p>Query: ${query}</p>
        `,
      });

      const newEnquiry = new Enquiry({
        name,
        email,
        number,
        city,
        adults,
        date,
        query,
        termsAgreed,
        updatesAgreed,
      });

      console.log(newEnquiry, "newEnquiry");
      await newEnquiry.save();

      return NextResponse.json({ status: 200, message: "Email sent and enquiry saved successfully" });
    } catch (error) {
      console.error("Error::::::>", error);
      return NextResponse.json({ success: true, message: 'Error sending email or saving enquiry' }, { status: 500 });
    }
  }
  else if (payload.operation === "passportenquiry") {
    try {

      const { name, email, number, services, query } = payload;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ status: 400, message: "Invalid email format" });
      }

      const findEmail = await PassportEnquiry.findOne({ email });
      if (findEmail) {
        return NextResponse.json({ status: 401, message: "Email is already present" });
      }

      if (!/^\d{12}$/.test(number)) {
        return NextResponse.json({
          status: 402,
          message: "Number must be exactly 10 digits and contain only numeric values"
        });
      }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Your Received Passport Enquiry',
        html: `
          <h2>Contact Form Details</h2>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Phone Number: ${number}</p>
          <p>Service: ${services}</p>
          <p>Query: ${query}</p>
        `,
      });

      const newEnquiry = new PassportEnquiry({
        name: name,
        email: email,
        number: number,
        services: services,
        query: query,
      })
      console.log(newEnquiry, "newEnquiry");
      await newEnquiry.save();

      return NextResponse.json({ status: 200, message: "Response sent successfully" })

    }
    catch (error) {
      console.error("Error during user registration:", error);
      return NextResponse.json({ status: 500, message: "An error occurred during registration" });
    }
  } else if (payload.operation === "corporateenquiry") {

    try {
      console.log("Payload:::::::>", payload)

      const { name,
        email,
        phone,
        companyname,
        noofdays,
        destination,
        purpose,
        date,
        queries } = payload;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ status: 400, message: "Invalid email format" });
      }

      const findEmail = await CorporateEnquiry.findOne({ email });
      if (findEmail) {
        return NextResponse.json({ status: 401, message: "Email is already present" });
      }

      // if (!/^\d{12}$/.test(number)) {
      //   return NextResponse.json({
      //     status: 402,
      //     message: "Number must be exactly 10 digits and contain only numeric values"
      //   });
      // }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Your Received Corporate Enquiry',
        html: `
          <h2>Contact Form Details</h2>
          <p>Name: ${name.toString()}</p>
          <p>Email: ${email.toString()}</p>
          <p>Phone No.: ${phone.toString()}</p>
          <p>Company Name: ${companyname.toString()}</p>
          <p>Number of days: ${noofdays.toString()}</p>
          <p>Destination: ${destination.toString()}</p>
          <p>Purpose: ${purpose.toString()}</p>
          <p>Date: ${date.toString()}</p>
          <p>Queries: ${queries.toString()}</p>
        `,
      });

      const newEnquiry = new CorporateEnquiry({
        name: name,
        email: email,
        phone: phone,
        companyname: companyname,
        noofdays: noofdays,
        destination: destination,
        purpose: purpose,
        date: date,
        queries: queries,
      })
      console.log(newEnquiry, "newEnquiry");
      await newEnquiry.save();

      return NextResponse.json({ status: 200, message: "Response sent successfully" })

    }
    catch (error) {
      console.error("Error during user registration:", error);
      return NextResponse.json({ status: 500, message: "An error occurred during registration" });
    }

  }
  else if (payload.operation === "addfeedback") {
    try {

      const { name, email, number, feedback, feedropdown } = payload;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ status: 400, message: "Invalid email format" });
      }

      const findEmail = await Feedback.findOne({ email });
      if (findEmail) {
        return NextResponse.json({ status: 401, message: "Email is already present" });
      }

      if (!/^\d{12}$/.test(number)) {
        return NextResponse.json({
          status: 402,
          message: "Number must be exactly 10 digits and contain only numeric values"
        });
      }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Your Received FeedBack Suggestion',
        html: `
          <h2>Contact Form Details</h2>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Number: ${number}</p>
          <p>feedback: ${feedback}</p>
          <p>feedropdown: ${feedropdown}</p>
        `,
      });

      const newFeedback = new Feedback({
        name: name,
        email: email,
        number: number,
        feedback: feedback,
        feedropdown: feedropdown,
      })
      console.log(newFeedback, "newFeedback");
      await newFeedback.save();

      return NextResponse.json({ status: 200, message: "feedback sent successfully" })

    } catch (error) {
      console.error("Error during user registration:", error);
      return NextResponse.json({ status: 500, message: "An error occurred during registration" });
    }
  }
  else if (payload.operation === "passportmodalenquiry") {
    try {

      const { name, email, number, services, query } = payload;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ status: 400, message: "Invalid email format" });
      }

      const findEmail = await PassportEnquiry.findOne({ email });
      if (findEmail) {
        return NextResponse.json({ status: 401, message: "Email is already present" });
      }

      // if (!/^\d{10}$/.test(number)) {
      //   return NextResponse.json({
      //     status: 402,
      //     message: "Number must be exactly 10 digits and contain only numeric values"
      //   });
      // }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Your Received Passport Enquiry',
        html: `
          <h2>Contact Form Details</h2>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Number: ${number}</p>
          <p>services: ${services}</p>
          <p>query: ${query}</p>
        `,
      });

      const newEnquiry = new PassportEnquiry({
        name: name,
        email: email,
        number: number,
        services: services,
        query: query,
      })
      console.log(newEnquiry, "newEnquiry");
      await newEnquiry.save();

      return NextResponse.json({ status: 200, message: "Response sent successfully" })
    } catch (error) {
      console.error("Error during user registration:", error);
      return NextResponse.json({ status: 500, message: "An error occurred during registration" });
    }
  }
}
