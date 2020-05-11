import React from 'react'
import { AsyncStorage } from 'react-native'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import SkipScreen from './SkipScreen';

const SignoutScreen = () => {}

export const TabScreen = createBottomTabNavigator({
    Home: {
        screen: HomeScreen, 
        navigationOptions: {
            tabBarLabel: 'Профиль', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-home" color={tintColor} size={25} />
            )
        }
    }, 
    Camera: {
        screen: CameraScreen, 
        navigationOptions: {
            tabBarLabel: 'Камера', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-camera" color={tintColor} size={25} />
            )
        }
    }, 
    Skip: {
        screen: SkipScreen, 
        navigationOptions: {
            tabBarLabel: 'Пропуски', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-eye" color={tintColor} size={25} />
            )
        }
    }, 
    Signout: {
        screen: SignoutScreen, 
        navigationOptions: {
            tabBarLabel: 'Выход', 
            tabBarIcon: ({ tintColor }) => (
                <SimpleLineIcons name="logout" color={tintColor} size={20} />
            ), 
            tabBarOnPress: async ({navigation}) => {
                await AsyncStorage.clear();
                navigation.navigate('Auth');
            }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'red', 
        inactiveTintColor: 'grey', 
        showIcon: true
    }
});