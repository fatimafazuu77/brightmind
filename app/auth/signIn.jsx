import { View, Text, StyleSheet ,Image,TextInput, Pressable,TouchableOpacity, ToastAndroid, ActivityIndicator} from 'react-native';
import React, { useContext , useState } from 'react';
import {useRouter} from 'expo-router'
import Colors from '../../constant/Colors';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from './../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { UserDetailsContext } from '../../context/UserDetailsContext';


export default function SignIn() {
  const router = useRouter();
  const[email,setEmail]= useState('');
  const[password,setPassword] =useState('');
  const{userDetail , setUserDetail}= useContext(UserDetailsContext);
  const[loading, setLoading]= useState(false);
  const onSignInClick=()=>{
    setLoading(true);
    signInWithEmailAndPassword(auth,email,password)
    .then(async(resp)=>{
      const user = resp.user
      console.log(user);
      await getUserDetail();
      setLoading(false);
      router.replace('/(tabs)/home');
    }).catch(e=>{console.log(e)
      setLoading(false);
      ToastAndroid.show('Incorrect Email & Password', ToastAndroid)
    })
  }
  const getUserDetail=async()=>{
    const result=await getDoc(doc(db, 'users', email));
    console.log(result.data())
    setUserDetail(result.data)

  }
  return (
    <View style={{
         display: 'flex',
         padding: 25,
         alignItems: 'center',
         paddingTop: 50, 
         flex: 1,
         backgroundColor: Colors.WHITE
       }}>
         <Image source={require('../../assets/images/logobright.jpeg')}
           style={{
             width: 180,
             height: 180,
             marginTop:70
           }}
         />
         <Text style={{
           fontSize: 30,
           fontFamily: 'outfit-bold'
         }}>Welcome Back</Text>
   
         <TextInput placeholder='Email' 
         onChangeText={(value)=>setEmail(value)}
          placeholderTextColor="#000"  style={styles.textinput} />
         <TextInput placeholder='Password' 
          onChangeText={(value)=>setPassword(value)}
          placeholderTextColor="#000" secureTextEntry={true} style={styles.textinput} />
   
         <TouchableOpacity 
         onPress={onSignInClick}
         disabled ={loading}
         style={{
           padding: 15,
           backgroundColor: Colors.PRIMARY,
           width: '100%',
           marginTop: 25,
           borderRadius: 10
         }}>
           {!loading? <Text style={{
             fontFamily: 'outfit',
             color: Colors.WHITE,
             textAlign: 'center'
           }}>Sign in</Text>:<ActivityIndicator size={'large'} color={Colors.WHITE}/>
          }
         </TouchableOpacity>
   
         <View style={{
           display: 'flex',
           flexDirection: 'row', gap: 5,
           marginTop: 20
         }}>
           <Text style={{
             fontFamily: 'outfit'
           }}>Dont have an account?
           </Text>
           <Pressable onPress={() => router.push('/auth/signUp')}>
             <Text style={{
               color: Colors.PRIMARY,
               fontFamily: 'outfit-bold'
             }}>Create new here</Text>
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
  
  
