import { useState } from "react"
import { auth } from "../../../firebase/firebase-config"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback , Image} from "react-native"
import {Feather, AntDesign} from 'react-native-vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
    const [fields,setFields] = useState({
        email: '',
        password: ''
    })

    const handleRegister = async () => {
        try {
            const processCreateUser = await createUserWithEmailAndPassword(auth,fields.email,fields.password)
            await AsyncStorage.setItem('user', JSON.stringify({
                email: processCreateUser.user.email,
                name: processCreateUser.user.displayName ? processCreateUser.user.displayName : processCreateUser.user.email,
                expire: processCreateUser.user.stsTokenManager.expirationTime
            }))
            navigation.replace('DrawerNav', {screen: 'Home'})
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <View style={{ 
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
         }}>
            <Image 
                source={require('../../../assets/images/stmbalunglogo.png')}
                style={{ 
                    width: 140,
                    height: 140,
                    marginBottom: 15 }} />
            <Text style={{ 
                fontWeight: '600',
                fontSize: 25,
                color: '#64A3EC',
                marginBottom: 5
             }}>Madig</Text>
             <Text style={{ 
                fontWeight: '500',
                marginBottom: 20
              }}>Buat akun baru</Text>

            <View style={{ 
                marginBottom: 15,
                width: '80%'
               }}>
                <Text style={{ 
                    marginBottom: 5
                 }}>Alamat email</Text>
                <View style={style.formInput} >
                    <Feather name="mail" color="#64A3EC" size={22} />
                    <TextInput style={{ width: 240, paddingLeft: 10 }} keyboardType="email-address" placeholder="abc@example.com" value={fields.email} onChangeText={(input) => setFields({...fields,email: input})} />
                </View>
            </View>
            <View style={{ 
                marginBottom: 20,
                width: '80%'
               }}>
                <Text style={{ 
                    marginBottom: 5
                 }}>Kata sandi</Text>
                 <View style={style.formInput} >
                    <Feather name="lock" color="#64A3EC" size={22} />
                    <TextInput style={{ width: 240, paddingLeft: 10 }} secureTextEntry={true} placeholder="··········" value={fields.password} onChangeText={(input) => setFields({...fields,password: input})} />
                 </View>
              </View>
              <TouchableWithoutFeedback onPress={() => handleRegister()}><Text style={{ 
                backgroundColor: '#64A3EC',
                width: '80%',
                textAlign: 'center',
                paddingVertical: 15,
                borderRadius: 10,
                color: '#ffff',
                fontWeight: '500'
             }}>Buat</Text></TouchableWithoutFeedback>
             <View style={{ width: '80%', borderWidth: 1, borderColor: 'lightgray', marginVertical: 10 }}></View>
            <TouchableWithoutFeedback>
            <View style={{ 
                backgroundColor: '#54BAB9',
                width: '80%',
                borderRadius: 10,
                paddingVertical: 15,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 5
             }}>
                <AntDesign name="google" size={22} color="#ffff" />
                <Text style={{ 
                    color: '#ffff',
                    fontWeight: '500',
                    marginLeft: 10
                }}>Buat dengan Google</Text>
            </View>
             </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')} ><Text style={{ 
                width: '80%',
                color: '#64A3EC'
            }}>Sudah punya akun?</Text></TouchableWithoutFeedback>
        </View>
    )
}

const style = StyleSheet.create({
    formInput:{
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10
    }
})

export default Login