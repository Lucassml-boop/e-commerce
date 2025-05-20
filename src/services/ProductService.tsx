import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import type { Product } from "../types/Product";

const productsCollection = collection(db, "products");

export const getAllProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
};

export const addProduct = async (product: Omit<Product, "id">) => {
  await addDoc(productsCollection, product);
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const productDoc = doc(productsCollection, id);
  await updateDoc(productDoc, product);
};

export const deleteProduct = async (id: string) => {
  const productDoc = doc(productsCollection, id);
  await deleteDoc(productDoc);
};