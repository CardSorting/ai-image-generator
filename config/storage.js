import AWS from 'aws-sdk';
import {
  BACKBLAZE_ENDPOINT,
  BACKBLAZE_BUCKET_NAME,
  BACKBLAZE_KEY_ID,
  BACKBLAZE_APP_KEY
} from '@env';

// Configure AWS SDK for Backblaze B2
const s3 = new AWS.S3({
  endpoint: BACKBLAZE_ENDPOINT,
  credentials: {
    accessKeyId: BACKBLAZE_KEY_ID,
    secretAccessKey: BACKBLAZE_APP_KEY
  },
  s3ForcePathStyle: true,
  signatureVersion: 'v4'
});

export const uploadImage = async (imageUri, userId) => {
  try {
    // Convert image URI to blob
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Create unique filename
    const timestamp = Date.now();
    const filename = `${userId}/${timestamp}.jpg`;

    // Upload to Backblaze B2
    const uploadParams = {
      Bucket: BACKBLAZE_BUCKET_NAME,
      Key: filename,
      Body: blob,
      ContentType: 'image/jpeg'
    };

    const result = await s3.upload(uploadParams).promise();
    return result.Location;
  } catch (error) {
    console.error('Error uploading to B2:', error);
    throw error;
  }
};

export const deleteImage = async (imageUrl) => {
  try {
    // Extract key from URL
    const key = imageUrl.split('/').slice(-2).join('/'); // Gets userId/timestamp.jpg

    const deleteParams = {
      Bucket: BACKBLAZE_BUCKET_NAME,
      Key: key
    };

    await s3.deleteObject(deleteParams).promise();
  } catch (error) {
    console.error('Error deleting from B2:', error);
    throw error;
  }
};

export const getSignedUrl = async (imageUrl) => {
  try {
    // Extract key from URL
    const key = imageUrl.split('/').slice(-2).join('/');

    const params = {
      Bucket: BACKBLAZE_BUCKET_NAME,
      Key: key,
      Expires: 3600 // URL expires in 1 hour
    };

    return await s3.getSignedUrlPromise('getObject', params);
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};
