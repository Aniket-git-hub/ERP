import express from 'express';
import forgotPasswordController from '../controllers/auth/forgotPasswordController.js';
import loginController from '../controllers/auth/loginController.js';
import registerController from '../controllers/auth/registerController.js';
import verifyOtpController from '../controllers/auth/verifyOtpController.js';
import {
    forgotPasswordValidation,
    loginValidation,
    otpValidation,
    registerValidation
} from '../validators/authValidators.js';

const router = express.Router();

router.post('/login', loginValidation, loginController);
router.post('/register', registerValidation, registerController);
router.post('/forgot-password', forgotPasswordValidation, forgotPasswordController);
router.post('/verify-otp', otpValidation, verifyOtpController);
router.post('/reset-password',);
router.post('/cancel-reset',);
router.post('/verify-email',);

export default router;
