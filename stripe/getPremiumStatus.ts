import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const getPremiumStatus = async (app: FirebaseApp) => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not logged in");

  const db = getFirestore(app);
  const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
  const q = query(
    subscriptionsRef,
    where("status", "in", ["trialing", "active"])
  );

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const subscriptionData = snapshot.docs[0]?.data();
        const tier = subscriptionData?.items[0]?.price.product.name as string;
        // In this implementation we only expect one active or trialing subscription to exist.
        console.log("Subscription snapshot", snapshot.docs.length);
        if (snapshot.docs.length === 0) {
          console.log("No active or trialing subscriptions found");
          resolve("Basic");
        } else {
          console.log("Active or trialing subscription found");
          resolve(tier);
        }
        unsubscribe();
      },
      reject
    );
  });
};