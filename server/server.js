require("dotenv").config();
const express = require("express");
const cors = require("cors");
const generatorPDF = require("./pdfGenerator");

const sendEmail = require("./emailSender");

const app = express();
// const PORT = 5000;
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://moonlit-salmiakki-043e53.netlify.app", // seu frontend no Netlify
    ],
  })
);
app.use(express.json());

app.use(express.json());

// Rota para processar o pedido e enviar o e-mail
app.post("/send-pedido", async (req, res) => {
  try {
    const data = req.body;
    const recipientEmail = "roger.ngt3494@gmail.com"; // Altere para o e-mail do cliente
    const client = data.client;

    // Gerar o PDF
    const pdfPath = await generatorPDF(data);

    // Enviar e-mail com o PDF anexado
    await sendEmail(recipientEmail, pdfPath, client);

    res.json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: "Erro ao processar o pedido." });
  }
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
