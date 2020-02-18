import * as mongoose from 'mongoose';

export function setupDB() {
  return mongoose.connect('mongodb://localhost/reports', { useNewUrlParser: true })
}

export async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      console.log(error.message);
    }
  }
}