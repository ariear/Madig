import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { signOut } from "firebase/auth";
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View, DevSettings } from 'react-native';
import { auth } from '../../firebase/firebase-config';
import { useEffect, useState } from 'react';

const CustomDrawerContent = (props) => {
    const [user, setUser ] = useState({})
    const [isNotFound,setIsNotFound] = useState(true)

    const getUser = async () => {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
            setIsNotFound(false)
        }
    }

    const SignOutHandle = async () => {
        try {
            await signOut(auth)
            await AsyncStorage.removeItem('user')
            props.navigation.replace('DrawerNav', {screen: 'Home'})
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getUser()
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#64A3EC' }} >
                <View style={style.headerDrawer}>
                    <Image source={{ uri: user.photo_url ? user.photo_url : 'https://firebasestorage.googleapis.com/v0/b/madig-b9821.appspot.com/o/person.png?alt=media&token=1ac82a87-54a8-444d-b07b-225255132a51' }} style={style.photo_profile} />
                    <Text style={style.username}>{!isNotFound ? user.name : 'Tamu'}</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: '#ffffff', paddingTop: 10 }}>
                <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <TouchableWithoutFeedback onPress={() => !isNotFound ? SignOutHandle() : props.navigation.navigate('Login')}>
            <View style={{ 
                    paddingVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: 'lightgray',
                    elevation: 0.6 }}>
                <Text style={{ 
                        marginLeft: 10, 
                        color: '#64A3EC',
                        fontWeight: '500',
                        fontSize: 16,
                        marginRight: 5}}> {!isNotFound ? 'Keluar' : 'Masuk'}</Text>
                <Feather name={!isNotFound ? 'log-out' : 'log-in'} color="#64A3EC" size={22} />
            </View>
            </TouchableWithoutFeedback>
        </View>
      );
}

const style = StyleSheet.create({
    headerDrawer:{
        padding: 20,
        backgroundColor: '#64A3EC',
        flexDirection: 'row'
    },
    photo_profile:{
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 15
    },
    username:{
        paddingTop: 10,
        fontWeight: '600',
        fontSize: 16,
        color: '#ffffff',
        flexWrap: 'wrap'
    }
})

export default CustomDrawerContent