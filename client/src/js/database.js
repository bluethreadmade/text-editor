import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Adding content to the database:', content);

  // Open the IndexedDB database named "contact" with version 1
  const contactDb = await openDB('contact', 1);

  // Create a read-write transaction on the "contact" object store
  const tx = contactDb.transaction('contact', 'readwrite');

  // Access the "contact" object store within the transaction
  const store = tx.objectStore('contact');

  // Add the content to the object store
  await store.add(content);

  console.log('Content added to the database');

  // Ensure the transaction is completed
  await tx.done;
}
// console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const contentDb = await openDB('content', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contentDb.transaction('content', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('content');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
