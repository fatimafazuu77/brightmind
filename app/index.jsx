import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from '../constant/Colors';
import { useRouter } from "expo-router";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { useEffect } from "react";
import { useUserDetails } from "./context/UserDetailContext";
import { doc, getDoc } from 'firebase/firestore';

export default function Index() {
  const router = useRouter();
  const { updateUserDetails } = useUserDetails();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get complete user details from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.email));
          if (userDoc.exists()) {
            updateUserDetails({
              ...userDoc.data(),
              id: user.uid,
              isAuthenticated: true
            });
          } else {
            // Fallback to basic user details if Firestore document doesn't exist
            updateUserDetails({
              id: user.uid,
              name: user.displayName || '',
              email: user.email || '',
              isAuthenticated: true
            });
          }
          router.replace('/(tabs)/home');
        } catch (error) {
          console.error('Error fetching user details:', error);
          // Fallback to basic user details if there's an error
          updateUserDetails({
            id: user.uid,
            name: user.displayName || '',
            email: user.email || '',
            isAuthenticated: true
          });
          router.replace('/(tabs)/home');
        }
      } else {
        // If no user is logged in, redirect to signup
        router.replace('/auth/signUp');
      }
    });

    return () => unsubscribe();
  }, [router, updateUserDetails]);

  // Return null or a loading screen while checking auth state
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 70,
  },
  content: {
    padding: 25,
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: Colors.WHITE,
    // fontFamily: 'outfit-bold',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    color: Colors.WHITE,
    marginTop: 20,
    textAlign: 'center',
    // fontFamily: 'outfit',
    fontWeight: 'normal',
  },
  button: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  signInButton: {
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.WHITE,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    // fontFamily: 'outfit',
  },
});
