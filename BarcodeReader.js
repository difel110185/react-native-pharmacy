import * as React from 'react';
import {Text, View, StyleSheet, Button, ActivityIndicator, Alert} from 'react-native';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';
import {NavigationActions, StackActions} from "react-navigation";
import axios from "axios";
import {API_KEY} from "react-native-dotenv";
import {db} from "./db";

export default class BarcodeReader extends React.Component {
    static navigationOptions = {title: "Barcode reader"};
    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            screen: "Home",
            name: "",
            brand: "",
            category: "",
            desc: "",
            image: ""
        };
    }

    async componentDidMount() {
        this.setState({screen:this.props.navigation.getParam("screen")});
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (!hasCameraPermission)
            return <ActivityIndicator size="large" color="#0686E4" />;

        return (
            <View style={styles.v_container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        );
    }

    handleBarCodeScanned = ({ data }) => {
        this.setState({scanned: true});

        const nav = this.props.navigation;

        axios.get(`https://api.barcodelookup.com/v2/products?barcode=${data}&formatted=y&key=${API_KEY}`).then(res => {

            db.ref("/items").orderByChild("barcode_number").equalTo(data).once('value', function(snapshot) {
                if (!snapshot.exists())
                    db.ref("/items").push(res.data.products[0]);
                else
                    Alert.alert("Error", "This item is already in the inventory.");
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Inventory' })],
            });

            nav.dispatch(resetAction);
        });
    };
}

const styles = StyleSheet.create({
    v_container: {
        padding: 8,
        backgroundColor: '#F0F0F0',
        height: '100%'
    },
    container: {
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 16,
        marginLeft: 14,
        marginRight: 14,
        marginTop: 0,
        marginBottom: 6
    }
});

