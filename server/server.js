require("dotenv").config();
const express = require("express");
const cors = require("cors");
const generatorPDF = require("./pdfGenerator");
const sendEmail = require("./emailSender");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

// Rota para processar o pedido e enviar o e-mail
app.post("/send-pedido", async (req, res) => {
  try {
    const data = req.body;
    if (!data || !data.client) {
      return res
        .status(400)
        .json({ error: "Dados incompletos para o pedido." });
    }
    const recipientEmail = process.env.EMAIL_DESTINATARIO;
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
