import * as React from 'react';
import { View, SafeAreaView , Image, Dimensions} from 'react-native';
import { doc, getDoc } from "firebase/firestore";
import Carousel from 'react-native-snap-carousel';
import { DbFirestore } from '../../firebase/firebase-config';

export default class Slider extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
        dataCarousel: []
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

    async getSlideData(){
      const slidedataRef = doc(DbFirestore,'slider','tTmViDmh62Gwx4woJdqU')
      const slidedataSnap = await getDoc(slidedataRef)
      this.setState({
        ...this.state,
        dataCarousel: slidedataSnap.data().image
      })
    }

    componentDidMount() { 
      this.getSlideData()
     }

    render() {
        return (
          <SafeAreaView style={{flex: 1 }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.dataCarousel}
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