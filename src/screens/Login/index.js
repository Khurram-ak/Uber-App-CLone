import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Alert } from 'react-native';
import * as Facebook from 'expo-facebook';
import { Button } from 'react-native-paper';
import mainbg from '../../Image/mainbg.jpg'
import firebase from 'firebase';

export default function LogIn({ setSignedIn ,setDriverSignIn}) {
  const [user, setUser] = useState(false)

  return <>

    <ImageBackground source={mainbg} resizeMode="cover" style={styles.image}>

      <View style={styles.title2}>

        <Text style={{ fontSize: 25, marginBottom: 60, fontWeight: "700" }}>KAAR-APP. </Text>
        <Text style={{ fontWeight: "500", fontSize: 20, marginBottom: 20 }}>Login As User </Text>
        <Button icon="facebook" mode="contained" color="black" onPress={() => { LogInSetup(setUser) }}  >
          Click Here To Login
        </Button>
        <Text style={{ fontWeight: "500", fontSize: 20, marginBottom: 20,marginTop:20 }}>Login As Driver </Text>
        <Button 
        icon="facebook" 
        mode="contained" 
        color="black" 
        onPress={() => {setSignedIn({type:true,name:"driver"})  }}  >
          Click Here 
        </Button>

        {user && setSignedIn({type:true,name:"user"})}
        <StatusBar />
      </View>
    </ImageBackground>
  </>
}
const LogInSetup = async (setUser) => {
  try {
    await Facebook.initializeAsync({
      appId: 368405151328094,
    });
    const {
      type,
      token,
      expirationDate,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile']
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      setUser(true)
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
  // return token ? true : false
}

const styles = StyleSheet.create({

  title2: {
    justifyContent: 'center',
    height: 500,
    alignItems: 'center',
    borderWidth: 4,
    // borderStyle: 'dotted',
    width: 300,
    borderRadius: 20,
    backgroundColor: "lightgrey"


  }, image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});



{
  // Navigation 
  /* <Button
      title="Contact"
      onPress={()=>{
          props.navigation.navigate("Contact")
        //   ,{
            // name:"KHURRAM})
      }}
      />
      <Button
      title="Dashboard"
      onPress={()=>{
        props.navigation.navigate("Dashboard")
    }}
      /> */}