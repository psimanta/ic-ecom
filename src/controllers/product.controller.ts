import { Request, Response } from 'express';
import fs from 'fs';

import { Product } from '../models';
import cloudinary from '../services/cloudinary.service';
import { uploadAndGetUrl } from '../utils/upload.utlis';

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
    const image = req.file;
    if (!image) {
      return res.status(400).send({
        err_message: 'Product image missing!',
      });
    }

    const imageUrl = await uploadAndGetUrl(
      image.path,
    );

    const result = await Product.create({
      ...req.body,
      imageUrl,
    });

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
