import {
  NextFunction,
  Request,
  Response,
} from 'express';
import * as yup from 'yup';

const productValidationSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .transform((value) => value?.trim())
      .required()
      .test(
        'special-char-test',
        'Name should not contain special characters.',
        (value) =>
          /^[a-zA-Z0-9]*$/.test(value as string),
      )
      .min(3)
      .max(200),
    description: yup
      .string()
      .transform((value) => value?.trim())
      .required()
      .min(5)
      .max(500),
    price: yup.number().required().moreThan(0),
    stock: yup.number().required().moreThan(0),
    imageUrl: yup.string(),
    category: yup.string().required(),
  })
  .noUnknown(true)
  .strict();

export const validateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await productValidationSchema.validate({
      ...req.body,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
    });
    next();
  } catch (error: any) {
    return res.status(400).send({
      err_message:
        error?.message || 'Validation failed!',
    });
  }
};
