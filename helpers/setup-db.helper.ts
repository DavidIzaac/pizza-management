import * as mongoose from 'mongoose';

export default function setupDB() {
  mongoose.connect('mongodb://localhost/reports', { useNewUrlParser: true })
    .then(() => {
      console.log('Connected To DB!');
      dropAllCollections();
    })
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === "ns not found") return;
      if (
        error.message.includes("a background operation is currently running")
      ) {
        return;
      }
      console.log(error.message);
    }
  }
}