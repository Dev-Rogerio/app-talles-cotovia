const fs = require("fs");
const path = require("path");
const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
const Handlebars = require("handlebars");

// Função para preencher campos vazios com "Não informado"
const preencherCamposVazios = (data) => {
  const preencher = (obj) => {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach(preencher);
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        preencher(obj[key]);
      } else if (
        obj[key] === "" ||
        obj[key] === null ||
        obj[key] === undefined
      ) {
        obj[key] = "Não informado";
      }
    }
  };
  preencher(data);
  return data;
};

const generatorPDF = async (data) => {
  try {
    // Lendo o template HTML
    const templateHtml = fs.readFileSync(
      path.join(__dirname, "template.html"),
      "utf8"
    );

    // Preenche campos vazios antes de gerar o HTML
    const dataPreenchida = preencherCamposVazios(data);

    // Compilando o template com Handlebars
    const template = Handlebars.compile(templateHtml);
    const htmlContent = template(dataPreenchida);

    console.log("Iniciando geração do PDF...");

    // Iniciando o Puppeteer com Chromium
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
      defaultViewport: chromium.defaultViewport,
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Caminho do PDF (Render usa /tmp)
    const pdfPath = path.join("/tmp", "pedido.pdf");

    // Gerando o PDF
    await page.pdf({ path: pdfPath, format: "A4", printBackground: true });

    await browser.close();
    console.log("PDF gerado com sucesso!");

    return pdfPath;
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    throw error;
  }
};

module.exports = generatorPDF;
