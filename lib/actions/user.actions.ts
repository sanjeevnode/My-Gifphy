"use server";

import { db } from "@/app/firebase/config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export const addToFavorites = async (userId: string, gif: string) => {
  try {
    const userRef = doc(db, "favorites", userId);

    // Get the current document
    const userDoc = await getDoc(userRef);

    // Get the current gifs array or an empty array if it doesn't exist
    const currentGifs = userDoc.data()?.gifs || [];

    // Add the new gif to the array
    const newGifs = [...currentGifs, gif];

    // Write the updated array back to Firestore
    await setDoc(userRef, { gifs: newGifs }, { merge: true });

    revalidatePath("/");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const removeFromFavorites = async (userId: string, gif: string) => {
  try {
    const userRef = doc(db, "favorites", userId);

    // Get the current document
    const userDoc = await getDoc(userRef);

    // Get the current gifs array or an empty array if it doesn't exist
    const currentGifs = userDoc.data()?.gifs || [];

    // Remove the gif from the array
    const newGifs = currentGifs.filter((g: string) => g !== gif);

    // Write the updated array back to Firestore
    await setDoc(userRef, { gifs: newGifs }, { merge: true });
    revalidatePath("/favorites");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getFavorites = async (userId: string) => {
  try {
    const userRef = doc(db, "favorites", userId);

    // Get the current document
    const userDoc = await getDoc(userRef);

    // Get the current gifs array or an empty array if it doesn't exist
    const currentGifs = userDoc.data()?.gifs || [];

    return currentGifs;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
