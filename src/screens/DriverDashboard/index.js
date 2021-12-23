import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, Alert, Dimensions } from 'react-native';
import * as Facebook from 'expo-facebook';
import mainbg from '../../Image/mainbg.jpg'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { Caption, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';


export default function DriverDashboard() {

    const [driver, setDriver] = useState(false)
    const [region, setRegion] = useState({
        latitude: 24.920068,
        longitude: 67.087541,
        latitudeDelta: 0.0212,
        longitudeDelta: 0.0981,
    })

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            await Location.watchPositionAsync(
                timeInterval = 0.01,
                (location) => {
                    const { coords: { latitude, longitude } } = location
                    setRegion({ ...region, latitude, longitude })
                    console.log("222location", region);

                })
           
            fetch(`https://api.foursquare.com/v2/venues/search?client_id=HDYXOOP5F532O4VGBZT1MGEGSWMXZP104CDMF0DCB20INYRM&client_secret=DMUTTLKMZN1XUB1AX4SLZVLW0HVCTA5JMP3CUISOMGV1ZCNB&ll=${latitude},${longitude}&v=20180323`)
                .then(res => res.json())
                .then(res => console.log(res.response.venues[0].name))

        })();

    }, []);

    console.log("location", region);




    return <>
        {!driver ? <>
            <ImageBackground source={mainbg} resizeMode="cover" style={styles.image}>

                <View style={styles.title2}>

                    <Text style={{ fontSize: 25, marginBottom: 60, fontWeight: "700" }}>KAAR-APP. </Text>
                    <Text style={{ fontWeight: "500", fontSize: 20, marginBottom: 20 }}>Login As Driver</Text>
                    <Button icon="facebook" mode="contained" color="black" onPress={() => { LogInSetup(setDriver) }}  >
                        Click Here To Login
                    </Button>
                </View>
            </ImageBackground>
        </> :
            <View style={{ flex: 1 }}>
                <Button
                    style={styles.drop}
                    icon="equal"
                    mode="contained"
                    color="black"
                    onPress={() =>
                        props.navigation.navigate('DropOff')}>
                    DRIVER DASHBOARD
                </Button>

                <View style={styles.container}>

                    <MapView style={styles.map} initialRegion={region} >
                        <Marker
                            coordinate={region}>
                            <View style={styles.box}>
                                <Caption>{"KARACHI"}</Caption>
                            </View>
                        </Marker>
                        <Marker
                            draggable
                            coordinate={region}>
                        </Marker>
                    </MapView>
                </View>
                <Button style={styles.drop} mode="contained" color="black">
                    <Icon name="ios-person" size={30} color="#ffffff" />
                    {`  Pick Your Location Here!`}
                </Button>

            </View>

        }
    </>
}
const LogInSetup = async (setDriver) => {
    try {
        await Facebook.initializeAsync({
            appId: 368405151328094,
        });
        const {
            type,
            token,
            expirationDate,
            } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile']
        });
        if (type === 'success') {            
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            setDriver(true)
        } else {
            
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
    },
    map: {
        width: Dimensions.get('window').width,
        height: 575,
    },
    box: {
        borderRadius: 7,
        padding: 8,
        width: "auto",
        height: "auto",
        backgroundColor: "beige",
        borderColor: "black",
        borderWidth: 1

    },
    drop: {
        height: 50,
        justifyContent: "center"
    }
});



