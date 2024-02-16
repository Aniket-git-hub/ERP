import sequelize from "./config/database.js";
import setupAssociations from "./models/modelAssociations.js";


export default function syncDatabase() {
    setupAssociations();
    return sequelize
        .sync({ force: false })
        .then(() => {
            console.log('[database] synced successfully');
        })
        .catch((error) => {
            console.error('[database] Error syncing database:', error);
        });
}