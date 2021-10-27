import React, { useEffect, useContext } from 'react';
import  {  
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    Image
} from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import Logo from '../../../assets/logo.png';
import api from '../../requests/api';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect( () => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token) {
                let responseJson = await api.checkToken(token);
                if(responseJson.ds_token){
                    await AsyncStorage.setItem('token', responseJson.ds_token);
                    await AsyncStorage.setItem('id', responseJson.cd_user);
                    userDispatch({
                        type: 'setAvatar',
                        payload:{
                            avatar: responseJson.ds_avatar
                        }
                    });
                    navigation.reset({
                        routes:[{name:'MainTab'}]
                    });
                } else{
                    navigation.navigate('SignIn');
                } 
            } else {
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    }, []);

     return (
        <SafeAreaView style={styles.container}>
            <Image source={Logo} width={20} height={20} />
            <ActivityIndicator style={styles.loading} size="large" color="#FFFFFF" />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#012440',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading:{
        marginTop: 50,
    }
});




