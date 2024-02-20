import getDashboardDataService from '../../services/dashboard/getDashboardDataService.js';

async function getDashboardData(req, res, next) {
    try {
        const data = await getDashboardDataService();
        res.json(data);
    } catch (err) {
        next(err);
    }
}

export default getDashboardData;
