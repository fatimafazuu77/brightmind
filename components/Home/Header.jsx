import { View, Text , TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserDetailsContext } from '../../context/UserDetailsContext'
export default function Header() {
const {userDetail, setUserDetail } = useContext(UserDetailsContext)
 

  return (
    <View style={{
        display:'flex',
        flexDirection: 'row',
        justifyContent : 'space-between',
        alignItems:'center',
        }}>
        <View>
      <Text style={{fontFamily: 'outfit-bold',
        fontSize:25
      }}
      >Hello, {userDetail?.name } </Text>
    <Text style={{
        fontFamily: 'outfit',
        fontSize:17
    }}>Let's get started</Text>
    </View>
    <TouchableOpacity>
      <Ionicons name="settings-outline" size={30} color="black" />
    </TouchableOpacity>
    </View>
  )
}