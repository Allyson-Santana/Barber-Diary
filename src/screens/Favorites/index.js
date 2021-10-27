import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text
} from 'react-native';

export default () => {
    return (
     <>
        <SafeAreaView style={StyleSheet.container}>
            <Text style={{fontSize:30}}> FAvorites </Text>
        </SafeAreaView>
     </>
    );
};

const styles = StyleSheet.create({
    Container:{
        backgroundColor: '#012440',
        flex: 1,
    },
});
