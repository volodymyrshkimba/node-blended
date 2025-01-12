import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { registerSchema, loginSchema } from '../validation/users.js';
import {
  loginUserController,
  //   logoutUserController,
  registerUserController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/signup',
  validateBody(registerSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginUserController),
);

// router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
