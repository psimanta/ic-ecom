import { Request, Response } from 'express';
import { pick } from 'lodash';

import { Category } from '../models';

const createCategory = async (
  req: Request,
  res: Response,
) => {
  try {
    const payload = pick(req.body, [
      'name',
      'description',
    ]);

    let category = await Category.findOne({
      name: payload.name,
    });

    if (category) {
      return res.status(400).send({
        err_message: 'Category already exists!',
      });
    }
    const result = await Category.create(payload);

    return res.status(201).send({
      category: result,
      message: 'Category created!',
    });
  } catch (err: any) {
    return res.status(400).send({
      err_message: err?.message || 'Bad request',
    });
  }
};

const getCategories = async (
  req: Request,
  res: Response,
) => {
  try {
    const categories = await Category.find()
      .select('name description')
      .sort({ name: 1 });

    return res.status(200).send({
      categories,
      message: 'List of categories.',
    });
  } catch (err: any) {
    return res.status(400).send({
      err_message: err?.message || 'Bad request',
    });
  }
};

export { createCategory, getCategories };
