import { RootState } from "@/redux/store";
import { setUser } from "@/redux/userSlice";
import { FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useDispatch } from "react-redux";

export const getPremiumStatus = async (app: FirebaseApp) => {
//   const auth = getAuth(app);
//   const userId = auth.currentUser?.uid;
//   if (!userId) throw new Error("User not logged in");

//   const db = getFirestore(app);
//   const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
//   const q = query(
//     subscriptionsRef,
//     where("status", "in", ["trialing", "active"]),
//   );

//   return new Promise<boolean>((resolve, reject) => {
//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         // In this implementation we only expect one active or trialing subscription to exist.
//         console.log("Subscription snapshot", snapshot.docs.length);
//         if (snapshot.docs.length === 0) {
//           console.log("No active or trialing subscriptions found");
//           resolve(false);
//         } else {
//           console.log("Active or trialing subscription found");
//           resolve(true);
//         }
//         unsubscribe();
//       },
//       reject
//     );
//   });
// };

const dispatch = useDispatch();

return new Promise<string>((resolve, reject) => {
  const auth = getAuth(app);
  const unsubscribeAuthState = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userId = user.uid;
      const db = getFirestore(app);
      const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
      const q = query(
        subscriptionsRef,
        where("status", "in", ["trialing", "active"])
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const hasSubscription = snapshot.docs.length > 0;
          if (hasSubscription) {
            const subscriptionData = snapshot.docs[0].data()
            const tier = subscriptionData.items[0]?.price.product.name as string | PromiseLike<string>;
            console.log(tier)
            resolve(tier);
          } else {
            resolve("Basic");
          }
          unsubscribe();
        },
        reject
      );
    } else {
      // User is not logged in, resolve with basic tier
      resolve("Basic");
    }
    unsubscribeAuthState();
  });
});
};