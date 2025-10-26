# Full-Stack Blog App

A full-stack blogging application built with **React** and **Appwrite**. Users can create, edit, delete, and view posts with rich text content and featured images.

## Features
- User authentication (sign up, login, logout) via Appwrite
- Create, edit, delete posts
- Upload and preview featured images
- TinyMCE rich text editor for content
- Responsive UI with Tailwind CSS
- CRUD operations integrated with Appwrite Database & Storage

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend & Storage: Appwrite
- Rich Text Editor: TinyMCE
- State Management: Redux
- Routing: React Router

## Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
Install dependencies:

 2. bash
Copy code
npm install
3. Configure Appwrite in conf/conf.js:


export default {
  appwriteUrl: "<YOUR_APPWRITE_ENDPOINT>",
  appwriteProjectId: "<YOUR_PROJECT_ID>",
  appwriteDatabaseId: "<DATABASE_ID>",
  appwriteCollectionId: "<COLLECTION_ID>",
  appwriteBucketId: "<BUCKET_ID>",
};
4. Start the development server:


npm run dev
5. Usage
Navigate to Home to view all posts

Add Post to create a new post with image and rich text

Edit/Delete posts if you are the author
