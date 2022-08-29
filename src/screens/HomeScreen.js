import { View, Text, StatusBar, TouchableWithoutFeedback } from "react-native"

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <StatusBar barStyle="default" />
            <Text>Ini HomeScreen</Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')} ><Text>Login</Text></TouchableWithoutFeedback>
        </View>
    )
}

export default HomeScreen