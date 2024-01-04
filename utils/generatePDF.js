import puppeteer from 'puppeteer';
// import fs  from 'fs';

async function generatePDF(pageTemplate) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // const html = fs.readFileSync('index.html', 'utf-8');
    await page.setContent(pageTemplate, { waitUntil: 'networkidle0' });

    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({
        margin: { top: '50px', right: '50px', bottom: '50px', left: '50px' },
        printBackground: true,
        format: 'A4',
    });
    await browser.close();
    return pdfBuffer;
}

export default generatePDF;
