import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { View, Text, TextInput, StyleSheet, Button, TouchableWithoutFeedback } from "react-native"
import { auth } from "../../../firebase/firebase-config"

const Login = ({navigation}) => {
    const [fields,setFields] = useState({
        email: '',
        password: ''
    })

    const loginHandle = async () => {
        try {
            const processSignIn = await signInWithEmailAndPassword(auth, fields.email, fields.password)
            console.log(processSignIn.user);
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return (
        <View>
            <Text>Ini Login</Text>
            <TextInput style={style.formInput} keyboardType="email-address" value={fields.email} onChangeText={(input) => setFields({...fields,email: input})} />
            <TextInput style={style.formInput} secureTextEntry={true} value={fields.password} onChangeText={(input) => setFields({...fields,password: input})} />
            <Button title="login" onPress={() => loginHandle()} />
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')} ><Text>dereng damel akun?</Text></TouchableWithoutFeedback>
        </View>
    )
}

const style = StyleSheet.create({
    formInput:{
        borderWidth: 1
    }
})

export default Login