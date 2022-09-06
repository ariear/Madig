import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import AutoHeightImage from "react-native-auto-height-image"
import { Video} from 'expo-av';
import {DbFirestore} from '../../firebase/firebase-config'
import LoadingDetailContent from "../components/LoadingDetailContent";
import Feather from 'react-native-vector-icons/Feather'

const DetailContent = ({route, navigation}) => {
    const [content,setContent] = useState({})
    const [loading,setLoading] = useState(true)
    const [isNotConnectInet,setisNotConnectInet] = useState(false)

    const getContent = async () => {
       setLoading(true)
       try {
           const contentRef = doc(DbFirestore, 'content', route.params.id) 
           const contentSnap = await getDoc(contentRef)
           
           if (contentSnap.exists()) {
            setContent(contentSnap.data())
            setLoading(false)
           }
       } catch (error) {
            setLoading(false)
            setisNotConnectInet(true)
       }
    }

    useEffect(() => {
        getContent()
    }, []);

    return (
        <View style={{ 
            paddingHorizontal: 15
         }}>
            <View style={{ 
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 15
             }}>
            <Feather name="arrow-left" size={33} style={{ marginRight: 10 }} onPress={() => navigation.goBack()} />
            <Text style={{ 
                fontWeight: '500',
                fontSize: 22
             }}>{content.title}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 60 }}>
             {
                isNotConnectInet &&
            <Text style={{ 
                paddingTop: 20,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500'
             }}>Sepertinya anda tidak terhubung ke internet</Text>
             }
             {
                loading ?
                    <LoadingDetailContent />
                        :
                content.contents.map((img,index) => 
                    <View key={index} >
                    {
                        img.type === 'img' ? 
                        <AutoHeightImage 
                            source={{ uri: img.value }} 
                            width={300} 
                            style={{ width: '100%', marginBottom: 20 , borderRadius: 5}}  />
                                :
                        <Video
                            source={{ uri: img.value }}
                            useNativeControls
                            resizeMode="contain"
                            style={{ width: '100%', height: 210, marginBottom: 20 , borderRadius: 5}} />
                    }
                    </View>
                )
             }
            </ScrollView>
        </View>
    )
}

export default DetailContent