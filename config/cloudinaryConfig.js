import dotenv from 'dotenv';
import cld from 'cloudinary';

dotenv.config();

cld.config(
  {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
);

export default cld;
