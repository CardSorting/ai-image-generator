import { db } from '../config/firebase';
import { collection, addDoc, query, orderBy, getDocs, deleteDoc, doc, updateDoc, increment, getDoc, where, Timestamp } from '@react-native-firebase/firestore';
import { uploadImage, deleteImage, getSignedUrl } from '../config/storage';
import { getCurrentUser } from './auth';
import { v4 as uuidv4 } from 'uuid';

const COLLECTIONS = {
  IMAGES: 'images',
  USERS: 'users',
  CREDITS: 'buzz'
};

const DAILY_CREDITS = 25;

export const initDatabase = async () => {
  const user = getCurrentUser();
  if (!user) return;

  // Initialize or update user credits
  const creditsRef = doc(db, COLLECTIONS.CREDITS, user.uid);
  const creditsDoc = await getDoc(creditsRef);

  if (!creditsDoc.exists()) {
    // First time user gets initial credits
    await creditsRef.set({
      balance: DAILY_CREDITS,
      lastRefill: Timestamp.now(),
      totalGenerated: 0
    });
  } else {
    // Check if it's time for daily credit refill
    const lastRefill = creditsDoc.data().lastRefill.toDate();
    const now = new Date();
    const daysSinceRefill = (now - lastRefill) / (1000 * 60 * 60 * 24);

    if (daysSinceRefill >= 1) {
      await updateDoc(creditsRef, {
        balance: DAILY_CREDITS,
        lastRefill: Timestamp.now()
      });
    }
  }
};

export const checkCredits = async () => {
  const user = getCurrentUser();
  if (!user) throw new Error('User must be authenticated');

  const creditsRef = doc(db, COLLECTIONS.CREDITS, user.uid);
  const creditsDoc = await getDoc(creditsRef);

  if (!creditsDoc.exists()) {
    await initDatabase();
    return DAILY_CREDITS;
  }

  return creditsDoc.data().balance;
};

export const useCredit = async () => {
  const user = getCurrentUser();
  if (!user) throw new Error('User must be authenticated');

  const creditsRef = doc(db, COLLECTIONS.CREDITS, user.uid);
  
  return db.runTransaction(async (transaction) => {
    const creditsDoc = await transaction.get(creditsRef);
    const currentCredits = creditsDoc.data().balance;

    if (currentCredits < 1) {
      throw new Error('Not enough credits');
    }

    transaction.update(creditsRef, {
      balance: increment(-1),
      totalGenerated: increment(1)
    });

    return currentCredits - 1;
  });
};

export const saveImage = async (imageUri, prompt) => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to save images');
    }

    // Use a credit
    await useCredit();

    // Generate unique request ID
    const requestId = uuidv4();

    // Upload image to Backblaze B2
    const imageUrl = await uploadImage(imageUri, user.uid);

    // Save metadata to Firestore
    const imageData = {
      url: imageUrl,
      prompt,
      userId: user.uid,
      requestId,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
      status: 'active',
      metadata: {
        originalPrompt: prompt,
        generationParams: {},
        userAgent: 'react-native-app'
      }
    };

    const docRef = await addDoc(collection(db, COLLECTIONS.IMAGES), imageData);

    return {
      id: docRef.id,
      ...imageData
    };
  } catch (error) {
    throw new Error(`Failed to save image: ${error.message}`);
  }
};

export const getImages = async () => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to fetch images');
    }

    const imagesQuery = query(
      collection(db, COLLECTIONS.IMAGES),
      where('userId', '==', user.uid),
      where('status', '==', 'active'),
      orderBy('created_at', 'desc')
    );

    const querySnapshot = await getDocs(imagesQuery);
    const images = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get signed URLs for all images
    const imagesWithSignedUrls = await Promise.all(
      images.map(async (image) => ({
        ...image,
        signedUrl: await getSignedUrl(image.url)
      }))
    );

    return imagesWithSignedUrls;
  } catch (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  }
};

export const deleteImage = async (id) => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to delete images');
    }

    const imageRef = doc(db, COLLECTIONS.IMAGES, id);
    const imageDoc = await getDoc(imageRef);

    if (!imageDoc.exists()) {
      throw new Error('Image not found');
    }

    const imageData = imageDoc.data();
    if (imageData.userId !== user.uid) {
      throw new Error('Unauthorized access to image');
    }

    // Soft delete in Firestore
    await updateDoc(imageRef, {
      status: 'deleted',
      deleted_at: Timestamp.now(),
      updated_at: Timestamp.now()
    });

    // Delete from Backblaze B2
    await deleteImage(imageData.url);
  } catch (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

export const getImageById = async (id) => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to fetch image');
    }

    const imageRef = doc(db, COLLECTIONS.IMAGES, id);
    const imageDoc = await getDoc(imageRef);

    if (!imageDoc.exists()) {
      throw new Error('Image not found');
    }

    const imageData = imageDoc.data();
    if (imageData.userId !== user.uid || imageData.status !== 'active') {
      throw new Error('Unauthorized access to image');
    }

    // Get signed URL for the image
    const signedUrl = await getSignedUrl(imageData.url);

    return {
      id: imageDoc.id,
      ...imageData,
      signedUrl
    };
  } catch (error) {
    throw new Error(`Failed to fetch image: ${error.message}`);
  }
};

export const getCredits = async () => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated');
    }

    const creditsRef = doc(db, COLLECTIONS.CREDITS, user.uid);
    const creditsDoc = await getDoc(creditsRef);

    if (!creditsDoc.exists()) {
      await initDatabase();
      return {
        balance: DAILY_CREDITS,
        totalGenerated: 0,
        lastRefill: new Date()
      };
    }

    return creditsDoc.data();
  } catch (error) {
    throw new Error(`Failed to fetch credits: ${error.message}`);
  }
};
