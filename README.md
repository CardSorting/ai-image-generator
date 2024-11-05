# AI Image Generator with Firebase and Backblaze B2

A React Native application that generates AI images with Firebase authentication, Backblaze B2 storage, and a credit-based generation system.

## Features

- User Authentication (Firebase)
- Image Storage (Backblaze B2)
- Metadata Storage (Firestore)
- Credit-based Image Generation
- Daily Credit Refreshes
- User-specific Image Gallery
- Real-time Updates

## Credit System

- Each user receives 25 credits daily
- One credit generates one image
- Credits refresh automatically every 24 hours
- Unused credits are replaced during refresh
- Total generated images are tracked
- Transaction-safe credit operations
- Secure credit management through Firestore Rules

## Setup

### Prerequisites

1. Node.js and npm installed
2. React Native development environment set up
3. Firebase project created at [Firebase Console](https://console.firebase.google.com)
4. Backblaze B2 account and bucket created at [Backblaze](https://www.backblaze.com/b2/cloud-storage.html)

### Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Email/Password Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password provider
3. Create Firestore Database:
   - Go to Firestore Database
   - Create database
   - Start in production mode
   - Choose a location closest to your users
4. Set up Firestore Rules:
   - Copy the contents of `firestore.rules` to your Firebase Console
   - Deploy the rules

### Backblaze B2 Configuration

1. Create a Backblaze B2 account if you haven't already
2. Create a new bucket:
   - Set bucket name
   - Choose "Private" for file visibility
3. Create an application key:
   - Go to App Keys
   - Create a new application key
   - Set key capabilities to: "Read and Write"
   - Restrict to bucket you created
4. Note down:
   - Endpoint
   - Bucket name
   - Application Key ID
   - Application Key

### Environment Configuration

1. Copy `.env.template` to `.env`:
   ```bash
   cp .env.template .env
   ```

2. Fill in the required values in `.env`:

   Firebase Configuration:
   ```
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   Backblaze B2 Configuration:
   ```
   BACKBLAZE_ENDPOINT=your_b2_endpoint
   BACKBLAZE_BUCKET_NAME=your_bucket_name
   BACKBLAZE_KEY_ID=your_application_key_id
   BACKBLAZE_APP_KEY=your_application_key
   ```

   FAL AI Configuration:
   ```
   FAL_API_KEY=your_fal_api_key
   FAL_API_URL=your_fal_api_url
   ```

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

## Security Rules

The application implements comprehensive security rules to protect user data and ensure proper credit management:

### Credit Management Rules
```javascript
match /credits/{userId} {
  // Only owner can read their credits
  allow read: if isOwner(userId);
  
  // Initial credit creation with 25 credits
  allow create: if isOwner(userId) 
    && isValidCredit()
    && request.resource.data.balance == 25;
    
  // Allow updates for daily refresh or credit usage
  allow update: if isOwner(userId)
    && isValidCredit()
    && (
      // Daily refresh to 25 credits
      (request.resource.data.balance == 25 
       && !isWithinLastDay(resource.data.lastRefill))
      ||
      // Deduct one credit for generation
      (request.resource.data.balance == resource.data.balance - 1)
    );
}
```

### Image Management Rules
```javascript
match /images/{imageId} {
  // Read access for active images
  allow read: if isAuthenticated() 
    && resource.data.userId == request.auth.uid
    && resource.data.status != 'deleted';
  
  // Create new image if user has credits
  allow create: if isAuthenticated()
    && request.resource.data.userId == request.auth.uid
    && exists(/databases/$(database)/documents/credits/$(request.auth.uid))
    && get(/databases/$(database)/documents/credits/$(request.auth.uid)).data.balance > 0;
}
```

### Request Tracking Rules
```javascript
match /requests/{requestId} {
  // Track API calls and ensure credit availability
  allow create: if isAuthenticated()
    && request.resource.data.userId == request.auth.uid
    && exists(/databases/$(database)/documents/credits/$(request.auth.uid))
    && get(/databases/$(database)/documents/credits/$(request.auth.uid)).data.balance > 0;
}
```

## Architecture

The app uses modern SDKs and best practices:

- Authentication:
  - Firebase Authentication for user management
  - Protected routes and secure sessions

- Storage:
  - Backblaze B2 for image storage
  - Signed URLs for secure image access
  - Automatic cleanup on image deletion

- Database:
  - Firestore for image metadata and credits
  - Transaction-safe credit operations
  - Real-time updates and queries
  - User-specific data isolation

- Credit System:
  - Daily credit refreshes
  - Transaction-protected credit usage
  - Secure credit management
  - User-friendly credit display

- App Structure:
  - `/components` - React components
  - `/config` - Firebase and Backblaze configuration
  - `/utils` - Utility functions
  - `/hooks` - Custom React hooks

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Environment Variables

All sensitive configuration is stored in environment variables:

1. Never commit the `.env` file to version control
2. Use `.env.template` as a reference
3. Keep your credentials secure
4. Regularly rotate API keys for enhanced security
