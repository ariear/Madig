import {TouchableWithoutFeedback , Image} from 'react-native'

const MainTopBar = ({navigation, name}) => {
    return (
        <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
        <Image source={require( `../../assets/images/icons/menu.png`)} style={{ 
            width: 35,
            height: 35,
            marginTop: 20
         }} />
        </TouchableWithoutFeedback>
    )
}

export default MainTopBar