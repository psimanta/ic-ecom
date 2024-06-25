import express from 'express';
import morgan from 'morgan';

const useAppMiddleWares = (app: any) => {
  // json => parse => req.body
  app.use(express.json());
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));

  if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
  }
};

export { useAppMiddleWares };
export { default as authenticate } from './authenticate.middleware';
export { default as authorize } from './authorize.middleware';
export { default as parseWithMulter } from './multer.middleware';
