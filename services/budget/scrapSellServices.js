import SCRAP_SELL from "../../models/budget/scrapSellingModel.js";
import CustomError from "../../utils/createError.js";

export async function addScrapSellService(userId, scrapSellData) {
    try {
        const scrapSell = await SCRAP_SELL.create({ UserId: userId, ...scrapSellData });
        return scrapSell;
    } catch (error) {
        throw error;
    }
}

export async function updateScrapSellService(userId, scrapSellId, scrapSellData) {
    try {
        const [updatedRows] = await SCRAP_SELL.update(scrapSellData, {
            where: {
                id: scrapSellId,
                UserId: userId,
            },
        });

        if (updatedRows === 0) {
            throw new CustomError('ScrapSellError', `Scrap sell with id ${scrapSellId} not found.`);
        }

        const updatedScrapSell = await SCRAP_SELL.findByPk(scrapSellId);
        return updatedScrapSell;
    } catch (error) {
        throw error;
    }
}

export async function deleteScrapSellService(userId, scrapSellId) {
    try {
        const deletedRows = await SCRAP_SELL.destroy({
            where: {
                id: scrapSellId,
                UserId: userId,
            },
        });

        if (deletedRows === 0) {
            throw new CustomError('ScrapSellError', `Scrap sell with id ${scrapSellId} not found.`);

        }

        return { message: "Scrap sell deleted successfully." };
    } catch (error) {
        throw error;
    }
}

export async function getAllScrapSellsService(userId) {
    try {
        const scrapSells = await SCRAP_SELL.findAll({ where: { UserId: userId } });
        return scrapSells;
    } catch (error) {
        throw error;
    }
}

export async function getScrapSellByIdService(userId, scrapSellId) {
    try {
        const scrapSell = await SCRAP_SELL.findByPk(scrapSellId, {
            where: { UserId: userId }
        });

        if (!scrapSell) {
            throw new CustomError('ScrapSellError', `Scrap sell with id ${scrapSellId} not found.`);
        }

        return scrapSell;
    } catch (error) {
        throw error;
    }
}