import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { ImageBackground, Text, View } from "react-native"
import { collContent } from "../../firebase/firebase-config"

const CardContent = () => {
    const [content,setContent] = useState([])

    const getContent = () => {
        onSnapshot(collContent, (snapshot) => {
            setContent(snapshot.docs.map(snap => (
                {...snap.data(),id: snap.id}
            )))
        })
    }

    useEffect(() => {
        getContent()
    }, []);

    return (
        <View style={{ 
            paddingVertical: 25,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
         }}>
            {
                content.map((cont) => 
                <ImageBackground 
                    source={{ uri: cont.thumbnail }} 
                    imageStyle={{ width: '100%', borderRadius: 10 , opacity: 0.5}} 
                    resizeMode="cover"
                    key={cont.id} 
                style={{ 
                    width: '47%',
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
                )
            }
        </View>
    )
}

export default CardContent