import express from 'express';
import addMaterialController from "../controllers/material/addMaterialController.js";
import deleteMaterialController from "../controllers/material/deleteMaterialController.js";
import getMaterialController from "../controllers/material/getMaterialController.js";
import updateMaterialController from "../controllers/material/updateMaterialController.js";

const router = express.Router();

router.get('/', getMaterialController);
router.post('/', addMaterialController);
router.put('/:materialId', updateMaterialController);
router.delete('/:materialId', deleteMaterialController);

export default router;
