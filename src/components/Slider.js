import { useState } from "react"
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native"

const images = [
    'https://images.unsplash.com/photo-1659535880591-78ed91b35158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1661965884568-a8e5f3f8fd59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1657299156594-50426d5125a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1661993749894-7771a581f7de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
]

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Slider = () => {
    const [imgActive,setImgActive] = useState(0)

    const onSlideHandle = (nativeEvent) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if (slide !== imgActive) {
            setImgActive(slide)
        }
    }

    return (
        <View style={style.wrap_parent}>
            <ScrollView 
                onScroll={({nativeEvent}) => onSlideHandle(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={style.wrap_parent} >
                    {
                        images.map((img , index) => 
                            <Image 
                            key={index}
                            resizeMode='cover'
                            style={style.wrap}
                            source={{ uri: img }} />
                        )
                    }
            </ScrollView>
            <View style={style.wrap_dot}>
                {
                    images.map((img, index) => 
                        <Text key={index} style={imgActive === index ? style.dotActive : style.dot}>●</Text>
                    )
                }
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    wrap_parent:{
        width: '100%',
        height: HEIGHT * 0.25,
        borderRadius: 20
    },
    wrap:{
        width: WIDTH - 30,
        height: HEIGHT * 0.25,
        borderRadius: 20
    },
    wrap_dot:{
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    dotActive:{
        margin: 3,
        color: '#64A3EC'
    },
    dot:{
        margin: 3,
        color: 'white'
    }
})

export default Slider