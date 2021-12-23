import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Caption, Searchbar, Button, Drawer } from 'react-native-paper';


export default function SelectCar(props) {

    const [region, setRegion] = useState({
        latitude: 24.920068,
        longitude: 67.087541,
        latitudeDelta: 0.0212,
        longitudeDelta: 0.0981,
    })
    const [destination, setDestination] = useState('')
    const [startingPoint, setStartingPoint] = useState('')

    const [pickUpLong, setPickUpLong] = useState('')
    const [pickUpLat, setPickUpLat] = useState('')

    const [dropOffLat, setDropOffLat] = useState('')
    const [dropOffLong, setDropOffLong] = useState('')

    const [carSelection, setCarSelection] = useState("")
    const [rate, setRate] = useState("")
    const [nameRender, setNameRender] = useState(false)
    const [distance, setDistance] = useState('')

    useEffect(() => {

        const tempDest = props.route.params.dropOff
        const tempPickUp = props.route.params.pickUp
        const tempPickUpLat = props.route.params.pickUpLat
        const tempPickUpLong = props.route.params.pickUpLong
        const tempDropOffLat = props.route.params.dropOffLat
        const tempDropOffLong = props.route.params.dropOffLong

        setDestination(tempDest);
        setStartingPoint(tempPickUp)
        setPickUpLat(tempPickUpLat)
        setPickUpLong(tempPickUpLong)
        setDropOffLat(tempDropOffLat)
        setDropOffLong(tempDropOffLong)


        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1);  // deg2rad below
            var dLon = deg2rad(lon2 - lon1);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
                ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            setDistance(d)
        }
        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }
        getDistanceFromLatLonInKm(pickUpLat, pickUpLong, dropOffLat, dropOffLong)
        tripRate(distance, carSelection)

    }, [carSelection])

    
    const tripRate = (distance, carSelection) => {
        
        const mini = Math.round((distance * 25) * 100) / 100
        const go = Math.round((distance * 45) * 100) / 100
        const business = Math.round((distance * 65) * 100) / 100
        
        
        
        
        if (carSelection == "MINI") {
            setRate(`(Price: Rs.${mini})`)
        }
        else if (carSelection == "GO-CAR") {
            setRate(`(Price: Rs.${go})`)
            
        }
        else if (carSelection == "BUSINESS"){
            setRate(`(Price: Rs.${business})`)
            }
        }
        
        console.log("RATE*************** ", rate);
        
        
        
        return <>
        <MapView
            style={styles.map}
            initialRegion={region}
        >
            <View style={{  backgroundColor: "#ffffff", width: 50, borderRadius: 50 }}>
                <Ionicons onPress={() => { props.navigation.goBack() }} name="arrow-back-outline" size={50} />
            </View>
            <Marker
                coordinate={region}
            />


        </MapView>
        <View style={styles.carSelect}>
            <View style={{ alignItems: 'center', margin: 12 }}>
                <Caption>Fares are slightly higher due to increased demand</Caption>
            </View>
            <Drawer.Item
                style={{ backgroundColor: 'lightgrey', padding: 10 }}
                icon="car"
                label="MINI"
                onPress={() => {
                    setCarSelection("MINI")
                    setNameRender(true)

                }}
            />
            <Drawer.Item
                style={{ backgroundColor: 'lightgrey', padding: 10 }}
                icon="bus"
                label="GO CAR"
                onPress={() => {
                    setCarSelection("GO-CAR")
                    setNameRender(true)
                }}

            />
            <Drawer.Item
                style={{ backgroundColor: 'lightgrey', padding: 10 }}
                icon="car"
                label="BUSINESS"
                onPress={() => {
                    setCarSelection("BUSINESS")
                    setNameRender(true)
                }}

            />
            <View style={styles.details}>
                <Text style={{ fontSize: 15,fontWeight:"600" }}>PickUp Location : <Caption style={{ fontSize: 15,fontWeight:"700" }}>{startingPoint}</Caption> </Text>
            </View>
            <View style={styles.details}>
                <Text style={{ fontSize: 15,fontWeight:"600" }}>DropOff Location : <Caption style={{ fontSize: 15,fontWeight:"700" }}>{destination}</Caption>  </Text>
            </View>
            <View style={{ alignItems: 'center' }}>

                <Button
                    icon="car"
                    mode="contained"
                    style={styles.btn}
                    onPress={() => { }}
                >
                    {nameRender && rate ? `${carSelection}  ${rate}` : "Select Car"}
                </Button>
            </View>

        </View>

    </>
}
const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        flex: 1
        // height:500,
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
    carSelect: {
        // alignItems:'center',
        borderTopWidth: 2,
        borderColor: "grey",
        height: 420,
        backgroundColor: "#ffffff"

    },
    details: {
        margin: 12,
    },
    btn: {
        justifyContent: 'center',
        marginTop: 10,
        width: 300,
        height: 50,
        backgroundColor: "black"
    }



});
