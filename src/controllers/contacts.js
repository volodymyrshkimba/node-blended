import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getAllContacts,
  updateContact,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts(req.user._id);

  res.json(contacts);
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body, req.user._id);

  res.status(201).json(contact);
};

export const patchContactController = async (req, res) => {
  const contact = await updateContact(req.params.contactId, req.body);

  if (!contact) throw createHttpError(404, 'Contact not found');

  res.status(200).json(contact);
};

export const deleteContactController = async (req, res) => {
  const contact = await deleteContactById(req.params.contactId, req.user._id);

  if (!contact) throw createHttpError(404, 'Contact not found');

  res.json(contact);
};
