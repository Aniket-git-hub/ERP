import USER from '../models/work/userModel.js';
import CustomError from '../utils/createError.js';

async function checkAccountStatus(req, res, next) {
    try {
        const user = await USER.findByPk(req.user.userId);
        if (!user) {
            throw new CustomError('UserNotFound', 'User not found');
        }

        if (user.accountStatus === 'frozen') {
            throw new CustomError('AccountFrozen', 'Your account is frozen');
        }

        if (user.accountStatus === 'blocked') {
            throw new CustomError('AccountBlocked', 'Your account is blocked');
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

export default checkAccountStatus;
