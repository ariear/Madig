import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Image } from "react-native"
import { auth } from "../../../firebase/firebase-config"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Feather, AntDesign} from 'react-native-vector-icons'
import { signInWithRedirect , GoogleAuthProvider } from "firebase/auth";

const Login = ({navigation}) => {
    const [fields,setFields] = useState({
        email: '',
        password: ''
    })

    const loginHandle = async () => {
        try {
            const processSignIn = await signInWithEmailAndPassword(auth, fields.email, fields.password)
            await AsyncStorage.setItem('user', JSON.stringify({
                email: processSignIn.user.email,
                name: processSignIn.user.displayName ? processSignIn.user.displayName : processSignIn.user.email,
                expire: processSignIn.user.stsTokenManager.expirationTime
            }))
            navigation.replace('DrawerNav', {screen: 'Home'})
        } catch (error) {
            console.log(error.message);
        }
    }

    const loginGoogleHandle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const results = await signInWithRedirect(auth,provider)
            console.log(results);
            navigation.replace('DrawerNav', {screen: 'Home'})
        } catch (error) {
            console.log(error);
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
              }}>Masukkan akun anda</Text>
              
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
            
            <TouchableWithoutFeedback onPress={() => loginHandle()} ><Text style={{ 
                backgroundColor: '#64A3EC',
                width: '80%',
                textAlign: 'center',
                paddingVertical: 15,
                borderRadius: 10,
                color: '#ffff',
                fontWeight: '500'
             }}>Masuk</Text></TouchableWithoutFeedback>
             <View style={{ width: '80%', borderWidth: 1, borderColor: 'lightgray', marginVertical: 10 }}></View>
            <TouchableWithoutFeedback onPress={() => loginGoogleHandle()}>
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
                }}>Masuk dengan Google</Text>
            </View>
             </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')} ><Text style={{ 
                width: '80%',
                color: '#64A3EC'
            }}>Belum punya akun?</Text></TouchableWithoutFeedback>
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