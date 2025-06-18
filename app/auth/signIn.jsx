import { View, Text, StyleSheet ,Image,TextInput, Pressable,TouchableOpacity, ToastAndroid, ActivityIndicator} from 'react-native';
import React, { useState } from 'react';
import {useRouter} from 'expo-router'
import Colors from '../../constant/Colors';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from './../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useUserDetails } from '../context/UserDetailContext';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateUserDetails } = useUserDetails();

  const SignInUser = () => {
    if (!email || !password) {
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(async(resp) => {
      const user = resp.user;
      console.log(user);
      await GetUser(user);
    })
    .catch(e => {
      console.log(e.message);
    });
  };

  const GetUser = async(user) => {
    const docRef = doc(db, 'users', email);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      updateUserDetails(data);
      router.replace('/(tabs)/home');
    }
  };

  return (
    <View style={{
         display: 'flex',
         padding: 25,
         alignItems: 'center',
         paddingTop: 50, 
         flex: 1,
         backgroundColor: Colors.WHITE
       }}>
         <Image source={require('../../assets/images/logo3.png')}
           style={{
             width: 250,
             height: 180,
             marginTop:70
           }}
         />
         <Text style={{
           fontSize: 30,
           fontWeight: 'bold'
         }}>Welcome Back</Text>
   
         <TextInput placeholder='Email' 
         onChangeText={(value)=>setEmail(value)}
          placeholderTextColor="#000"  style={styles.textinput} />
         <TextInput placeholder='Password' 
          onChangeText={(value)=>setPassword(value)}
          placeholderTextColor="#000" secureTextEntry={true} style={styles.textinput} />
   
         <TouchableOpacity 
         onPress={SignInUser}
         style={{
           padding: 15,
           backgroundColor: Colors.PRIMARY,
           width: '100%',
           marginTop: 25,
           borderRadius: 10
         }}>
           <Text style={{
             fontWeight: 'normal',
             color: Colors.WHITE,
             textAlign: 'center'
           }}>Sign In</Text>
         </TouchableOpacity>
   
         <View style={{
           display: 'flex',
           flexDirection: 'row', gap: 5,
           marginTop: 20
         }}>
           <Text style={{
             fontWeight: 'normal'
           }}>Don't have an account?
           </Text>
           <Pressable onPress={() => router.push('/auth/signUp')}>
             <Text style={{
               color: Colors.PRIMARY,
               fontWeight: 'bold'
             }}>Sign up Here</Text>
           </Pressable>
         </View>
       </View>
     );
   }
   
   const styles = StyleSheet.create({
     textinput: {
       borderWidth: 1,
       width: '100%',
       padding: 10,
       fontSize: 18,
       marginTop: 20,
       borderRadius: 8,
     }
   });
  
  
