import nodemailer from 'nodemailer'

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "arya12345kishan@gmail.com",
        pass: "bxkeqcrifhrawuyr",
    },
});


export const sendMail = async (email, subject, text, html) => {

    try {
        let info = await transporter.sendMail({
            from: '"WebBook 👻" <arya12345kishan@gmail.com>',
            to: email,
            subject: subject,
            text: text,
            html: `${html}`
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}