import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import React , {useState} from 'react';
import {UserDetailsContext} from './../context/UserDetailsContext';

export default function RootLayout() {

  const[loaded,error]= useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf'),
  })

  const [UserDetail,setUserDetail]= useState();
  return (
    <UserDetailsContext.Provider value={{UserDetail,setUserDetail}}>
    <Stack screenOptions={{
      headerShown:false 
    }}>
    </Stack>
    </UserDetailsContext.Provider>
  )
  }


