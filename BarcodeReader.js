import * as React from 'react';
import {Text, View, StyleSheet, Button, ActivityIndicator} from 'react-native';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeReader extends React.Component {
    static navigationOptions = {title: "Barcode reader"};

    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    async componentDidMount() {
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
        this.setState({ scanned: true });
        this.props.navigation.navigate('DrugDetails', {
            barcode: data
        })
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

