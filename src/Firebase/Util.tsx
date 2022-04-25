import db from "./Firebase";
import { setDoc, doc } from "firebase/firestore";

export const handleDoc = async (collection, id, payload) => {
  console.log(db);
  const docRef = doc(db, collection, id);
  console.log(docRef);
  await setDoc(docRef, payload);
}