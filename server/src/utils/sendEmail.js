import nodemailer from "nodemailer";

const sendEmail = async(to, subject, text) => {

    console.log("sendEmail() called");
    console.log("Recipient:", to);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    });

    console.log("Mail delivered by Gmail");
};

export default sendEmail;