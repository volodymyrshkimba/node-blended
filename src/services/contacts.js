import { ContactsCollection } from '../db/models/Contact.js';

export const getAllContacts = (userId) => ContactsCollection.find({ userId });

export const createContact = (contactData, userId) =>
  ContactsCollection.create({ userId, ...contactData });

export const deleteContactById = (contactId, userId) =>
  ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
