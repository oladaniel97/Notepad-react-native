import { StyleSheet, Text, View,TouchableOpacity,Image,ImageBackground ,TextInput,Alert} from 'react-native'
import React,{useState,useEffect} from 'react'
import { GlobalStyle } from '../static/globalstyle'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Details({navigation,route}) {

    const {notes,setNotes}=route.params
    const [note,setNote] = useState('')
    const [ title,setTitle] = useState('')

    const Details =()=>{
        setNote(route.params?.note)
        setTitle(route.params?.title)
    }
    useEffect(()=>{
        Details()
    },[])
    const key = route.params?.key

    const updateNote = async(key)=>{
        try {
            const value= await AsyncStorage.getItem('note')
            const notes = JSON.parse(value);
            
    console.log('route.params.key:', route.params);
    const noteKey = notes.findIndex(obj => obj.key === key);
    console.log(noteKey)

            if ( noteKey !== -1){
                notes[noteKey].title = title;
                notes[noteKey].note = note;
                await AsyncStorage.setItem('note',JSON.stringify(notes))
                
                console.log('notekey', notes)
        
                Alert.alert('Note updated successfully!')
            }else{ console.log('Keys do not match');}
        } catch (error) {
            Alert.alert('Error updating note. please try again')
        }
    }

   
    return (
        <ImageBackground  style={{flex:1}} source={require('../assets/bg.jpg')}>
        <View style={GlobalStyle.container}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:10}}>
            <Ionicons name="arrow-back-sharp" size={32} color="black"  onPress={()=>navigation.navigate('Home')}/>
                <TouchableOpacity onPress={()=>updateNote(key)}>
                    <Text style={GlobalStyle.button}>Save Note</Text>
                </TouchableOpacity>
            </View>
            <TextInput style={[GlobalStyle.textinput,{textAlign:'center',marginBottom:20}]} value={title} onChangeText={setTitle}  placeholder='Title'/>
            <TextInput style={[GlobalStyle.textinput,]} value={note} onChangeText={setNote}  placeholder='Write a note...' multiline={true}/>
            {/* <Image source={route.params?.image} style={GlobalStyle.image} /> */}

        </View>
        
        </ImageBackground>
      )
    }
    
   