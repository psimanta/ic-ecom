declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV:
      | 'development'
      | 'production'
      | 'test';
    PORT?: string;
    DB_URL: string;
    JWT_PRIVATE_KEY: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET_KEY: string;
    MAILER_USER: string;
    MAILER_PASSWORD: string;
  }
}
