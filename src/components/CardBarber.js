import React from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import Stars from './Star';
import {useNavigation} from '@react-navigation/native';
import imgDefault from '../../assets/person.png';
 
export default ({ data }) => {
    
    const navigation = useNavigation();
    
    const viewBarberClick = () => {
        
        navigation.navigate('Barber',{
            id: data.cd_barber,
            name: data.nm_barber,
            avatar: data.ds_avatar
        });
    }

    return (
        <TouchableOpacity onPress={viewBarberClick} style={styles.btnView}>

            <Image style={styles.img} source={{ uri: data.ds_avatar }} /> 

            <View style={styles.viewContainer}>
            
                <Text style={styles.name}> {data.nm_barber}</Text> 
            
                <Stars stars={data.stars} countstars={data.countstars} showCountStart={true} />
                
                <TouchableOpacity style={styles.btnProfile}>
                    <Text style={styles.textBtnProfile}> Ver Perfil </Text>
                </TouchableOpacity>

            </View>
           
        </TouchableOpacity>
    );
}

 // #01240 #5853B8 #FA6111
const styles = StyleSheet.create({
    btnView:{
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
    },
    viewContainer:{
        marginLeft: 20,
        justifyContent: 'space-between'
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10
    },
    btnProfile:{
        width: 80,
        height: 25,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img:{
        width: 88,
        height: 88,
        borderRadius: 50,
        justifyContent:'center',
        alignItems: 'center',
        padding: 20,
        resizeMode: 'cover'
        },

    textBtnProfile:{
        fontSize: 18,
        color:'#DA6111',
        fontWeight: 'bold'        
    }
});