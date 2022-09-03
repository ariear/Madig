import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Image } from "react-native"
import { auth } from "../../../firebase/firebase-config"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Feather, AntDesign} from 'react-native-vector-icons'
import * as Google from 'expo-auth-session/providers/google';
import Loading from "../../components/Loading";

const Login = ({navigation}) => {
    const [fields,setFields] = useState({
        email: '',
        password: ''
    })
    const [isWrong,setIsWrong] = useState(false)
    const [loading,setLoading] = useState(false)

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '429155858848-2c1b5n51atidopqoo8sm978n5g876icb.apps.googleusercontent.com',
        iosClientId: '429155858848-jp1d75o7kuq5vld97ipdo311883fnru3.apps.googleusercontent.com',
        androidClientId: '429155858848-r7590vlmbv4ibrs9f063lekt82e17r54.apps.googleusercontent.com',
        webClientId: '429155858848-k746oebpgrdu1vjephadpep9ve6rcacu.apps.googleusercontent.com',
      });

    const loginHandle = async () => {
        if (fields.email === '' || fields.password === '') return false
        setIsWrong(false)
        setLoading(true)
        try {
            const processSignIn = await signInWithEmailAndPassword(auth, fields.email, fields.password)
            await AsyncStorage.setItem('user', JSON.stringify({
                email: processSignIn.user.email,
                name: processSignIn.user.displayName ? processSignIn.user.displayName : processSignIn.user.email,
                photo_url: processSignIn.user.photoURL ? processSignIn.user.photoURL : null,
                expire: processSignIn.user.stsTokenManager.expirationTime
            }))
            setLoading(false)
            navigation.replace('DrawerNav', {screen: 'Home'})
        } catch (error) {
            setLoading(false)
            setIsWrong(true)
        }
    }

    const loginGoogleHandle = async () => {
        if (response?.type === 'success') {
            const { authentication } = response;

            const credential = GoogleAuthProvider.credential(authentication.idToken,authentication.accessToken)
            const processCredent = await signInWithCredential(auth,credential)
            console.log(processCredent);
            await AsyncStorage.setItem('user', JSON.stringify({
                email: processCredent.user.email,
                name: processCredent.user.displayName,
                photo_url: processCredent.user.photoURL,
                phone_number: processCredent.user.phoneNumber,
                expire: processCredent.user.stsTokenManager.expirationTime
            }))
            navigation.replace('DrawerNav', {screen: 'Home'})
        }
    }

    useEffect(() => {
        loginGoogleHandle()
    }, []);
    
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
                <View style={[style.formInput, {borderWidth: isWrong ? 2 : 0, borderColor: 'red'}]} >
                    <Feather name="mail" color={isWrong ? 'red' : '#64A3EC'} size={22} />
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
                 <View style={[style.formInput, {borderWidth: isWrong ? 2 : 0, borderColor: 'red'}]} >
                    <Feather name="lock" color={isWrong ? 'red' : '#64A3EC'} size={22} />
                    <TextInput style={{ width: 240, paddingLeft: 10 }} secureTextEntry={true} placeholder="··········" value={fields.password} onChangeText={(input) => setFields({...fields,password: input})} />
                 </View>
              </View>
            
                {
                    isWrong &&
                <Text style={{ marginBottom: 10 , color: 'red'}}>Email/password salah</Text>
                }
            <TouchableWithoutFeedback onPress={() => loginHandle()} ><Text style={style.btnMasuk}>Masuk</Text></TouchableWithoutFeedback>
             <View style={{ width: '80%', borderWidth: 1, borderColor: 'lightgray', marginVertical: 10 }}></View>
            <TouchableWithoutFeedback onPress={() => promptAsync()}>
            <View style={style.btnMasukGoogle}>
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

            {
                loading &&
                <Loading />
            }
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
    },
    btnMasuk:{
        backgroundColor: '#64A3EC',
        width: '80%',
        textAlign: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        color: '#ffff',
        fontWeight: '500'
    },
    btnMasukGoogle:{
        backgroundColor: '#54BAB9',
        width: '80%',
        borderRadius: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    }
})

export default Login