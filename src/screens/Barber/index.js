import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

import api from '../../requests/api';
import Stars from '../../components/Star';
import { FontAwesome } from 'react-native-vector-icons';
import { AntDesign } from 'react-native-vector-icons';
import BarberModal from '../../components/BarberModal';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);
 
    const [barberInfo, setBarberinfo] = useState({
        barber: [{
          cd_barber: route.params.id,
          nm_barber: route.params.name,
          ds_avatar: route.params.avatar           
        }],
        photo: [{}],
        service: [{}],
        testimonial: [{}],
        calendarAvailable: [{}]
    });
    const [favorited, setFavorited] = useState(false);

    const backClick = () => {
        navigation.goBack();
    }

    const favoritedClick = () => {
        api.setFavorited( route.params.id );
        setFavorited( !favorited );
    }
    
    const serviceClick = (key) => {
        setSelectedService(key);
        setShowModal(true);
    }

    useEffect( () => {
        const getBarberInfo = async () => {
            setLoading(true); 
            let response  = await api.getBarber(route.params.id);
            if(response){ 
                setBarberinfo(response); 
                if(response.barber.map(item => item.favorited) == 1){      
                    setFavorited(true);
                }else{
                    setFavorited(false);
                }
            } else {
                alert('Algo deu errado!');
            }

            setLoading(false);  

            
        }
        getBarberInfo();  
    }, [])


    return (
    <>
        <View style={styles.container}> 
            <ScrollView>
                {barberInfo.photo && barberInfo.photo.length > 0 ?
                    <Swiper
                        style={{height:260}}
                        dot={ <View style={styles.swiperDot} /> }
                        activeDot={ <View style={styles.SwiperDotActive} /> }
                        paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                        autoplay={true}
                        loop={true}
                        >
                            {barberInfo.photo.map((item, key)=>(
                                    <View style={styles.fieldImage} key={key}>
                                        <Image style={styles.image} source={{uri: item.ds_photo}} resizeMode='cover' />
                                    </View>
                            ) ) }
                            
                    </Swiper>
                    :
                    <View style={styles.fakeSwiper}> 
                    
                    </View>
                }

                <View style={styles.pageMain}>
                    
                    <View style={styles.barberField}>

                        {barberInfo.barber.map( (item, key) => (
                            <View key={key} style={styles.barberArea} > 
                                <Image style={styles.imgProfile} source={{ uri: item.ds_avatar }} /> 
                                <View style={styles.barberInfo}>
                                    <Text style={styles.Barbername}>{item.nm_barber}</Text>
                                    <Stars stars={item.stars} countstars={item.countstars} showCountStart={true} />
                                </View>
                            </View>
                                                
                        ) ) }
                                            
                        <TouchableOpacity onPress={favoritedClick} style={styles.btnStarFavotite}>
                            {favorited ?
                                <FontAwesome name='heart' size={24} color='#FF0000' /> 
                                :
                                <FontAwesome name='heart-o' size={24} color='#FF0000' />  
                            }
                        </TouchableOpacity>                                     
                        
                    </View>
                    
                    {loading &&
                        <ActivityIndicator style={{ marginTop: 50 }} size={'large'} color='#FA6111' />
                    }

                    {!loading && barberInfo.service &&
                        <View style={styles.FieldService}>  
                            <Text style={styles.titleService}> Lista de serviço </Text>

                            {barberInfo.service.map( (item, key) => ( 
                                <>
                                <View key={key} style={styles.serviceItem}>
                                <View style={styles.serviceInfo}>
                                        <Text style={styles.nameService}>{item.nm_service} </Text>
                                        <Text style={styles.priceService}>R$: {item.vl_price} </Text>
                                </View>
                                    <TouchableOpacity style={styles.btnAgenda} onPress={ () => serviceClick(key) }>
                                        <Text style={styles.textbtnAgenda}> Agendar </Text>
                                    </TouchableOpacity>
                                </View>              
                                </>                            
                            ) ) }

                        </View>
                    }

                    {!loading && barberInfo.testimonial && barberInfo.testimonial.length > 0  &&
                        <View style={styles.fieldTestimonial}>                            
                            <Swiper
                                style={{ height: 120, marginBottom: 10 }}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={ <FontAwesome name='chevron-left' size={24} color='red' />  }
                                nextButton={ <FontAwesome name='chevron-right' size={24} color='red' />  }
                            >
                                {barberInfo.testimonial.map( (item, key) => ( 
                                    <View style={styles.testimonialItem} key={key}>
                                        <View style={styles.testimonialInfo}>
                                            <Text style={styles.nameTestimonial}> {item.nameUser} </Text>
                                            <Stars stars={item.stars} countstars={item.countstars} showCountStart={false} />
                                        </View>
                                        <Text style={styles.testimonialMain}> {item.nm_testimonial} </Text>
                                    </View>
                                ) )
                                }
                            </Swiper>
                        </View>
                    
                    }
                    
                </View>

                <TouchableOpacity onPress={backClick} style={styles.btnBack}>
                    <AntDesign name='back' size={24} color='#FA6111' />
                </TouchableOpacity>

                
                <BarberModal 
                    show={showModal} 
                    setShow={setShowModal}
                    barber={barberInfo.barber[0]}                 
                    service={barberInfo.service[selectedService]}
                    calendarAvailable={barberInfo.calendarAvailable}  
                > 
                </BarberModal>
               

            </ScrollView>
        </View>
    </>
    );      
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF'       
    },
    SwiperDot:{
        width: 18,
        height: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        margin: 5
    },
    SwiperDotActive:{
        width: 18,
        height: 10,
        backgroundColor: '#000000',
        borderRadius: 5,
        margin: 5
    },
    fieldImage:{
        flex: 1,
        backgroundColor: '#5853B8'
    },
    image:{
        width: '100%',
        height: 260
    },
    pageMain:{
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 50,
        marginTop: -50
    },
    barberField:{
        flexDirection: 'row',
        marginTop: -30
    },
    barberArea:{
        flex:1, 
        flexDirection:'row'
    },
    barberInfo:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 5
    },
    Barbername:{
        color: '#FA6111',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 32
       },
    imgProfile:{
        width: 110,
        height: 110,
        borderRadius: 45,
        marginLeft: 30,
        marginRight: 15,
        borderWidth: 4,
        borderColor: '#FFFFFF'
    },
    btnStarFavotite:{
        width: 45,
        height: 45,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#999999',
        borderStyle: 'solid',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 30,
        marginTop: 10
    },
    btnBack:{
        position: 'absolute',
        zIndex: 9,
        height: 35,
        width: 35,
        backgroundColor: "#ffffff",
        padding: 5,
        borderRadius: 30,
        marginLeft: 20,
        marginTop: 45
    },

    fakeSwiper:{
        height: 200, 
        backgroundColor: '#5853B8'
    },

    FieldService:{
        marginTop: 30
    },
    serviceInfo:{
        flex: 1
    },
    serviceItem:{
        flexDirection: 'row',
        marginLeft: 25,
        marginRight: 30,
        marginBottom: 20
    },
    nameService:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FA6111'
    },
    priceService:{
        fontSize: 18,
        color: '#FA6111'
    },
    btnAgenda:{
        backgroundColor: '#5853B8',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    textbtnAgenda:{ 
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF' 
    },
    titleService:{
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 20,
        color: '#5853B8'
    },

    fieldTestimonial:{
        marginTop: 30
    },
    testimonialItem:{
        backgroundColor: '#5853B8',
        padding: 15, 
        borderRadius: 10,
        height: 120,
        marginHorizontal: 40
    },
    testimonialInfo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    nameTestimonial:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF'
        
    },
    testimonialMain:{
        fontSize: 13,
        color: '#FFFFFF',
        justifyContent: 'center',
        marginTop: 5
    }
    
})