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

      // const validateEmail = (email) => {
      //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //   return emailRegex.test(email);
      // };

      // if (!validateEmail(email)) {
      //   return NextResponse.json({ status: 401, message: 'Invalid email address' });
      // }

      if (!/^\d{10}$/.test(number)) {
        return NextResponse.json({
          status: 402,
          message: "Number must be exactly 10 digits and contain only numeric values"
        });
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

      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(email)) {
      //   return NextResponse.json({ status: 400, message: "Invalid email format" });
      // }

      // const findEmail = await PassportEnquiry.findOne({ email });
      // if (findEmail) {
      //   return NextResponse.json({ status: 401, message: "Email is already present" });
      // }

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

      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(email)) {
      //   return NextResponse.json({ status: 400, message: "Invalid email format" });
      // }

      // const findEmail = await CorporateEnquiry.findOne({ email });
      // if (findEmail) {
      //   return NextResponse.json({ status: 401, message: "Email is already present" });
      // }

      const sanitizedNumber = String(phone).trim().replace(/\D/g, '');

      if (sanitizedNumber.length !== 10) {
        return NextResponse.json({
          status: 402,
          message: "Number must be exactly 10 digits long."
        });
      }

      if (!/^\d{10}$/.test(sanitizedNumber)) {
        return NextResponse.json({
          status: 402,
          message: "Number must contain only numeric values, with no letters or special characters."
        });
      }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'You Received a Corporate Enquiry',
        html: `
          <h2>Contact Form Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${name.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone No.:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${phone.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Company Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${companyname.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Number of Days:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${noofdays.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Destination:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${destination.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Purpose:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${purpose.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${date.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Queries:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${queries.toString()}</td>
            </tr>
          </table>
          <p>Please review the above details and follow up with the user as needed.</p>
          <p>Best regards,<br>
          Vinifera Tours and Travels</p>
        `,
      });


      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmation: We Received Your Corporate Enquiry',
        html: `
          <h2>Dear ${name.toString()},</h2>
          <p>Thank you for reaching out to us regarding your corporate travel needs. We have received your inquiry and our team will review it shortly. Below are the details you provided:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${name.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone No.:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${phone.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Company Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${companyname.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Number of Days:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${noofdays.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Destination:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${destination.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Purpose:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${purpose.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${date.toString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Queries:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${queries.toString()}</td>
            </tr>
          </table>
          <p>We will get back to you shortly with further information. If you have any urgent questions in the meantime, feel free to reply to this email.</p>
          <p>Thank you for choosing our services. We look forward to assisting you with your corporate travel arrangements!</p>
          <p>Best regards,<br>
          Vinifera Tours and Travels<br>
          7777777777</p>
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

      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(email)) {
      //   return NextResponse.json({ status: 400, message: "Invalid email format" });
      // }

      // const findEmail = await Feedback.findOne({ email });
      // if (findEmail) {
      //   return NextResponse.json({ status: 401, message: "Email is already present" });
      // }

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

      const { name, email, phone, services, query } = payload;

      console.log("Payload:::::>", payload, phone)

      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(email)) {
      //   return NextResponse.json({ status: 400, message: "Invalid email format" });
      // }

      // const findEmail = await PassportEnquiry.findOne({ email });
      // if (findEmail) {
      //   return NextResponse.json({ status: 401, message: "Email is already present" });
      // }

      const sanitizedNumber = String(phone).trim().replace(/\D/g, '');

      console.log(`Sanitized number: '${sanitizedNumber}'`);

      if (sanitizedNumber.length !== 10) {
        return NextResponse.json({
          status: 402,
          message: "Number must be exactly 10 digits long."
        });
      }

      if (!/^\d{10}$/.test(sanitizedNumber)) {
        return NextResponse.json({
          status: 402,
          message: "Number must contain only numeric values, with no letters or special characters."
        });
      }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'You Received Passport Enquiry',
        html: `
    <h2>Contact Form Details</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Number:</strong> ${phone}</p>
    <p><strong>Services:</strong> ${services}</p>
    <p><strong>Query:</strong> ${query}</p>
    <p>Please review the details and follow up with the user if necessary.</p>
  `,
      });


      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Received Passport Enquiry',
        html: `
          <h2>Contact Form Details</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to us regarding your passport services. We appreciate your inquiry and are here to assist you.</p>
          <p><strong>Contact Details:</strong></p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Service Requested:</strong> ${services}</p>
          <p><strong>Query:</strong> ${query}</p>
          <p>We will review your request and get back to you shortly with the information you need. If you have any immediate questions, feel free to reply to this email or contact us at 7777777777.</p>
          <p>Thank you for choosing our services!</p>
          <p>Best regards,<br>
          Sameer Shaikh<br>
          Tech Lead<br>
          Vinifera Tours and Travels<br>
          777777777<br>
          https://www.viniferaa.com/</p>
        `,
      });

      const newEnquiry = new PassportEnquiry({
        name: name,
        email: email,
        number: phone,
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
