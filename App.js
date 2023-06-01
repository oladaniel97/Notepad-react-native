import 'react-native-gesture-handler';
import { useFonts} from "expo-font";

import Home from "./screens/home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Details from "./screens/details";
import About from "./screens/about";
import AddNew from './screens/register';
import React, { useState } from 'react';

// npx expo install expo-font @expo-google-fonts/nunito to install google font
// npm install @react-navigation/native for stack navigation
// npx expo install react-native-screens react-native-safe-area-context
// npm install @react-navigation/native-stack if u want to use stack navigator
// npm install @react-navigation/drawer for draw navigation ,that is, hamburger menu
// npx expo install react-native-gesture-handler react-native-reanimated
// add plugins: ['react-native-reanimated/plugin', ], to babel.config.js
// npx expo start -c

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

export default function App() {
  const [loaded] = useFonts({
    NunitoRegular: require("./assets/fonts/Nunito-Regular.ttf"),
    NunitoBold: require("./assets/fonts/Nunito-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  // const Homes=()=>{
  //   return (
  //   <Stack.Navigator initialRouteName="Home" screenOptions={{headerTitleStyle:{fontFamily:'NunitoBold'},animation:'slide_from_bottom',}}>
  //       <Stack.Screen name='Home' component={Home} options={{title:'Review App',headerShown: false}}  />
  //       <Stack.Screen name='AddNew' component={AddNew} options={{title:'About Review App',headerShown: false }} />
  //       <Stack.Screen name='Details' component={Details} options={({route})=>({title:route.params.name,headerShown: false,
  //     })}/>
  //   </Stack.Navigator>)
  // }
  
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerTitleStyle:{fontFamily:'NunitoBold'},animation:'slide_from_bottom',}}>
        <Stack.Screen name='Home' component={Home} options={{title:'Review App',headerShown: false}}  />
        <Stack.Screen name='AddNew' component={AddNew} options={{title:'About Review App',headerShown: false }} />
         <Stack.Screen name='Details' component={Details} options={({route})=>({title:route.params.name,headerShown: false,
    })}/>
     </Stack.Navigator>

      </NavigationContainer>
     );
  }

  



