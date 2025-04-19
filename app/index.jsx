import { Image,StyleSheet,Text, View, TouchableOpacity} from "react-native";
import Colors from '../constant/Colors';
import { useRouter} from "expo-router";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './../config/firebaseConfig'
export default function Index() {

  const router=useRouter();

  onAuthStateChanged(auth, async(user)=>{
    if(user){
      console.log(user);
      const result = await getDoc(doc(db,'users',user?.email));
      setUserDetails(result.data());
      router.replace('/(tabs)/home')
    }
  })
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE
        
}}
    >
    <Image source={require("./../assets/images/landing.jpg")}
  style ={{
    width: '100%',
    height:300,
    marginTop:70
    
  }}
  />
  <View style={{
    padding: 25,
    backgroundColor:Colors.PRIMARY,
    height: '100%',
    borderTopLeftRadius:35,
    borderTopRightRadius:35
  }}>
    <Text style={{
      fontSize:30,
      textAlign:'center',
      color:Colors.WHITE,
      fontFamily:'outfit-bold'

    }}>Welcome to BrightMind AI</Text>
    <Text style={{fontSize:20,
      color:Colors.WHITE,
      marginTop:20,
      textAlign:'center',
      fontFamily:'outfit'
    }}>Transform your ideas into engaging educational content, effortlessly with All.  📚🤖 </Text>

    <TouchableOpacity style={styles.button}
    onPress={()=>router.push('/auth/signUp')}>
      <Text style={[styles.buttonText, {color:Colors.PRIMARY}]}>
      Get Started</Text>
      </TouchableOpacity>
   
    
    <TouchableOpacity onPress={() => router.push('/auth/signIn')} style={[styles.button, {
      backgroundColor: Colors.PRIMARY,
      borderWidth:1,
      borderColor:Colors.WHITE
      }]}>
      <Text style={[styles.buttonText,{
        color:Colors.WHITE
      } ]}>Already have an Account?</Text>
      </TouchableOpacity>
      </View>
    </View>
    
    
  );
}
const styles = StyleSheet.create({
  button: {
    padding:20,
    backgroundColor: Colors.WHITE,
    marginTop:20,
    borderRadius: 10
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 18,
    fontFamily:'outfit'
  }
})