export default () => ({
  PORT: parseInt(process.env.PORT as string, 10) || 3000,
  MONGODB_URI: process.env.MONGODB_URI || '',
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || '',
  CLERK_FRONTEND_API: process.env.CLERK_FRONTEND_API || '',
  OPENAI_KEY: process.env.OPENAI_KEY || '',
  FLOWISE_API_URL: process.env.FLOWISE_API_URL || '',
  FLOWISE_API_KEY: process.env.FLOWISE_API_KEY || '',
  UNSTRUCTURED_PARTITION_ENDPOINT:
    process.env.UNSTRUCTURED_PARTITION_ENDPOINT || '',
  UNSTRUCTURED_API_KEY: process.env.UNSTRUCTURED_API_KEY || '',
  AWS_S3_REGION: process.env.AWS_S3_REGION || '',
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || '',
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || '',
  AWS_S3_SECRET: process.env.AWS_S3_SECRET || '',
});
