const fs = require("fs");
const puppeteer = require("puppeteer");
const Handlebars = require("handlebars");

const generatorPDF = async (data) => {
  try {
    // Lendo o template HTML
    const templateHtml = fs.readFileSync(__dirname + "/template.html", "utf8");

    // Compilando o template com Handlebars
    const template = Handlebars.compile(templateHtml);
    const htmlContent = template(data);

    // Iniciando o Puppeteer para gerar o PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Gerando o PDF
    const pdfPath = __dirname + "/pedido.pdf";
    await page.pdf({ path: pdfPath, format: "A4", printBackground: true });

    await browser.close();
    return pdfPath; // Retorna o caminho do PDF gerado
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    throw error;
  }
};

module.exports = generatorPDF;
