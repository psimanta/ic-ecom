import cloudinary from '../services/cloudinary.service';
import fs from 'fs';

const uploadAndGetUrl = async (
  filePath: string,
) => {
  const uploadResult =
    await cloudinary.uploader.upload(filePath);
  fs.unlinkSync(filePath);

  const autoCropUrl = cloudinary.url(
    uploadResult.public_id,
    {
      fetch_format: 'auto',
      quality: 'auto',
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    },
  );

  return autoCropUrl;
};

export { uploadAndGetUrl };
