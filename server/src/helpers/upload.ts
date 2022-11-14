import { FastifyInstance } from 'fastify';
import fastifyMulter from 'fastify-multer';
import { FileFilter } from 'fastify-multer/lib/interfaces';
import fp from 'fastify-plugin';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

import { CloudinaryStorageEngine } from '../lib/cloudinary';

const diskStorage = fastifyMulter.diskStorage({
  async destination(req, file, cb) {
    console.log('DISK', req.body);

    const storagePath = path.resolve('uploads');

    if (!existsSync(storagePath)) {
      mkdirSync(storagePath);
    }

    cb(null, storagePath);
  },
  filename(req, file, cb) {
    const timeNow = new Date().getTime();
    const fileName = `${timeNow}_${file.originalname}`;
    cb(null, fileName);
  },
});

const cloudinaryStorage = new CloudinaryStorageEngine({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function getStorage() {
  if (process.env.NODE_ENV === 'production') {
    return cloudinaryStorage;
  }

  return diskStorage;
}

const checkFileType: FileFilter = (req, file, cb) => {
  const allowedFiletypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
  ];

  if (!allowedFiletypes.includes(file.mimetype)) {
    return cb(null, false);
  }
  return cb(null, true);
};

export const multerUploader = fastifyMulter({
  storage: getStorage(),
  limits: {
    fileSize: 1024 * 1024 * 3,
    fields: 5,
  },
  fileFilter: checkFileType,
});

async function fileUpload(server: FastifyInstance) {
  server.register(fastifyMulter.contentParser);
}

export default fp(fileUpload);
