import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default class Home extends Component {
    static navigationOptions = {title: "Home"};

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Scan Barcode"
                    onPress={() => this.props.navigation.navigate('BarcodeReader')}
                />
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
