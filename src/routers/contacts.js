import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  creteContactController,
  deleteContactController,
  getAllContactsController,
} from '../controllers/contacts.js';
import { validateBody } from '../utils/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getAllContactsController));

router.post(
  '/',
  authenticate,
  validateBody(createContactSchema),
  ctrlWrapper(creteContactController),
);

router.delete('/contactId', authenticate, ctrlWrapper(deleteContactController));

export default router;
