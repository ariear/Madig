import { useState } from "react"
import { auth } from "../../../firebase/firebase-config"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { View, Text, TextInput, StyleSheet, Button, TouchableWithoutFeedback } from "react-native"

const Login = ({navigation}) => {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })

    const handleRegister = async () => {
        try {
            const processCreateUser = await createUserWithEmailAndPassword(auth,fields.email,fields.password)
            console.log(processCreateUser.user);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <View>
            <Text>Ini Register</Text>
            <TextInput style={style.formInput} keyboardType="email-address" value={fields.email} onChangeText={(input) => setFields({...fields,email: input})} />
            <TextInput style={style.formInput} secureTextEntry={true} value={fields.password} onChangeText={(input) => setFields({...fields,password: input})} />
            <Button title="register" onPress={() => handleRegister()} />
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')} ><Text>Gadah akun?</Text></TouchableWithoutFeedback>
        </View>
    )
}

const style = StyleSheet.create({
    formInput:{
        borderWidth: 1
    }
})

export default Login