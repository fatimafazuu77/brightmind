import { View, Text , TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUserDetails } from '../../app/context/UserDetailContext'

export default function Header() {
  const { userDetails } = useUserDetails()
 
  return (
    <View style={{
        display:'flex',
        flexDirection: 'row',
        justifyContent : 'space-between',
        alignItems:'center',
        }}>
        <View>
      <Text style={{
        // fontFamily: 'outfit-bold',
        fontWeight: 'bold',
        fontSize:25
      }}
      >Hello, {userDetails?.name } </Text>
    <Text style={{
        // fontFamily: 'outfit',
        fontWeight: 'normal',
        fontSize:17
    }}>Let's get started</Text>
    </View>
    <TouchableOpacity>
      <Ionicons name="settings-outline" size={30} color="black" />
    </TouchableOpacity>
    </View>
  )
}