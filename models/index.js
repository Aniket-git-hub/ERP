import sequelize from '../config/database.js';
import setupAssociations from './modelAssociations.js';


async function syncDatabase() {
    try {
        setupAssociations();
        await sequelize.sync({ force: false });
        console.log('[database] synced successfully');
    } catch (error) {
        console.error('[database] Error syncing database:', error);
        throw error;
    }
}

export default syncDatabase;