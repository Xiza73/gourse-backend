import nodemailer from "nodemailer";
import _config from "./config";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: _config.mailUser,
    pass: _config.mailPassword,
  },
});

transporter.verify().then((_) => {
  console.log("Preparado para enviar correos");
});
