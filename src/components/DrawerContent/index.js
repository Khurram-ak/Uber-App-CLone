import React from 'react'
import { View, Text, Image } from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'
import { Drawer, Title, Caption, Avatar, Divider } from 'react-native-paper'
// import { grey100 } from 'react-native-paper/lib/typescript/styles/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const DrawerContent = () => {
    return <>
        <View style={{ height: 240, backgroundColor: "black" }}>


            <View style={{ marginTop: 18, flexDirection: 'row', }}>
                <View style={{ margin: 12 }}>
                    <Avatar.Image
                        source={{ uri: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png" }}
                        size={70}
                    />
                </View>
                <View style={{ marginTop: 25, marginLeft: 10 }}>
                    <Text style={{ color: "#ffffff" }}>KHURRAM AMIR </Text>
                    <Caption style={{ color: "#ffffff" }}> Rating: 4.64.</Caption>
                </View>


            </View>
            <View>
                <View style={{ paddingLeft: 10 ,borderColor:"#dcdcdc",borderTopWidth:1,borderBottomWidth:1}}>
                    <Icon.Button
                        name="message"
                        backgroundColor="black"
                    >
                        <Text style={{ margin: 10, color: "#ffffff" }} >Messages</Text>
                    </Icon.Button>
                    <Divider />
                </View>
                <Caption style={{ color: "#ffffff",paddingLeft:15,paddingTop:10 }}>Do more with your account. </Caption>
                <Text style={{ color: "#ffffff",paddingLeft:15,marginTop:10 }}>Make Money Driving </Text>

            </View>

        </View>



        <View style={{ marginTop: 10 }}>
            <Drawer.Item
                label="Your Trips"
                onPress={() => { }}
            />
            <Drawer.Item
                label="Wallet"
                onPress={() => { }}
            />
            <Drawer.Item
                label="Help"
                onPress={() => { }}
            />
            <Drawer.Item
                label="Setting"
                onPress={() => { }}
            />


            <View style={{ flexDirection: 'row', margin: 13, width: 250 }}>
                <Text style={{ flex: 1 }}>Legal</Text>
                <Caption>v3.469.10001</Caption>
            </View>

        </View>
    </>
}

export default DrawerContent
