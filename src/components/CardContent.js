import { TouchableWithoutFeedback , ImageBackground, Text, View } from "react-native"

const CardContent = ({navigation, cont}) => {
    return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('DetailContent',{id: cont.id})} key={cont.id} >
                <View style={{ width: '47%' }}>
                <ImageBackground 
                    source={{ uri: cont.thumbnail }} 
                    imageStyle={{ width: '100%', borderRadius: 10 , opacity: 0.5}} 
                    resizeMode="cover" 
                style={{ 
                    width: '100%',
                    height: 80,
                    backgroundColor: '#000000',
                    marginBottom: 15,
                    borderRadius: 10
                 }}>
                    <Text style={{ 
                        color: '#ffffff',
                        fontWeight: '600',
                        padding: 10,
                        fontSize: 16
                     }}>{cont.title}</Text>
                 </ImageBackground>
                 </View>
            </TouchableWithoutFeedback>
    )
}

export default CardContent