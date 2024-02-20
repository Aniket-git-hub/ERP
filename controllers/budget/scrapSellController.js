import {
    addScrapSellService,
    deleteScrapSellService,
    getAllScrapSellsService,
    getScrapSellByIdService,
    updateScrapSellService
} from '../../services/budget/scrapSellServices.js';

export async function addScrapSellController(req, res, next) {
    const scrapSellData = req.body;
    const { userId } = req.user;
    try {
        const scrapSell = await addScrapSellService(userId, scrapSellData);
        res.status(201).json(scrapSell);
    } catch (error) {
        next(error);
    }
}

export async function updateScrapSellController(req, res, next) {
    const { scrapSellId } = req.params;
    const scrapSellData = req.body;
    const { userId } = req.user;

    try {
        const updatedScrapSell = await updateScrapSellService(
            userId,
            scrapSellId,
            scrapSellData
        );
        res.json(updatedScrapSell);
    } catch (error) {
        next(error);
    }
}

export async function deleteScrapSellController(req, res, next) {
    const { scrapSellId } = req.params;
    const { userId } = req.user;
    try {
        const result = await deleteScrapSellService(userId, scrapSellId);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function getAllScrapSellsController(req, res, next) {
    const { userId } = req.user;
    try {
        const scrapSells = await getAllScrapSellsService(userId);
        res.json(scrapSells);
    } catch (error) {
        next(error);
    }
}

export async function getScrapSellByIdController(req, res, next) {
    const { scrapSellId } = req.params;
    const { userId } = req.user;
    try {
        const scrapSell = await getScrapSellByIdService(userId, scrapSellId);
        res.json(scrapSell);
    } catch (error) {
        next(error);
    }
}
