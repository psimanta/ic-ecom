import { Request, Response } from 'express';
import { pick } from 'lodash';

import { Product } from '../models';

const getProducts = async (
  req: Request,
  res: Response,
) => {
  try {
    /* 
     /api/product?page=4&per_page=10
    */
    // filter => search
    // sort => any field
    const { query } = req;
    const page: number = Number(query?.page) || 2;
    const limit: number =
      Number(query?.per_page) || 20;
    const skip: number = (page - 1) * limit;
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .populate('category', 'name -_id');

    const totalProducts =
      await Product.countDocuments();

    return res.status(200).send({
      products,
      message: 'List of categories.',
      total_pages: Math.ceil(
        totalProducts / limit,
      ),
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
  try {
    const payload = pick(req.body, [
      'name',
      'description',
      'price',
      'stock',
      'category',
    ]);

    const result = await Product.create(payload);

    return res.status(201).send({
      product: result,
      message: 'Product created!',
    });
  } catch (err: any) {
    return res.status(400).send({
      err_message: err?.message || 'Bad request',
    });
  }
};

export { createProduct, getProducts };
