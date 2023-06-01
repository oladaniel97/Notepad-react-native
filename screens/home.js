import { FlatList, ImageBackground, Text, TouchableOpacity, View,StatusBar } from 'react-native';
import React, { useState,useEffect } from 'react';
import { GlobalStyle } from '../static/globalstyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';


export default function Home({navigation}) {

    const [notes,setNotes]=useState([])

    const getData= async()=> {
      try {
        const jsonValue = await AsyncStorage.getItem('note');
        const storedNote = jsonValue != null ? JSON.parse(jsonValue) : [];
        setNotes(storedNote);
        console.log('lllll'  ,storedNote)
      } catch(e) {
        console.log(e);
      }
    }
    useEffect(() => {
      getData();
    }, []);

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getData();
      });
      return unsubscribe;
    }, [navigation]);

const AddNew=()=>{
    navigation.navigate('AddNew',{notes,setNotes})
}

const Delete= async(key)=>{
  try {
      setNotes(notes.filter((item)=>item.key!==key))
      await AsyncStorage.setItem('todo',JSON.stringify(notes.filter((item)=>item.key!==key)))
  } catch (error) {
      console.log(error)
  }
}

  return (
    <ImageBackground  style={{flex:1}} source={require('../assets/bg.jpg')}>
      <View style={GlobalStyle.container} >
      <StatusBar backgroundColor='white' barStyle={'dark-content'}/>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingBottom:5}}>
            <Text style={[GlobalStyle.text,{fontSize:24,color:'teal'}]}>NOTEPAD</Text>
            <TouchableOpacity onPress={AddNew}>
                <Text style={GlobalStyle.button}>Add New</Text>
            </TouchableOpacity>
        </View>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.key}
          extraData={notes}
          renderItem={({item})=>
              (
              <View style={[GlobalStyle.list,]}><TouchableOpacity onPress={()=>{navigation.navigate('Details',item,{notes,setNotes})}}>
                  <Text style={[GlobalStyle.listText,]}>{item.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{Delete(item.key)}} activeOpacity={0.5} >
              <Text ><AntDesign name="delete" size={36} color="teal" /></Text>
              </TouchableOpacity></View>
          )}
          />
      </View>
    </ImageBackground>
  )
}

