import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    RefreshControl,
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons }  from 'react-native-vector-icons';
import * as Location from 'expo-location';
import api from '../../requests/api';
import CardBarber from '../../components/CardBarber';

export default () => {
    const navigation = useNavigation();
    const [locationText, setLocationText] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const locationFinder = async () => {
        setLocation(null);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {            
            
            setLoading(true);
            setLocationText(null);
            setList([]);

            let coords = await Location.getCurrentPositionAsync({});
            setLocation( coords.coords );
            getBarbers();        
        }
    }
    const getBarbers = async () => {
        
        setLoading(true);
        setList([]);

        let lat = '';
        let lng = '';

        if(location){
            lat = location.latitude;
            lng = location.longitude;
        }

        let response = await api.getBarbers(lat, lng, locationText);
        if(response){
            //if(response.loc){ setLocationText(response.loc) }
            setList(response);
        } else {
            alert('Ops: Algo deu ERRADO! ')
        }

        setLoading(false);
    }

    useEffect(() => {
        return () => {
            getBarbers();
        }
    }, [])

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    const locationSearch = () => {
        setLocation({});
        getBarbers();
    }

    return (
     <>
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.viewScroll} 
            refreshControl={
                <RefreshControl style={styles.refresh} refreshing={refreshing} onRefresh={onRefresh} />
            }
            >
                <View style={styles.header}> 
                    <Text style={styles.textHeader}> Procure seu Barbeiro </Text>
                    <TouchableOpacity onPress={ () => navigation.navigate('Search') } style={styles.btnSearch}>
                        <FontAwesome5 name='search' size={24} color='#FFFFFF' />
                    </TouchableOpacity>
                </View>
                
                    <View style={styles.location}>
                        <TextInput 
                            style={styles.locationInput} 
                            placeholder="Onde você está ?" 
                            placeholderTextColor='#FFFFFF' 
                            value={locationText}
                            onChangeText={ text => setLocationText(text) }
                            onEndEditing={locationSearch}
                        />
                        <TouchableOpacity onPress={ locationFinder } >
                            <MaterialIcons name='my-location' size={24} color='#FA6111' />
                        </TouchableOpacity>
                    </View>

                    {loading &&
                        <ActivityIndicator style={{ marginTop: 50 }} size={'large'} color='#FFFFFF' />
                    }

                <View style={styles.main}>
                    {list.map( (item, key) => (
                        <CardBarber key={key} data={item} />
                    ) ) }
                </View>
                
            </ScrollView>
        </SafeAreaView>
     </>
    );
};


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#012455',
        flex: 1,
    },
    viewScroll:{
        flex: 1,
        padding: 28,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    textHeader:{
        fontSize: 24,
        fontWeight: 'bold',
        color:'#FA6111',
    },
    btnSearch:{
        width: 40,
        height: 20,
    },
    location:{
        backgroundColor: '#5853B8',
        height: 60,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 10,
        opacity: 0.9
    },
    locationInput:{
        width: '90%',
        height: 40,
        borderRadius: 30,
        color: '#FFFFFF',
        fontSize: 18
    },
    main:{
        marginTop: 45
    },
    refresh:{
        marginTop: 50
    }
});
