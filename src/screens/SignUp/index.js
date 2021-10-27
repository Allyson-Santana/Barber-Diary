import React, { useState, useContext } from 'react';
import { 
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,    
    View, 
    Text,
    Image,
    Alert
} from 'react-native';
import Logo from '../../../assets/logo.png';
import InputSign from '../../components/InputSign.js';
import { useNavigation } from '@react-navigation/native';
import api from '../../requests/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../contexts/UserContext';

export default () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const {dispatch: userDispatch } = useContext(UserContext);
    const [error, setError] = useState(null);

    const RegistraClick = async () => {
        if(password < 8) {
            setError("Senha com nmo minimo de 8 digitos!");
        }
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false){
            setError("Email inválido!");
        }
        if(name < 3) {
            setError("Nome deve conter no minimo 3 caracteres!");
        }

        if(error === null) {
            let responseJson =  await api.signUp(name, email, password);
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
            } else {
                Alert.alert("E-mail", "Endereço de email já existente");
                // navigation.reset({
                //     routes: [{name:'SignIn'}]
                // });
            }
        }else {
            return error;
        }
    }

    const GetLoginClick = () => {
        navigation.reset({
            routes: [{name:'SignIn'}]
        });
    }

    return(
        <SafeAreaView style={styles.Container}>
            
            <Image source={Logo} style={styles.logo} />
          
            <View style={styles.inputArea}>

                <InputSign 
                    iconName='user-alt' 
                    placeholder="Informe seu nome" 
                    value={name} 
                    onChangeText={text => setName(text)}
                />
            
                <InputSign 
                    iconName='mail-bulk' 
                    placeholder="Informe um e-mail" 
                    value={email} 
                    onChangeText={text => setEmail(text)}
                />   
                    
                <InputSign 
                    iconName='lock' 
                    placeholder="Informe uma senha" 
                    value={password} 
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />   

                <TouchableOpacity onPress={RegistraClick} style={styles.CustomButton}>
                    <Text style={styles.CustomButtonText}> Cadastra-me  </Text>
                </TouchableOpacity>

                {error !== null &&
                    <Text style={styles.textError}> { error } </Text>
                }

            </View>
            
            <TouchableOpacity onPress={GetLoginClick} style={styles.MessageButton}>
                <Text style={styles.MessageButtonText}> Já possui uma conta? </Text>
                <Text style={styles.MessageButtonTextBold}> Fazer login. </Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    Container:{
        backgroundColor: '#012440',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    inputArea:{
        width: '100%',
        padding: 25
    },
    CustomButton:{
        height: 50,
        backgroundColor: '#5853B8',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CustomButtonText:{
        fontSize: 20,
        color: "#fFFFff",
    },
    MessageButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 5
    },
    MessageButtonText:{
        fontSize: 18,
        color: '#FFFF'
    },
    MessageButtonTextBold:{
        fontSize: 20,
        color: '#FA6111',
        fontWeight: 'bold',

    },
    logo:{
        width:'80%',
        height: 180 , 
        resizeMode:'contain'
    },
    textError:{
        marginTop: 15,
        justifyContent: 'center',
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
    }
});


