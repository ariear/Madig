import {  signInWithEmailAndPassword } from "firebase/auth"
import {  useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Image } from "react-native"
import { auth } from "../../../firebase/firebase-config"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Feather} from 'react-native-vector-icons'
import Loading from "../../components/Loading";

const Login = ({navigation}) => {
    const [fields,setFields] = useState({
        email: '',
        password: ''
    })
    const [isWrong,setIsWrong] = useState(false)
    const [loading,setLoading] = useState(false)
    const [isShowPassword,setIsShowPassword] = useState(false)

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
                    <TextInput style={{ width: 220, paddingLeft: 10 }} keyboardType="email-address" placeholder="abc@example.com" value={fields.email} onChangeText={(input) => setFields({...fields,email: input})} />
                </View>
              </View>
              <View style={{ 
                marginBottom: 20,
                width: '80%'
               }}>
                <Text style={{ 
                    marginBottom: 5
                 }}>Kata sandi</Text>
                 <View style={[style.formInput, {borderWidth: isWrong ? 2 : 0, borderColor: 'red'},{justifyContent: 'space-between'}]} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="lock" color={isWrong ? 'red' : '#64A3EC'} size={22} />
                    <TextInput style={{ paddingLeft: 10, width: '75%'}} secureTextEntry={isShowPassword ? false : true} placeholder="··········" value={fields.password} onChangeText={(input) => setFields({...fields,password: input})} />
                    </View>
                    <Feather name={isShowPassword ? 'eye' : 'eye-off'} color={isWrong ? 'red' : '#64A3EC'} size={22} onPress={() => setIsShowPassword(!isShowPassword)}  />
                 </View>
              </View>
            
                {
                    isWrong &&
                <Text style={{ marginBottom: 10 , color: 'red'}}>Email/password salah</Text>
                }
            <TouchableWithoutFeedback onPress={() => loginHandle()} ><Text style={style.btnMasuk}>Masuk</Text></TouchableWithoutFeedback>
             <View style={{ width: '80%', borderWidth: 1, borderColor: 'lightgray', marginVertical: 10 }}></View>
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
    }
})

export default Login