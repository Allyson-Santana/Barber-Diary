import React from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';

export default ({iconName, placeholder, value, onChangeText,secureTextEntry}) => {

    return(
        <>
        <View style={styles.inputSign} >
            <FontAwesome5 style={styles.icon} name={iconName} size={24} color="#FFF9" />
            <TextInput 
                style={styles.input} 
                placeholder={placeholder} 
                placeholderTextColor='#FFF7'
                value={value} 
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
        </>
    );

}

const styles = StyleSheet.create({
    inputSign:{
        width: '100%',
        height: 55,
        backgroundColor:'#03709E',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 18,
    },
    icon:{
        width: '10%',
        paddingLeft: 10,
    },
    input:{
        width: '88%',
        color: '#FFFFFF',
        fontSize: 18,
        paddingRight: 10,
        paddingLeft: 10,
    }
});