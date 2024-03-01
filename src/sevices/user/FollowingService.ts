import { db } from "../firebase/config";
import {
  doc,
  collection,
  deleteDoc,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
export const followUser = async (
  followerUserId: string,
  followingUserId: string
) => {
  try {
    // const followingCollectionRef = collection(db, "following");
    // const userFollowingDocRef = doc(followingCollectionRef, followingUserId);
    const followingCollectionRef = collection(
      doc(collection(db, "following"), followerUserId),
      "following"
    );

    await setDoc(doc(followingCollectionRef, followingUserId), {
      timestamp: new Date(Date.now()),
    });
    try {
      const followersCollectionRef = collection(
        doc(collection(db, "following"), followingUserId),
        "followers"
      );
      await setDoc(doc(followersCollectionRef, followerUserId), {
        timestamp: new Date(Date.now()),
      });
    } catch (error: any) {
      return { error: error.message };
    }
    return true;
  } catch (error: any) {
    return { error: error.message };
  }
};
export const unFollowUser = async (
  followerUserId: string,
  followingUserId: string
) => {
  try {
    const followingCollectionRef = collection(
      doc(collection(db, "following"), followerUserId),
      "following"
    );

    await deleteDoc(doc(followingCollectionRef, followingUserId));

    try {
      const followersCollectionRef = collection(
        doc(collection(db, "following"), followingUserId),
        "followers"
      );
      await deleteDoc(doc(followersCollectionRef, followerUserId));
    } catch (error: any) {
      return { error: error.message };
    }
    return true;
  } catch (error: any) {
    return { error: error.message };
  }
};
export const isFollowedBy = async (
  followerUserId: string,
  followingUserId: string
) => {
  const followersCollectionRef = collection(
    doc(collection(db, "following"), followingUserId),
    "following"
  );
  try {
    const followerSnap = await getDoc(
      doc(followersCollectionRef, followerUserId)
    );

    if (followerSnap.data()) return true;
    return false;
  } catch (error: any) {
    return { error: error.message };
  }
};
export const getAllFollowing = async (userId: string) => {
  const following: any = [];

  const followingCollectionRef = collection(
    doc(collection(db, "following"), userId),
    "following"
  );

  const followingRef = query(
    followingCollectionRef,
    orderBy("timestamp", "desc")
  );

  try {
    const followingSnap = await getDocs(query(followingRef));
    followingSnap.forEach((doc) => {
      const tempData = doc.data();
      tempData.recipeID = doc.id;
      following.push(tempData);
    });
    console.log(following);
    return following;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getAllFollowers = async (userId: string) => {
  const followers: any = [];

  const followersCollectionRef = collection(
    doc(collection(db, "following"), userId),
    "followers"
  );

  const followersRef = query(
    followersCollectionRef,
    orderBy("timestamp", "desc")
  );

  try {
    const followerSnap = await getDocs(query(followersRef));
    followerSnap.forEach((doc) => {
      const tempData = doc.data();
      tempData.recipeID = doc.id;
      followers.push(tempData);
    });
    console.log(followers);
    return followers;
  } catch (error: any) {
    return { error: error.message };
  }
};
