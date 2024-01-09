import getFilteredJobsService from "../../services/jobs/getFilteredJobsService.js";
import generateCSV from "../../utils/generateCSV.js";
import generatePDF from "../../utils/generatePDF.js";
import generateReportTemplate from "../../utils/pdfTemplates/reportTemplate.js";
async function getJobsController(req, res, next) {
    const { page = 1, limit = 10, pdf, csv } = req.query;
    const filters = req.query;
    try {
        const jobs = await getFilteredJobsService(parseInt(page), parseInt(limit), filters);
        if (pdf) {
            const pdfBuffer = await generatePDF(generateReportTemplate(jobs, req.query))
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=report.pdf`);
            res.send(pdfBuffer);
        } if (csv) {
            const csvString = await generateCSV(JSON.stringify(jobs.items, null, 2))
            res.type('text/csv');
            res.attachment('jobs.csv');
            res.send(csvString);
        } else {
            res.json(jobs);
        }
    } catch (error) {
        next(error)
    }
}

export default getJobsController;