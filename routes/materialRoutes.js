import express from 'express';
import addMaterialController from "../controllers/material/addMaterialController.js";
import deleteMaterialController from "../controllers/material/deleteMaterialController.js";
import getMaterialController from "../controllers/material/getMaterialController.js";
import updateMaterialController from "../controllers/material/updateMaterialController.js";
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/', verifyJWT, getMaterialController);
router.post('/', verifyJWT, addMaterialController);
router.put('/:materialId', verifyJWT, updateMaterialController);
router.delete('/:materialId', verifyJWT, deleteMaterialController);

export default router;
