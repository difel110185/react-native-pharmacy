import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import BarcodeReader from "./BarcodeReader";
import Home from "./Home";
import DrugDetails from "./DrugDetails";
import AddProduct from "./AddProduct";
import Inventory from "./Inventory";
import InventoryItem from "./InventoryItem";

const RootStack = createStackNavigator(
    {
        Home: {screen: Home},
        BarcodeReader: {screen: BarcodeReader},
        DrugDetails: {screen: DrugDetails},
        AddProductToInventory: {screen: AddProduct},
        Inventory: {screen: Inventory},
        InventoryItem: {screen: InventoryItem}
    },
    {
        initialRouteName: 'Home',
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

const AppContainer = createAppContainer(RootStack);

export default function App() {
    return <AppContainer/>;
}
