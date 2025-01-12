import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { registerSchema, loginSchema } from '../validation/users.js';
import {
  currentUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

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

router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

router.get('/current', authenticate, ctrlWrapper(currentUserController));

export default router;
