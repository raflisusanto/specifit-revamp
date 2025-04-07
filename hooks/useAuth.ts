import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useAuthStore } from "@/store/useAuthStore";
import { auth, db } from "@/config/firebase";

export const useAuth = () => {
  const setAuthState = useAuthStore((state) => state.setAuthState);

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    },
    onSuccess: (user) => {
      Alert.alert("success");
      setAuthState(true, user.uid);
    },
    onError: (error: any) => {
      Alert.alert(error.message);
    },
  });

  const initializeDb = async (userId: string, name: string, email: string) => {
    try {
      await setDoc(doc(db, "users", userId), {
        email,
        name,
        timeStamp: serverTimestamp(),
      });

      await setDoc(doc(db, "userdata", userId), {
        gender: "",
        age: "",
        height: "",
        weight: "",
        activity: "",
        medicalCondition: "",
        isFilled: false,
        recommendation: {
          loseweight: false,
          gainweight: false,
          agility: false,
          fatburn: false,
          strength: false,
          calist: false,
          gemuk: false,
          normal: false,
          kurus: false,
          injury: false,
          item: false,
          recommend: false,
          sevendays: false,
          fourteendays: false,
          morefourteen: false,
        },
        imt: 0,
        imtStatus: "",
        calPerDayHold: 0,
        calPerDayLose: 0,
      });

      await setDoc(doc(db, "programstatus", userId), {
        programid: [],
        statusDay: {},
        bookmark: [],
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const signUpMutation = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await initializeDb(userCredential.user.uid, name, email);
      return userCredential.user;
    },
    onSuccess: (user) => {
      setAuthState(true, user.uid);
    },
    onError: (error: any) => {
      Alert.alert(error.message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await signOut(auth);
    },
    onSuccess: () => {
      setAuthState(false, null);
    },
    onError: (error: any) => {
      Alert.alert(error.message);
    },
  });

  return {
    login: loginMutation.mutate,
    signUp: signUpMutation.mutate,
    logout: logoutMutation.mutate,
  };
};
