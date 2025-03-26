const sgMail = require("@sendgrid/mail");
const generatorPDF = require("./pdfGenerator");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Definindo a função sendEmail primeiro
const sendEmail = async (data) => {
  try {
    console.log("Gerando PDF para envio...");
    const pdfPath = await generatorPDF(data);

    const pdfContent = fs.readFileSync(pdfPath).toString("base64");

    const msg = {
      to: "roger.ngt3494@gmail.com", // Altere para o seu e-mail ou use o que está no .env
      cc: "adriana.kamisaria@gmail.com",
      from: "tallescotovia@gmail.com", // Precisa ser um e-mail verificado na SendGrid
      subject: `Pedido de ${data.client} - Cotovia`,
      text: `Pedido realizado por ${data.client}, vendedor ${data.vendedor}.`,
      attachments: [
        {
          content: pdfContent,
          filename: `Pedido_${data.client}.pdf`,
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    console.log("Enviando e-mail...");
    await sgMail.send(msg);
    console.log("E-mail enviado com sucesso!");

    // Removendo o PDF do /tmp após o envio
    fs.unlinkSync(pdfPath);
    console.log("PDF removido do servidor.");

    return { success: true, message: "E-mail enviado com sucesso!" };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error.response?.body || error);
    throw error;
  }
};

// Função de teste que chama o sendEmail
const testEmail = async () => {
  try {
    const result = await sendEmail({
      client: "Cliente Teste",
      vendedor: "Vendedor Teste",
    });
    console.log("Resultado do teste de envio de e-mail:", result);
  } catch (error) {
    console.error("Erro no teste de envio de e-mail:", error);
  }
};

// Chamando a função de teste
testEmail();

module.exports = sendEmail;
