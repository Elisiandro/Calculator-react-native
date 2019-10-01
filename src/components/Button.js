import React from 'react';
import { StyleSheet, Text, Dimensions, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888'
    },
    operacaoButton: {
        color: '#fff',
        backgroundColor: '#fa8231',

    },
    butttonDouble: {
        width: Dimensions.get('window').width / 4 * 2,
    },
    butttonTriple: {
        width: Dimensions.get('window').width / 4 * 3,
    }

});

export default props => {
    const stylesButton = [styles.button]
     if (props.double) stylesButton.push(styles.butttonDouble)
     if (props.triple) stylesButton.push(styles.butttonTriple)
     if (props.operation) stylesButton.push(styles.operacaoButton)

    return (
        // <TouchableHighlight onPress={props.onClick}>
        <TouchableHighlight onPress={() => props.onClick(props.label)}>
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}
