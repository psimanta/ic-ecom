import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  },
  { timestamps: true },
);

export const Product = model(
  'Producte',
  productSchema,
);
