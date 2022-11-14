import { pipeline } from 'stream/promises';
import { FastifyRequest } from 'fastify';
import { File, StorageEngine } from 'fastify-multer/lib/interfaces';
import cloudinary, { ConfigOptions } from 'cloudinary';

export class CloudinaryStorageEngine implements StorageEngine {
  cloudinaryClient = cloudinary.v2;
  folder = 'purr';

  constructor(config: ConfigOptions & { folder?: string }) {
    this.cloudinaryClient.config(config);
    this.folder = this.folder || 'purr';
  }

  async _handleFile(
    req: FastifyRequest,
    file: File,
    callback: (
      error?: Error | null | undefined,
      info?: Partial<File> | undefined
    ) => void
  ): Promise<void> {
    if (!file.stream) return callback(new Error('A file must be provided!'));

    try {
      const uploadStream = this.cloudinaryClient.uploader.upload_stream(
        { folder: this.folder },
        (err, result) => {
          if (err) callback(err);

          callback(null, {
            path: result?.secure_url,
            filename: result?.public_id,
          });
        }
      );

      await pipeline(file.stream, uploadStream);
    } catch (err) {
      callback(new Error(String(err)));
    }
  }

  _removeFile(
    req: FastifyRequest,
    file: File,
    callback: (error?: Error | null | undefined) => void
  ): void {
    if (file.filename) {
      this.cloudinaryClient.uploader.destroy(file.filename, callback);
    }
  }
}
