import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Button, Alert} from 'react-native';
import {db} from "./db";
import axios from "axios";
import {API_KEY} from "react-native-dotenv";

const ref = db.ref("/items");

export default class AddProduct extends Component {
    static navigationOptions = {title: "Add Product"};
    constructor(props){
        super(props);
        this.state = {
            name: "",
            brand: "",
            category: "",
            desc: "",
            image: "",
            quantity: 1,
        }
    }
    add = () => {
        let {name, brand, category, desc, image, quantity} = this.state;
        if (name && brand && category && desc && image && quantity)
            ref.push(this.state);
        else
            Alert.alert("Error", "Please Fill out all fields before submitting")
    };

    componentDidMount() {
        let barcode = this.props.navigation.getParam("barcode", "none");
        if (barcode !== "none") {
            axios.get(`https://api.barcodelookup.com/v2/products?barcode=${barcode}&formatted=y&key=${API_KEY}`).then(res => {
                let drug = res.data.products[0];
                console.log(drug);
                this.setState({
                    name: drug.product_name,
                    brand: drug.brand,
                    category: drug.category,
                    desc: drug.description,
                    image: drug.images[0],
                });
            });
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Button title="Scan Barcode"
                    onPress={() => this.props.navigation.push('BarcodeReader',{screen:"AddProductToInventory"})}/>
                <Button title={"Add Product"} onPress={this.add} />
                <TextInput placeholder={"Name"} defaultValue={this.state.name || ""} onChange={
                    event => {this.setState({name:event.nativeEvent.text})}
                } />
                <TextInput placeholder={"Brand"} defaultValue={this.state.brand || ""} onChange={
                    event => {this.setState({brand:event.nativeEvent.text})}
                } />
                <TextInput placeholder={"Quantity"} defaultValue={""+this.state.quantity || ""} keyboardType={"numeric"} onChange={
                    event => {this.setState({quantity:event.nativeEvent.text})}
                } />
                <TextInput placeholder={"Category"} defaultValue={this.state.category || ""} onChange={
                    event => {this.setState({category:event.nativeEvent.text})}
                } />
                <TextInput placeholder={"Description"} defaultValue={this.state.desc || ""} onChange={
                    event => {this.setState({desc:event.nativeEvent.text})}
                } />
                <TextInput placeholder={"Image URL"} defaultValue={this.state.image || ""} onChange={
                    event => {this.setState({image:event.nativeEvent.text})}
                } />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
