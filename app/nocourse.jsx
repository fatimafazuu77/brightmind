import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from '../components/Shared/Button'
import { useRouter } from 'expo-router'
import BackgroundContainer from '../components/Shared/BackgroundContainer'

export default function NoCourse() {
  const router = useRouter();
  return (
    <BackgroundContainer>
      <View style={{
          marginTop: 40,
          alignItems: 'center',
          display: 'flex'
      }}>
        <Image source={require('./../assets/images/nbicon.jpg')}
          style={{
            height: 200,
            width: 200
          }}
        />
        <Text style={{
          // fontFamily: 'outfit-bold',
          fontWeight: 'bold',
          fontSize: 25,
          textAlign: 'center'
        }}>You Don't Have Any course</Text>

        <Button text={' + Create new Course'} onPress={() => router.push('/addCourse')}/>
        <Button text={'Explore Existing Courses'} onPress={() => router.push('/explore')} type="outline" />
      </View>
    </BackgroundContainer>
  )
} 