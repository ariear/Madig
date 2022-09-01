import { View, StatusBar } from "react-native"
import CardContent from "../components/CardContent"
import MainTopBar from "../components/MainTopBar"
import Sapa from "../components/Sapa"
import Slider from "../components/Slider"

const HomeScreen = ({navigation}) => {
    return (
        <View style={{ 
            paddingHorizontal: 15
         }}>
            <StatusBar barStyle="light-content" backgroundColor="#64A3EC" />
            <MainTopBar navigation={navigation} name="menu.png" />
            <Sapa />
            <Slider />
            <CardContent />
        </View>
    )
}

export default HomeScreen