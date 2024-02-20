import getFilteredJobsService from '../../services/jobs/getFilteredJobsService.js';
import generateCSV from '../../utils/generateCSV.js';
import generatePDF from '../../utils/generatePDF.js';
import generateTitleAndDescription from '../../utils/pdfTemplates/generateTitleAndDescription.js';
import generateReportTemplate from '../../utils/pdfTemplates/reportTemplate.js';
async function getJobsController(req, res, next) {
    const { page = 1, limit = 10, pdf, csv } = req.query;
    const { userId } = req.user;
    const filters = req.query;
    try {
        const jobs = await getFilteredJobsService(
            userId,
            parseInt(page),
            parseInt(limit),
            filters
        );

        const { title, description } = generateTitleAndDescription(filters);

        if (pdf) {
            const pdfBuffer = await generatePDF(
                await generateReportTemplate(
                    JSON.stringify(jobs.items),
                    title,
                    description
                )
            );
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
                'Content-Disposition',
                `attachment; filename=report.pdf`
            );
            res.send(pdfBuffer);
        } else if (csv) {
            const csvString = await generateCSV(
                JSON.stringify(jobs.items, null, 2)
            );
            res.setHeader('Content-Type', 'text/csv');
            res.attachment('jobs.csv');
            res.send(csvString);
        } else {
            res.json(jobs);
        }
    } catch (error) {
        next(error);
    }
}

export default getJobsController;
