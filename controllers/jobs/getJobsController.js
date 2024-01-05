import getFilteredJobsService from "../../services/jobs/getFilteredJobsService.js";
import generatePDF from "../../utils/generatePDF.js";
import generateReportTemplate from "../../utils/pdfTemplates/reportTemplate.js";
async function getJobsController(req, res, next) {
    const { page = 1, limit = 10, pdf } = req.query;
    const filters = req.query;
    try {
        const jobs = await getFilteredJobsService(parseInt(page), parseInt(limit), filters);
        if (pdf) {
            const pdfBuffer = await generatePDF(generateReportTemplate(jobs, req.query))
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=report.pdf`);
            res.send(pdfBuffer);
        } else {
            res.json(jobs);
        }
    } catch (error) {
        next(error)
    }
}

export default getJobsController;