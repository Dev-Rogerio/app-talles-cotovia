const fs = require("fs");
const path = require("path");
const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
const Handlebars = require("handlebars");

const generatorPDF = async (data) => {
  try {
    // Lendo o template HTML
    const templateHtml = fs.readFileSync(
      path.join(__dirname, "template.html"),
      "utf8"
    );

    // Compilando o template com Handlebars
    const template = Handlebars.compile(templateHtml);
    const htmlContent = template(data);

    // Iniciando o Puppeteer com Chromium do pacote
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
      defaultViewport: chromium.defaultViewport,
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Gerando o PDF
    // const pdfPath = path.join(__dirname, "pedido.pdf");
    const pdfPath = path.join("/tmp", "pedido.pdf");

    await page.pdf({ path: pdfPath, format: "A4", printBackground: true });

    await browser.close();
    return pdfPath; // Retorna o caminho do PDF gerado
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    throw error;
  }
};

module.exports = generatorPDF;
