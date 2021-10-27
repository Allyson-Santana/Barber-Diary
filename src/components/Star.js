import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';

export default ({ stars, showCountStart, countstars }) => {

    let star = [ 0, 0, 0, 0, 0];
    let floor = Math.floor(stars);
    let left = stars - floor;

    for(var i=0; i<floor; i++){
        star[i] = 2;
    }
    if(left > 0) {
        star[i] = 1
    }

    return(
        <View style={{ flexDirection: 'row' }}>
            {star.map( (i,k) => (
                <View key={k} >
                   {i === 0 && <FontAwesome style={{ margin: 1 }} name='star-o' size={18} color='#ffcb0c' />  }
                   {i === 1 && <FontAwesome style={{ margin: 1 }} name='star-half-empty' size={18} color='#ffcb0c' />  }
                   {i === 2 && <FontAwesome style={{ margin: 1 }} name='star' size={18} color='#ffcb0c' /> } 
                </View>
            ) ) }
            {showCountStart && <Text> { countstars }  </Text> }
        </View>
    );

}