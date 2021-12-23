
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerContent from '../components/DrawerContent'
import LogIn from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import DropOff from '../screens/DropOff';
import SelectCar from '../screens/SelectCar';
import DriverDashboard from "../screens/DriverDashboard"
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()

const MainNavigation = () => {

  const [SignedIn, setSignedIn] = useState({ type: false, name: "" })

  return <>


    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {SignedIn.type ? <>
          {SignedIn.name == "driver" && <Stack.Screen name="Driver" component={DriverNavigator} />}
          {SignedIn.name == "user" && <Stack.Screen name="App" component={AppNavigator} />}</>
          :
          <Stack.Screen name="Auth" component={() => <AuthNavigator setSignedIn={setSignedIn} />} />
        }

      </Stack.Navigator>

    </NavigationContainer>

  </>

}

function AuthNavigator({ setSignedIn, setDriverSignIn }) {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Login"
      component={() => <LogIn setSignedIn={setSignedIn} setDriverSignIn={setDriverSignIn} />} />
  </Stack.Navigator>

}


function AppNavigator() {
  return <>
    { }
    <Drawer.Navigator drawerContent={() => <DrawerContent />} >
      <Drawer.Screen name="KAAR-APP" component={DashboardTabs} />
    </Drawer.Navigator>

  </>

}

function DashboardTabs() {

return <>

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="DropOff" component={DropOff} />
      <Stack.Screen name="SelectCar" component={SelectCar} />
    </Stack.Navigator>

  </>
}

function DriverNavigator() {
  return <>

    <Stack.Navigator drawerContent={() => <DrawerContent />}>
      <Stack.Screen name="Dashboard" component={DriverDashboard} />
    </Stack.Navigator>

  </>
}





export default MainNavigation;



/*
//            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="Home" component={Home}  />
                <Tab.Screen name="Dashboard" component={Dashboard} />
                <Tab.Screen name="Contact" component={Contact} />
            </Tab.Navigator>




        // STACK
        // <NavigationContainer>
        //     <Stack.Navigator initialRouteName="Home">
        //     <Stack.Screen name="Home" component={Home} />
        //     <Stack.Screen name="Dashboard" component={Dashboard} />
        //     <Stack.Screen name="Contact" component={Contact} />
        //     </Stack.Navigator>
        // </NavigationContainer>



styling
 screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                          let iconName;

                          if (route.name === 'Home') {
                            iconName = focused
                              ? 'home'
                              : 'home-outline';
                          } else if (route.name === 'Dashboard') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                          }else if  (route.name==="Contact"){
                              iconName = focused?'ios-list-box' : 'ios-list';
                          }

                          // You can return any component that you like here!
                          return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'blue',
                        tabBarInactiveTintColor: 'gray',
                      })}
*/