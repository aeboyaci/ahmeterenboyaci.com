const mailer = require("nodemailer");

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: '[USERNAME]',
        pass: '[PASSWORD]'
    }
});

export default async function (req, resp) {
    if (req.method === "POST") {
        const {fName, lName, email, message, token} = req.body;

        const secret = "[RECAPTCHA_SECRET]";
        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        const data = await response.json();
        if (!data.success) {
            return resp.status(400).json({result: "Failed!", message: "Please confirm that you are not robot."});
        }

        const name = `${fName} ${lName}`;

        const mailOptions = {
            from: 'info.ahmeterenboyaci@gmail.com',
            to: 'ahmeterenboyaci45@gmail.com',
            subject: `[CONTACT] ${name}`,
            text: `Ad-Soyad: ${name}\nE-mail: ${email}\nMesaj: ${message}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return resp.status(500).json({result: "Failed!", message: "SMTP error."});
            }
            return resp.status(200).json({result: "Success!", message: "Mail sent."});
        });
    }
    else {
        return resp.status(400).json({result: "Failed!", message: "Only POST requests are allowed."});
    }
}