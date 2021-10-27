import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';

export default ({state, navigation, color}) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }
    
    return(
        <View style={styles.TabNavBarCustom} >
            <TouchableOpacity onPress={()=>goTo('Home')} style={styles.OptionsNavBar}>
                <FontAwesome5 style={styles.icons} name='home' size={24} color= {state.index===0 ? '#FA6111' : '#FFFFFF'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>goTo('Search')} style={styles.OptionsNavBar}>
                <FontAwesome5 style={styles.icons} name='search' size={24} color= {state.index===1 ? '#FA6111' : '#FFFFFF'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>goTo('Appointments')} style={styles.OptionsNavBar}>
                <FontAwesome5 style={styles.icons} name='calendar-check' size={24} color= {state.index===2 ? '#FA6111' : '#FFFFFF'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>goTo('Favorites')} style={styles.OptionsNavBar}>
                <FontAwesome5 style={styles.icons} name='heart' size={24} color= {state.index===3 ? '#FA6111' : '#FFFFFF'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>goTo('Profile')} style={styles.OptionsNavBar}>
                <FontAwesome5 style={styles.icons} name='users-cog' size={24} color= {state.index===4 ? '#FA6111' : '#FFFFFF'}/>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    TabNavBarCustom:{
        backgroundColor: '#5853B8',
        height: 70,
        flexDirection: 'row'
    },
    OptionsNavBar:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icons:{
        //
    }
});