import React, {useState, useContext} from 'react';
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
    const {dispatch: userDispatch } = useContext(UserContext);

    const LoginClick = async () => {
        if(email != "" && password != "") {
            let responseJson =  await api.signIn(email, password);
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
                    routes: [{name:'MainTab'}]
                });
            } else {
                Alert.alert('Menssagem...','E-mail ou senha não conferem!' );
            }
        } else {
            Alert.alert('Menssagem...','Preencha os campos!' );
        }
    }
    const GetRegistraClick = () => {
        navigation.reset({
            routes: [{name:'SignUp'}]
        });
    }

    return(
        <SafeAreaView style={styles.Container}>
            
            <Image source={Logo} style={styles.logo} />
          
            <View style={styles.inputArea}>
            
                <InputSign 
                    iconName='mail-bulk' 
                    placeholder="Digite seu e-mail" 
                    value={email} 
                    onChangeText={text => setEmail(text)}
                />   
                    
                <InputSign 
                    iconName='lock' 
                    placeholder="Digite sua senha" 
                    value={password} 
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />   

                <TouchableOpacity onPress={LoginClick} style={styles.CustomButton}>
                    <Text style={styles.CustomButtonText}> Login  </Text>
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={GetRegistraClick} style={styles.MessageButton}>
                <Text style={styles.MessageButtonText}> Ainda não possui uma conta? </Text>
                <Text style={styles.MessageButtonTextBold}> Cadastra-me. </Text>
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
    }
});

