import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, FlatList, TouchableNativeFeedback} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import {db} from "./db";

const ref = db.ref("/items");
export default class Inventory extends Component {
    static navigationOptions = {title: "Inventory"};

    constructor(props) {
        super(props);
        this.state = {
            itemsInDB: false,
            items: [],
            refreshing: true,
        }
    }

    loadItems = () => {
        this.setState({refreshing: true});
        ref.on("value", snapshot => {
            try {
                console.log(Object.values(snapshot.val()));
                this.setState({items: Object.values(snapshot.val()), itemsInDB: true, refreshing: false})
            } catch (e) {
                console.log(e);
                this.setState({itemsInDB: false, refreshing: false})
            }
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title={"Add Item"} onPress={() => this.props.navigation.push("AddProductToInventory")}/>
                {!this.state.itemsInDB ? (
                    <Text>Nothing to Show, Add Items to the inventory to keep track of them</Text>
                ) : (
                    <FlatList data={this.state.items}
                              onRefresh={this.loadItems}
                              refreshing={this.state.refreshing}
                              keyExtractor={item => item.name}
                              renderItem={({item}) => {
                                  return <TouchableNativeFeedback useForeground={true} onPress={() => {
                                      this.props.navigation.push("InventoryItem", {
                                          item: item
                                      });
                                  }}>
                                      <Card featuredTitle={item.name} featuredTitleStyle={{
                                          marginHorizontal: 5,
                                          textShadowColor: '#000000',
                                          textShadowOffset: {width: 3, height: 3},
                                          textShadowRadius: 3
                                      }} image={{uri: item.image}}>
                                          <Text style={{marginBottom: 10}}>{item.brand}</Text>
                                          <Divider style={{backgroundColor: "#363636"}}/>
                                          <Text style={{
                                              margin: 5,
                                              fontStyle: 'italic',
                                              color: '#b2bec3',
                                              fontSize: 10
                                          }}>Category: {item.category}, Quantity: {item.quantity}</Text>
                                      </Card>
                                  </TouchableNativeFeedback>
                              }}/>
                )}
            </View>
        );
    }

    componentDidMount() {
        this.loadItems();
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
