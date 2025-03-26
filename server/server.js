const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sendEmail = require("./emailSender");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API da Alfaiataria Cotovia está rodando! 🚀");
});

app.post("/send-pedido", async (req, res) => {
  try {
    const data = req.body;
    console.log("Dados recebidos para envio:", data);

    const result = await sendEmail(data);
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao processar envio:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao enviar e-mail.", error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
