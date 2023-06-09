const userService = require('../services/userService');
const { catchAsync } = require('../middlewares/error');

const kakaologin = catchAsync(async (req, res) => {
  const { code } = req.body;

  if (!code) {
    const error = new Error('NO_CODE_PROVIDED');
    error.statusCode = 400;
    throw error;
  }

  const accessToken = await userService.kakaologin(code);

  return res.status(200).json({ accessToken: accessToken });
});

const getUserById = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const userInfo = await userService.getUserById(userId);

  return res.status(200).json(userInfo);
});

const updateUserInfo = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { name, gender, level } = req.body;

  await userService.updateUserInfo(userId, name, gender, level);

  return res.status(200).json({ message: 'MODIFY SUCCESS' });
});

module.exports = {
  kakaologin,
  getUserById,
  updateUserInfo,
};
