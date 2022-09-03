import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { ScrollView, Text } from "react-native"
import AutoHeightImage from "react-native-auto-height-image"
import {DbFirestore} from '../../firebase/firebase-config'

const DetailContent = ({route}) => {
    const [content,setContent] = useState({})
    const [loading,setLoading] = useState(true)

    const getContent = async () => {
        setLoading(true)
        const contentRef = doc(DbFirestore, 'content', route.params.id)

        onSnapshot(contentRef, (content) => {
            if (content.exists()) {
                setContent(content.data())
                setLoading(false)
            }else{
                setLoading(false)
                console.log('Tidak ada content');
            }
        })
        
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
                !loading &&
                content.imgContent.map((img,index) => 
                    <AutoHeightImage 
                        source={{ uri: img }} 
                        width={300} 
                        style={{ width: '100%', marginBottom: 20 , borderRadius: 5}} 
                        key={index} />
                )
             }
        </ScrollView>
    )
}

export default DetailContent