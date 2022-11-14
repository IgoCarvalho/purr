import z from 'zod';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const baseSchema = z.object({
  isProduction: z.boolean(),
  isDevelopment: z.boolean(),
  JWT_SECRET: z.string().min(1),
  PORT: z
    .string()
    .min(1)
    .transform((a) => Number(a)),
});

const productionEnvSchema = z.object({
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
});

let envSchema;
if (isProduction) {
  envSchema = baseSchema.merge(productionEnvSchema);
} else {
  envSchema = baseSchema.merge(productionEnvSchema.partial());
}

export const env = envSchema.parse({
  ...process.env,
  isProduction,
  isDevelopment,
});
