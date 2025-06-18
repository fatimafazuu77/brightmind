import { Image, StyleSheet, View, Text, TouchableOpacity, TextInput, Pressable } from 'react-native';
import React , {useState} from 'react';
import { useRouter } from "expo-router";
import Colors from '../../constant/Colors';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ScreenStackHeaderConfig } from 'react-native-screens';
import { auth, db } from '../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useUserDetails } from '../context/UserDetailContext';

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateUserDetails } = useUserDetails();

  const CreateNewAccount = () => {
    if (!email || !password || !fullName) {
      return;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(resp) => {
      const user = resp.user;
      console.log(user);
      await SaveUser(user);
    })
    .catch(e => {
      console.log(e.message);
    });
  };

  const SaveUser = async(user) => {
    const data = {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid
    };
    await setDoc(doc(db, 'users', email), data);
    updateUserDetails(data);
    router.replace('/(tabs)/home');
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
      }}>Create New Account</Text>

      <TextInput 
        placeholder='Full Name'  
        onChangeText={(value) => setFullName(value)}
        value={fullName}
        placeholderTextColor="#000" 
        style={styles.textinput} 
      />
      <TextInput 
        placeholder='Email' 
        onChangeText={(value) => setEmail(value)}
        value={email}
        placeholderTextColor="#000"  
        style={styles.textinput} 
      />
      <TextInput 
        placeholder='Password' 
        onChangeText={(value) => setPassword(value)}
        value={password}
        placeholderTextColor="#000" 
        secureTextEntry={true} 
        style={styles.textinput} 
      />

      <TouchableOpacity 
        onPress={CreateNewAccount} 
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          width: '100%',
          marginTop: 25,
          borderRadius: 10
        }}
      >
        <Text style={{
          fontWeight: 'normal',
          color: Colors.WHITE,
          textAlign: 'center'
        }}>Create Account</Text>
      </TouchableOpacity>

      <View style={{
        display: 'flex',
        flexDirection: 'row', 
        gap: 5,
        marginTop: 20
      }}>
        <Text style={{
          fontWeight: 'normal'
        }}>Already have an account?
        </Text>
        <Pressable onPress={() => router.push('/auth/signIn')}>
          <Text style={{
            color: Colors.PRIMARY,
            fontWeight: 'bold'
          }}>Sign in Here</Text>
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