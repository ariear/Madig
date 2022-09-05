import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import AutoHeightImage from "react-native-auto-height-image"
import { Video} from 'expo-av';
import {DbFirestore} from '../../firebase/firebase-config'
import LoadingDetailContent from "../components/LoadingDetailContent";

const DetailContent = ({route}) => {
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
        <ScrollView style={{ 
            paddingHorizontal: 15
         }}>
            <Text style={{ 
                paddingTop: 15,
                fontWeight: '500',
                fontSize: 30,
                marginBottom: 20
             }}>{content.title}</Text>
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
    )
}

export default DetailContent