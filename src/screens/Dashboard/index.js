import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { Drawer, Title, Caption, Avatar, Button } from 'react-native-paper'
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { storeLocation } from '../../confiq/firebase';

export default function Dashboard(props) {

    const [region, setRegion] = useState({
        latitude: 24.920068,
        longitude: 67.087541,
        latitudeDelta: 0.0212,
        longitudeDelta: 0.0981,
    })
    const [pickUp, setPickUp] = useState('')
    const [pickUpLat, setPickUpLat] = useState('')
    const [pickUpLong, setPickUpLong] = useState('')
    
    const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { coords: { latitude, longitude } } = location
            await setRegion({ ...region, latitude, longitude })
            console.log("location", region);
            setPickUpLat(latitude)
            setPickUpLong(longitude)
            // try {
            //    await storeLocation(undefined,location)       
            //    console.log("chal gya"); 
            // } catch (error) {
            //     console.log("Nahi CHala",error);
            // }
            fetch(`https://api.foursquare.com/v2/venues/search?client_id=HDYXOOP5F532O4VGBZT1MGEGSWMXZP104CDMF0DCB20INYRM&client_secret=DMUTTLKMZN1XUB1AX4SLZVLW0HVCTA5JMP3CUISOMGV1ZCNB&ll=${latitude},${longitude}&v=20180323`)
                .then(res => res.json())
                .then(res => setPickUp(res.response.venues[0].name))

        })();
    }, []);

    const dragEnd = async (e) => {
        const coords = e.nativeEvent.coordinate
        const { latitude, longitude } = coords
        await setRegion({ ...region, latitude, longitude })
        setPickUpLat(latitude)
        setPickUpLong(longitude)
        fetch(`https://api.foursquare.com/v2/venues/search?client_id=HDYXOOP5F532O4VGBZT1MGEGSWMXZP104CDMF0DCB20INYRM&client_secret=DMUTTLKMZN1XUB1AX4SLZVLW0HVCTA5JMP3CUISOMGV1ZCNB&ll=${latitude},${longitude}&v=20180323`)
            .then(res => res.json())
            .then(res => setPickUp(res.response.venues[0].name))

    }
    console.log("CORDS3", region);

    return <>

        <Button
            style={styles.drop}
            icon="equal"
            mode="contained"
            color="black"
            onPress={() =>
                props.navigation.navigate('DropOff',{pickUp,pickUpLat,pickUpLong})}>
            Select Drop OFF
        </Button>

        <View style={styles.container}>

            <MapView style={styles.map} initialRegion={region} >
                <Marker
                    coordinate={region}>
                    <View style={styles.box}>
                        <Caption>{pickUp || "KARACHI"}</Caption>
                    </View>
                </Marker>
                <Marker
                    onDragEnd={dragEnd}
                    draggable
                    coordinate={region}>
                </Marker>
            </MapView>
        </View>
        <Button style={styles.drop} mode="contained" color="black">
            <Icon name="ios-person" size={30} color="#ffffff" />
            {`  Pick Your Location Here!`}
        </Button>
    </>

}



const styles = StyleSheet.create({
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


/*

const styles = StyleSheet.create({
    Location.watchPositionAsync({
                    timeInterval:200,
                    distanceInterval:0.2
                }, (data)=>{
                const { coords: { latitude, longitude } } = data
                    console.log("Location watch===",data);
                })

                foursquare api acc banao
                api generate kro docs se parh k or phr yaha daldo



    <Button
        title="Home"
                onPress={() => {
                    props.navigation.popToTop("Home")
                }}
                />
            <Button
            title="GoBACK"
                onPress={() => {
                    props.navigation.goBack()}
                */
