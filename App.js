import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import BarcodeReader from "./BarcodeReader";
import DrugDetails from "./DrugDetails";
import Inventory from "./Inventory";

const RootStack = createStackNavigator(
    {
        BarcodeReader: {screen: BarcodeReader},
        DrugDetails: {screen: DrugDetails},
        Inventory: {screen: Inventory}
    },
    {
        initialRouteName: 'Inventory',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#0686E4'
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    },
);

console.disableYellowBox = true;

const AppContainer = createAppContainer(RootStack);

export default function App() {
    return <AppContainer/>;
}
