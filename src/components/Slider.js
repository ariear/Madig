import * as React from 'react';
import { Text, View, SafeAreaView , Image, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default class Slider extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
            'https://images.unsplash.com/photo-1659535880591-78ed91b35158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1661965884568-a8e5f3f8fd59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1657299156594-50426d5125a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1661993749894-7771a581f7de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
        ]
      }
    }

    _renderItem({item,index}){
        const WIDTH = Dimensions.get('window').width
        const HEIGHT = Dimensions.get('window').height
        
        return (
            <Image 
            key={index}
            resizeMode='cover'
            style={{ 
                width: WIDTH - 50,
                height: HEIGHT * 0.25,
                borderRadius: 20
             }}
            source={{ uri: item }} />
        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1 }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={320}
                  itemWidth={300}
                  renderItem={this._renderItem}
                  autoplay
                  loop
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}