import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Caption, Searchbar, Button } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function DropOff(props) {
 
    const [pickUp, setPickUp] = useState('')
    const [pickUpLong, setPickUpLong] = useState('')
    const [pickUpLat, setPickUpLat] = useState('')
    const [dropOffLat, setDropOffLat] = useState('')
    const [dropOffLong, setDropOffLong] = useState('')

    useEffect(() => {
        const temp = props.route.params.pickUp
        const tempLat = props.route.params.pickUpLat
        const tempLong = props.route.params.pickUpLong

        setPickUp(temp)
        setPickUpLat(tempLat)
        setPickUpLong(tempLong)


    }, [])


    const [region, setRegion] = useState({
        latitude: 24.920068,
        longitude: 67.087541,
        latitudeDelta: 0.0012,
        longitudeDelta: 0.21,
    })
    const [dropOff, setDropOff] = useState('')

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { coords: { latitude, longitude } } = location
            setRegion({ ...region, latitude, longitude })
            console.log("location", region);

            fetch(`https://api.foursquare.com/v2/venues/search?client_id=HDYXOOP5F532O4VGBZT1MGEGSWMXZP104CDMF0DCB20INYRM&client_secret=DMUTTLKMZN1XUB1AX4SLZVLW0HVCTA5JMP3CUISOMGV1ZCNB&ll=${latitude},${longitude}&v=20180323`)
                .then(res => res.json())
                .then(res => setDropOff(res.response.venues[0].name))




        })();
    }, []);

    const dragEnd = async (e) => {
        const coords = e.nativeEvent.coordinate
        const { latitude, longitude } = coords
        setRegion({ ...region, latitude, longitude })

        setDropOffLat(latitude)
        setDropOffLong(longitude)

        await fetch(`https://api.foursquare.com/v2/venues/search?client_id=HDYXOOP5F532O4VGBZT1MGEGSWMXZP104CDMF0DCB20INYRM&client_secret=DMUTTLKMZN1XUB1AX4SLZVLW0HVCTA5JMP3CUISOMGV1ZCNB&ll=${latitude},${longitude}&v=20180323`)
            .then(res => res.json())
            .then((res) => setDropOff(res.response.venues[0].name))

    }
        


    return <>
        <Searchbar
            placeholder="Search Location"
        
        />

        <MapView
            style={styles.map}
            initialRegion={region}
        >
            <View style={{  backgroundColor: "#ffffff", width: 50, borderRadius: 50 }}>
                <Ionicons onPress={() => { props.navigation.goBack() }} name="arrow-back-outline" size={50} />

            </View>


            <Marker
                coordinate={region}>
                <View style={styles.box}>
                    <Caption>{dropOff || "KARACHI"}</Caption>
                </View>
            </Marker>
            {dropOff ?
                <Marker
                    coordinate={region}
                    draggable
                    onDragEnd={dragEnd}
                /> : console.log("NODROPOFF")}

        </MapView>
        <View style={styles.destBox}>

            <Text style={{
                
                fontSize: 24,
                borderBottomWidth: 2,
                borderBottomColor: "black",
                fontWeight:"600"
            }}>Set Up Destination</Text>

            <Button
                icon="camera"
                mode="contained"
                style={styles.btn}
                onPress={() => {
                    props.navigation.navigate("SelectCar", { dropOff, pickUp, pickUpLat, pickUpLong, dropOffLat, dropOffLong })

                }}
            >
                Confirm Your Destination
            </Button>
        </View>

    </>
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        flex: 1
    },
    button: {
        backgroundColor: "black",
        borderWidth: 2
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
    destBox: {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 190,
        backgroundColor: "#ffffff",
        borderTopWidth:2,
        borderTopColor:"grey"

    },
    btn: {
        justifyContent: 'center',

        width: 300,
        height: 50,
        backgroundColor: "black"
    }

});
