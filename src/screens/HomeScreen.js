import { View, Text, StatusBar, TouchableWithoutFeedback, Image, StyleSheet } from "react-native"
import MainTopBar from "../components/MainTopBar"
import Sapa from "../components/Sapa"

const HomeScreen = ({navigation}) => {
    return (
        <View style={{ 
            paddingHorizontal: 15
         }}>
            <StatusBar barStyle="light-content" backgroundColor="#64A3EC" />
            <MainTopBar navigation={navigation} name="menu.png" />

            <Sapa />
        </View>
    )
}

export default HomeScreen