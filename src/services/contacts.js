import { ContactsCollection } from '../db/models/Contact.js';

export const getAllContacts = (userId) => ContactsCollection.find({ userId });

export const createContact = (contactData, userId) =>
  ContactsCollection.create({ userId, ...contactData });

export const updateContact = async (contactId, payload) =>
  ContactsCollection.findByIdAndUpdate(
    contactId,
    {
      name: payload.name,
      number: payload.number,
    },
    {
      new: true,
    },
  );

export const deleteContactById = (contactId, userId) =>
  ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
