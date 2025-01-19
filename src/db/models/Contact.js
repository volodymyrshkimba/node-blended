import { model, Schema } from 'mongoose';

const contactSchema = Schema(
  {
    name: {
      type: String,
      requred: true,
    },
    number: {
      type: String,
      requred: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      requred: true,
    },
  },
  {
    versionKey: false,
  },
);

export const ContactsCollection = model('contact', contactSchema);
