import { StyleSheet, View } from "react-native"
import LottieView from 'lottie-react-native';

const Loading = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject,{ 
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)'
         }]}>
            <LottieView 
                source={require('../../assets/images/loader.json')} 
                autoPlay 
                loop         
                style={{
                width: 130,
                height: 130,
            }} />
        </View>
    )
}

export default Loading