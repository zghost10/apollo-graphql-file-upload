import { S3Client, ListObjectsCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import sharp from 'sharp'

if(!process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_STORAGE_BUCKET_NAME){
  throw Error('Missing Amazon S3 environment variables!');
}

const compressImage = async (buffer: Buffer) => {
  const compressed = await sharp(buffer)
    .resize(null, 1500)
    .webp({ quality: 75 })
    .toBuffer();

  return compressed;
}

class FileManager {
  private client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: 'us-east-1',
  });

  public upload = async (file: Blob, key: string, division: string) => {
    const theKey = `capitan-app/${division}/${key}.webp`;
    
    try {
      const buffer = (['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].indexOf(file.type as string) !== -1) ? await compressImage(Buffer.from(await file.arrayBuffer())) : Buffer.from(await file.arrayBuffer());

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_STORAGE_BUCKET_NAME!,
        Key: theKey,
        Body: buffer,
        ContentType: 'image/webp'
      });
      await this.client.send(command);
      return `https://${process.env.AWS_STORAGE_BUCKET_NAME!}.s3.amazonaws.com/${theKey}`;
    } catch (error) {
      return null;
    }
  }

  public delete = async (link: string) => {
    const key = link.replace(`https://${process.env.AWS_STORAGE_BUCKET_NAME!}.s3.amazonaws.com/`,'');

    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_STORAGE_BUCKET_NAME!,
        Key: key
      })
      await this.client.send(command);
      return true
    } catch (error) {
      return null;
    }
  }

  public list = async (prefix?: string) => {
    try {
      const command = new ListObjectsCommand({
        Bucket: process.env.AWS_STORAGE_BUCKET_NAME!
      })
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      return null;
    }
  }
}

export const files = new FileManager;