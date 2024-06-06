import { Request, Response } from 'express';
import { pick } from 'lodash';

import { Product } from '../models';

const getProducts = async (
  req: Request,
  res: Response,
) => {
  try {
    const products = await Product.find()
      .sort({
        price: 1,
      })
      .limit(100)
      .populate('category', 'name');

    return res.status(200).send({
      products,
      message: 'List of categories.',
    });
  } catch (err: any) {
    return res.status(400).send({
      err_message: err?.message || 'Bad request',
    });
  }
};
const createProduct = async (
  req: Request,
  res: Response,
) => {
  {
    try {
      const payload = pick(req.body, [
        'name',
        'description',
        'price',
        'stock',
        'category',
      ]);

      const result =
        await Product.create(payload);

      return res.status(201).send({
        category: result,
        message: 'Product created!',
      });
    } catch (err: any) {
      return res.status(400).send({
        err_message:
          err?.message || 'Bad request',
      });
    }
  }
};

export { createProduct, getProducts };
