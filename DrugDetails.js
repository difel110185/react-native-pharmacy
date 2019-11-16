import React, { Component } from 'react';
import {ActivityIndicator, StyleSheet, Text, View, ScrollView} from 'react-native';
import axios from "axios";
import FullWidthImage from 'react-native-fullwidth-image';
import {API_KEY} from 'react-native-dotenv';

export default class DrugDetails extends Component {
    static navigationOptions = {title: "Drug Details"};

    state = {
        drug: undefined,
        loading: true
    };

    componentDidMount = () => {
        const barcode = this.props.navigation.getParam('barcode');
        axios.get(`https://api.barcodelookup.com/v2/products?barcode=${barcode}&formatted=y&key=${API_KEY}`).then(res => {
            this.setState({ drug: res.data.products[0], loading: false });
        })
    };

    render = () => {
        const drug = this.state.drug;
        return (
            <ScrollView style={styles.v_container}>
                {this.state.loading && <ActivityIndicator size="large" color="#0686E4" />}
                {!this.state.loading &&
                    <View style={styles.container}>
                        <Text style={styles.name}>{drug.product_name}</Text>
                        <Text style={styles.brand}>{drug.brand}</Text>
                        <Text style={styles.category}>{drug.category}</Text>

                        {drug.images && drug.images.length > 0 && <FullWidthImage source={{uri: drug.images[0]}} />}

                        <Text style={styles.description}>{drug.description}</Text>
                    </View>
                }
            </ScrollView>
        )
    }
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
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20
    },
    category: {
        marginBottom: 10
    },
    brand: {
        fontSize: 12,
        marginTop: 10
    },
    description: {
        marginTop: 10,
        textAlign: 'justify'
    }
});
