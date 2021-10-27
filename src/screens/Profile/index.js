import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Button
} from 'react-native';
import api from '../../requests/api';
import {useNavigation} from '@react-navigation/native';

export default  () => {
    const navigation = useNavigation();

    const logoutClick = async () =>{
       
        await api.logout();
        navigation.reset({
            routes:[{name:'SignIn'}]
        });
    }

    return (
     <>
        <SafeAreaView style={StyleSheet.container}>
            <Text style={{fontSize:30, marginTop: 50}}> Profile </Text>
            <Button title='SAIR' onPress={logoutClick} />
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
