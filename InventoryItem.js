import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, ScrollView, Image, TextInput} from 'react-native';
import {Divider} from "react-native-elements";
import {db} from "./db";

let ref = db.ref("/items");
export default class InventoryItem extends Component {
    static navigationOptions = {title: "Item"};

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let item = this.props.navigation.getParam("item");
        this.setState({item:item})
    }

    render() {
        let {item} = this.state || {item:{name:"loading",category:"loading",brand:"loading",desc:"loading",image:"loading",quantity:"loading"}};
        return (
            <ScrollView style={{
                width: "95%",
                alignSelf: "center"
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    textAlign: "left",
                    margin: 3,
                }}>Source: {item.name}</Text>
                <Text style={{
                    fontSize: 16,
                    textAlign: "left",
                    margin: 3,
                }}>{item.category}</Text>
                <Text style={{
                    fontSize: 11,
                    fontStyle: "italic",
                    textAlign: "left",
                    margin: 3,
                    color: "#424242",
                }}>Brand: {item.brand || "Anonymous"}, Description: {item.desc}</Text>
                <Divider style={{backgroundColor: "#363636"}}/>
                <Image source={{uri: item.image}}
                       style={{width: "100%", alignSelf: "center", height: 225, resizeMode: 'contain', margin: 5}}/>
                <TextInput keyboardType={"numeric"} placeholder={"Quantity"} defaultValue={""+item.quantity} style={{
                    fontSize: 13,
                    textAlign: "left",
                    margin: 5,
                }} onSubmitEditing={event => {
                    let {name, category, desc} = this.props.navigation.getParam("item");
                    ref.on('value', snapshot => {
                        snapshot.forEach((child) => {
                            let childVal = child.val();
                            if (childVal.name === name && childVal.desc === desc && childVal.category === category) {
                                ref.child(child.key).update({
                                    'quantity': event.nativeEvent.text
                                });
                            }
                        })
                    });}} />
            </ScrollView>
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
