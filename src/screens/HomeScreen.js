import { View, StatusBar, ScrollView } from "react-native"
import ParentCard from "../components/ParentCard"
import MainTopBar from "../components/MainTopBar"
import Sapa from "../components/Sapa"
import Slider from "../components/Slider"

const HomeScreen = ({navigation}) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ 
            paddingHorizontal: 15
         }}>
            <StatusBar barStyle="light-content" backgroundColor="#64A3EC" />
            <MainTopBar navigation={navigation} name="menu.png" />
            <Sapa />
            <Slider />
            <ParentCard navigation={navigation} />
        </ScrollView>
    )
}

export default HomeScreen