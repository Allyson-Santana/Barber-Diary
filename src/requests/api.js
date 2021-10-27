import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API = 'http://192.168.0.102/github/Desenvolvimento-Mobile/AgendaBarbeiro/src/requests';

export default  {
    checkToken: async (token) => {
       const require = await fetch(BASE_API+'/checkToken.php', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token
        })
       });
       const responseJson = await require.json();
       return responseJson;
    },
    
    signIn: async (email, password) => {
        const require = await fetch(BASE_API+'/loginUser.php', {  
        method:'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password               
        }) 
        });
        const responseJson = await require.json();
        return responseJson;
    },

    signUp: async (name, email, password) => {
        const require = await fetch(BASE_API+'/createUser.php', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
       });
       const responseJson = await require.json();
       return responseJson;
    },

    getBarbers: async (lat, lng, locationText) => {
        const require = await fetch(BASE_API+'/listBarbers.php', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude: lat,
                longitude: lng,
                locationText: locationText
            })
           });
           const responseJson = await require.json();
           return responseJson;
    },
    getBarber: async (id) => {
        const userId = await AsyncStorage.getItem('id');
        const require = await fetch(BASE_API+'/listBarber.php', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                userId: userId
            })
           });
           const responseJson = await require.json();
           //console.log(responseJson);
           return responseJson;
    },
    setFavorited: async (id) => {
        const userId = await AsyncStorage.getItem('id');
        fetch(BASE_API+'/favorited.php', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                userId: userId,
            })
           });
    },
    setAppointments: async (key) => {
        const userId = await AsyncStorage.getItem('id');
        const require = await fetch(BASE_API+'/listBarber.php', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: key,
                userId: userId
            })
           });
           const responseJson = await require.json();
           //console.log(responseJson);
           return responseJson;
    },
    
    logout: async () => {
       await AsyncStorage.removeItem('token');
       await AsyncStorage.removeItem('id');
       return;
    },
}