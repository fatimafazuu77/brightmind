import { View, Text, TextInput,StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import Button from '../../components/Shared/Button'
import { useState } from 'react'
import { GenerateTopicAIModel } from '../../config/AiModel'

export default function Addcourse() {
    const [loading,setloading]=useState(false);
    const [userInput,setUserInput]= useState();
    const onGenerateTopic= async() => {
      setloading(true);
        //Get topic idea from ai
        const PROMPT= userInput + Prompt.IDEA;
        const aiResp= await GenerateTopicAIModel.sendMessage(PROMPT);
      const topicIdea=JSON.parse(aiResp.response.text());
      console.log(topicIdea); 
      setloading(false);
    }
  return (
    <View style={{
        padding:25,
        marginTop:28,
        backgroundColor:Colors.WHITE,
        flex:1
    }}>
     <Text style={{
        fontFamily:'outfit-bold',
        
        fontSize:30
     }}
     >Create New Course</Text>
     <Text style={{
        fontFamily:'outfit',
        fontSize:25
     }}>
        What do you to learn today?
     </Text>
     <Text style={{
        fontFamily:'outfit',
        fontSize:20,
        marginTop:8,
        color:Colors.GREY
     }}>What course you want to create (eg.Learn Python , Digital Marketing, Affiliate Marketing, 10th Science Chapter,etc..)</Text>

     <TextInput placeholder='(Ex.Learn Python,Learn 12th Maths, Seo course' 
     style={styles.textInput}
     numberOfLines={3}
     multiline={true}
     onChangeText={(value) => {
      console.log("User typed:", value);
      setUserInput(value)}}
     
     />
    <Button
  title="Generate Course"
  onPress={onGenerateTopic}
  disabled={loading}
/>
    </View>
 )}
 const Prompt = {
   IDEA: `
   :: As you are a coaching teacher
   - User wants to learn about the topic
   - Generate 5-7 Course titles for study (Short)
   - Make sure it is related to description
   - Output will be ARRAY of String in JSON FORMAT only
   - Do not add any plain text in output`
 };
 

    const styles = StyleSheet.create({
        textInput:{
            padding:15,
            borderWidth:1,
            borderRadius:15,
            height:100,
            marginTop:10,
            alignItems:'flex-start',
            fontSize:18
        }
    })
  
