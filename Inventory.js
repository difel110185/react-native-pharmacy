import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, FlatList, TouchableWithoutFeedback} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import {db} from "./db";

const ref = db.ref("/items");
export default class Inventory extends Component {
    static navigationOptions = {title: "Inventory"};

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            refreshing: true,
        }
    }

    loadItems = () => {
        this.setState({refreshing: true});

        let itemsArray = [];

        ref.on("value", snapshot => {
            Object.keys(snapshot.val()).forEach(function eachKey(key) {
                itemsArray.push({
                    id: key,
                    values: snapshot.val()[key]
                })
            });

            this.setState({items: itemsArray, refreshing: false});
        });
    };

    renderItem = ({item}) => {
        return <TouchableWithoutFeedback useForeground={true} onPress={() => {
            this.props.navigation.push("DrugDetails", {item});
        }}>
            <Card image={{uri: item.values.images[0]}} containerStyle={styles.card}>
                <Divider style={styles.divider}/>
                <Text style={styles.name}>{item.values.product_name}</Text>
            </Card>
        </TouchableWithoutFeedback>
    }

    render() {
        return (
            <View style={styles.v_container}>
                <FlatList data={this.state.items}
                          style={styles.container}
                          onRefresh={this.loadItems}
                          refreshing={this.state.refreshing}
                          keyExtractor={item => item.id}
                          renderItem={this.renderItem}/>
                <View style={styles.buttonContainer}>
                    <Button title={"Add Item"} color="white" onPress={() => this.props.navigation.push("BarcodeReader")}/>
                </View>
            </View>
        );
    }

    componentDidMount() {
        this.loadItems();
    }
}

const styles = StyleSheet.create({
    v_container: {
        backgroundColor: '#F0F0F0',
        height: '100%'
    },
    container: {
        padding: 14
    },
    card: {
        borderColor: '#464646',
        margin: 0,
        marginBottom: 14
    },
    divider: {
        backgroundColor: "#464646"
    },
    name: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 6,
        paddingBottom: 6,
        backgroundColor: '#0686E4'
    }
});
