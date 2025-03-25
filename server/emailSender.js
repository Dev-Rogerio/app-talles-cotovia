require("dotenv").config();
const fs = require("fs");
const sendgrid = require("@sendgrid/mail");
const express = require("express");

const app = express();
app.use(express.json());

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (recipientEmail, pdfPath, client) => {
  try {
    const attachment = fs.readFileSync(pdfPath).toString("base64");

    const msg = {
      to: [recipientEmail, process.env.EMAIL_COPY],
      from: process.env.EMAIL_USER,
      subject: `Pedido ${client} - Alfaiataria Cotovia`,
      text: `Olá, tudo bem? 
Segue em anexo o pedido em PDF conforme solicitado. 
Se tiver qualquer dúvida, estou à disposição!

Atenciosamente,  
Equipe Alfaiataria Cotovia`,
      attachments: [
        {
          content: attachment,
          filename: "pedido.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    await sendgrid.send(msg);
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw error;
  }
};

module.exports = sendEmail;
