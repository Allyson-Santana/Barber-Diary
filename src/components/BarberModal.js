import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from 'react-native-vector-icons';

import imgDefault from '../../assets/person.png';
import api from '../requests/api';

export default ({ show, setShow, barber, service, calendarAvailable }) => {
    
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro','Dezembro'
    ];
    const days = [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ];

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] =  useState(null);
    const [listDay, setListDay] = useState([]);
    const [listHour, setListHour] = useState([]);

    const navigation = useNavigation();

    const leftDateClick = () => {
        let getDateSelected = new Date(selectedYear, selectedMonth, 1);
        getDateSelected.setMonth( getDateSelected.getMonth() - 1 );

        setSelectedYear( getDateSelected.getFullYear() );
        setSelectedMonth( getDateSelected.getMonth() );
        setSelectedDay(0);
    }
    const rightDateClick = () => {
        let getDateSelected = new Date(selectedYear, selectedMonth, 1);
        getDateSelected.setMonth( getDateSelected.getMonth() + 1 );

        setSelectedYear( getDateSelected.getFullYear() );
        setSelectedMonth( getDateSelected.getMonth() );
        setSelectedDay(0);
    }

    
    useEffect(() => {        
        if(calendarAvailable) {
            let daysInMonth = new Date( selectedYear, selectedMonth+1, 0 ).getDate();
            let newListDays = []
            for(let i=1; i<=daysInMonth; i++) {
                let d = new Date(selectedYear, selectedMonth, i);
                let year = d.getFullYear();
                let month = d.getMonth() + 1;
                let day = d.getDate();

                month = month < 10 ? '0'+month : month;
                day = day < 10 ? '0'+day : day;

                let setDate = `${year}-${month}-${day}`; 
                let availability = calendarAvailable.filter(e=>e.dt_dateAvailable === setDate); 
                 
                newListDays.push({
                    status: availability.length > 0 ? true : false,
                    weekDay: days[d.getDay()],
                    number: i
                });            
            }   
            setListDay(newListDays);
            setSelectedDay(0);
            setListHour([]);
            setSelectedHour(0);
        }
    }, [calendarAvailable, barber, selectedMonth, selectedYear])

    useEffect(() => {
        if(selectedDay > 0) {
            let d = new Date(selectedYear, selectedMonth, selectedDay);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();

            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;

            let setDate = `${year}-${month}-${day}`;

            let availability = calendarAvailable.filter(e=>e.dt_dateAvailable === setDate); 
            
            setListHour(availability);
        }
        setSelectedHour(null);
    }, [selectedDay])

    
    useEffect(() => {
        let today = new Date();
        setSelectedYear( today.getFullYear() );
        setSelectedMonth( today.getMonth() );
        setSelectedDay( today.getDate() );
    }, [])
        
    const hideBtnClick = () => {
        setShow(false);
    }

    const finishClick = async () => {
        if( barber && service != null && selectedHour != null && selectedDay > 0 ) {
            let key = selectedHour['hour'].cd_hourAvailable;
            let response = await api.setAppontment(key);
            if(response) {
                setShow(false);
                navigation.navigate('Appointments');
            } else {
                Alert.alert("Opssss...", "Algo deu errado");
            }
        } else {

        }
    }
    
    return(
        <>
            <Modal
                transparent={true}
                visible={show}
                animationType='slide'
            >
                <View style={styles.container}>
                    <View style={styles.ModalBody}>
                        
                        <TouchableOpacity style={styles.hideBtn} onPress={hideBtnClick}>
                            <MaterialCommunityIcons name="window-close" size={28} color="white" />
                        </TouchableOpacity>

                        {barber &&
                            <View style={styles.modalItem}>                            
                                <View style={styles.barber}> 
                                    {/* imgDefault<Image style={styles.barberAvatar} source={{ uri: item.ds_avatar }} /> */}
                                    <Image style={styles.barberAvatar} source={imgDefault} />
                                    <Text style={styles.barberName}>{ barber.nm_barber }</Text>
                                </View>                                                 
                            </View>  
                        }                      
                      
                        {service &&
                            <View style={styles.modalItem}> 
                                <View style={styles.service}>
                                    <Text style={styles.serviceName}>{service.nm_service}</Text>
                                    <Text style={styles.servicePrice}>R$ {service.vl_price}</Text>
                                </View>
                            </View>                       
                        }
                        
                        <View style={styles.modalItem}> 

                            <View style={styles.filedCalendar}> 
                                <TouchableOpacity style={styles.btnDateLeft} onPress={ leftDateClick }>      
                                    <FontAwesome name='chevron-left' size={27} color='#6A5ACD' />                              
                                </TouchableOpacity>

                                <View style={styles.date}>
                                    <Text style={styles.dateTitle}> { months[selectedMonth] } { selectedYear } </Text>
                                </View>

                                <TouchableOpacity style={styles.btnDateRight} onPress={ rightDateClick }>  
                                    <FontAwesome name='chevron-right' size={27} color='#6A5ACD' />                                 
                                </TouchableOpacity>            
                            </View>
                            
                            <ScrollView 
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {listDay.map( (item, key) => (
                                        <TouchableOpacity 
                                            key={key}
                                            onPress={ ()=>item.status ? setSelectedDay(item.number) : null } 
                                            style={{ 
                                                width: 49.3,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                paddingVertical: 5,
                                                backgroundColor: item.number === selectedDay ? '#6A5ACD' : '#FFFFFF',
                                                opacity: item.status ? 1 : 0.5                                                                                              
                                            }}
                                            //style={styles.btnListCalendar}
                                        >
                                            <Text style={{
                                                    fontSize: 18,
                                                    fontWeight: 'bold',
                                                    color: item.number === selectedDay ? '#FFFFFF' : '#000000'
                                                }} 
                                                //style={styles.weekDay}
                                            > 
                                                {item.weekDay} 
                                            </Text>

                                            <Text style={{
                                                    fontSize: 16.5,
                                                    fontWeight: 'bold',
                                                    color: item.number === selectedDay ? '#FFFFFF' : '#000000'
                                                }} 
                                                //style={styles.number}
                                            >
                                                 {item.number} 
                                            </Text>
                                        </TouchableOpacity>
                                    ) ) }
                            </ScrollView>
                           
                        </View>

                        {listHour.length > 0  &&
                            <View style={styles.modalItem}>
                                <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                >
                                    {listHour.map( (item, key) => (
                                        <TouchableOpacity 
                                            key={key} 
                                            onPress={ ()=>setSelectedHour(item) }
                                            // style={styles.itemHour} 
                                            style={{ 
                                                width: 75,
                                                height: 40,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                marginHorizontal: 5,
                                                borderStyle: 'solid',
                                                borderWidth: 1,
                                                borderColor: '#DCDCDC',
                                                backgroundColor: item === selectedHour ? '#6A5ACD' : '#FFFFFF'
                                            }} 
                                        >
                                            <Text 
                                                //style={styles.itemHourText}
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                    color: item === selectedHour ? '#FFFFFF' : '#000000'
                                                }}
                                            > 
                                            { item['hour'].tm_hourAvailable } </Text>
                                        </TouchableOpacity>
                                    ) ) }       
                                </ScrollView> 
                            </View> 
                        }
                      
                       <TouchableOpacity onPress={finishClick} style={styles.btnFinish}>
                            <Text style={styles.finishText}> Finalizar Agendamento </Text>
                       </TouchableOpacity>

                    </View>
                </View>
            </Modal>    
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
       // backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end'                
    },
    ModalBody:{
        backgroundColor: '#5853B8',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 10,
        paddingTop: 15,
        paddingBottom: 20
    },
    hideBtn:{
        width: 40,
        height: 40,
        marginBottom: 5
    },
    modalItem:{
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10
    },
    barber:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    barberAvatar:{
        width: 55,
        height: 55,
        borderRadius: 20,
        marginRight: 15
    },
    barberName:{
        color: '#FA6111',
        fontSize: 18,
        fontWeight: 'bold'
    },
    service:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3
    },
    serviceName:{
        color: '#FA6111',
        fontSize: 17,
        fontWeight: 'bold'
    },
    servicePrice:{
        color: '#FA6111',
        fontSize: 17,
        fontWeight: 'bold'
    },
    btnFinish:{
        backgroundColor: '#FA6111',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    finishText:{
        fontSize: 17.5,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    filedCalendar:{
        flexDirection: 'row'
    },
    btnDateLeft:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    btnDateRight:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    date:{
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    },
  
    weekDay:{
        fontSize: 18,
        fontWeight: 'bold'
    }, 
    number:{
        fontSize: 16.5,
        fontWeight: 'bold'
    }, 
    btnListCalendar:{
        width: 49.3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 5,
    },
    itemHour:{
        width: 75,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#DCDCDC'
    },
    itemHourText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FA6111'
    }
});