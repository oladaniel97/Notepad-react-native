import { Text, View ,ImageBackground,TouchableOpacity, TextInput, SafeAreaView,Keyboard,Alert,StatusBar, TouchableWithoutFeedback,ScrollView} from 'react-native'
import React from 'react'
import { GlobalStyle } from '../static/globalstyle'
import { Formik } from 'formik'
import * as yup from 'yup'
import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


export default function AddNew({navigation,route}) {

    const {notes,setNotes}=route.params
    
  

    const schema = yup.object({
        title:yup.string().min(2),
        note:yup.string().required().min(2),
    })

    const submitForm = async(values) => {
        try {
            await schema.validate(values)
            // we can use yup to validate our form
            const updatedNote =[{key: shortid.generate(),
                title: values.title,
                note: values.note,
                },...notes]
            await AsyncStorage.setItem('note',JSON.stringify(updatedNote))
            setNotes(updatedNote)
            navigation.goBack();
        } catch (error) {
            Alert.alert('Oops!', error.message, [{ text: 'Understood' }]);
        }

        // or
        // if(values.name!='' && values.full_name!=''&& values.age!='' && values.about!=''){
        //     setPeople([{key: shortid.generate(),
        //         name: values.name,
        //         age: values.age,
        //         about: values.about,
        //         full_name: values.full_name,},...people])
        //     navigation.goBack();
        // }
        // else{
        //     Alert.alert('Oops!','please enter a word or sentence',[{text:'Understood'}])
        // }
        Keyboard.dismiss()
    }

    return (
        <ImageBackground  style={{flex:1}} source={require('../assets/bg.jpg')}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={GlobalStyle.container}>
            <StatusBar backgroundColor='white' barStyle={'dark-content'}/>
            
{/* install formik by using npm install formik */}
{/* npm install yul for form validation */}
        <ScrollView keyboardShouldPersistTaps="always" >
            <Formik initialValues={{title:'',note:''}} onSubmit={submitForm} validationSchema={schema}>
                {({handleChange, handleBlur,handleSubmit, values, errors, touched})=>(
                    
                    <SafeAreaView >
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Ionicons name="arrow-back-sharp" size={32} color="black"  onPress={()=>navigation.goBack()}/>
                        <Text style={[GlobalStyle.text,{fontSize:24,color:'teal'}]}>Add New </Text>
                        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.5}>
                            <Text style={[GlobalStyle.button,]}>Save Note</Text>
                        </TouchableOpacity>
            </View>
                        <View style={{marginTop:5}}>
                            <TextInput style={GlobalStyle.textinput} value={values.title} onChangeText={handleChange('title')} onBlur={handleBlur('title')} placeholder='Title'/>
                        </View>
                        <Text style={GlobalStyle.error}>{touched.title &&errors.title}</Text>
                        <View>
                            <TextInput style={GlobalStyle.textinput} value={values.note} onChangeText={handleChange('note')} onBlur={handleBlur('note')} placeholder='Write a note...' multiline={true}/>
                        </View>
                        <Text style={GlobalStyle.error}>{touched.note && errors.note}</Text>
                        
                    </SafeAreaView>
                )}
            </Formik>
        </ScrollView>
        </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
      )
    }