import puppeteer from 'puppeteer';
// import fs  from 'fs';

async function generatePDF(pageTemplate) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // const html = fs.readFileSync('index.html', 'utf-8');
    await page.setContent(pageTemplate, { waitUntil: 'networkidle0' });

    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({
        margin: { top: '25px', right: '25px', bottom: '25px', left: '25px' },
        printBackground: true,
        format: 'A4',
        displayHeaderFooter: true,
        footerTemplate: `<div style="font-size:10px; text-align:center; width:100%;"><span class="pageNumber"></span></div>`
    });
    await browser.close();
    return pdfBuffer;
}

export default generatePDF;
