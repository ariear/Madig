import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { collContent } from "../../firebase/firebase-config"
import CardContent from "./CardContent"
import LoadingCardContent from "./LoadingCardContent"

const ParentCard = ({navigation}) => {
    const [content,setContent] = useState([])
    const [loading,setLoading] = useState(false)
    const [isNotConnectInet,setisNotConnectInet] = useState(false)

    const getContent = () => {
        setLoading(true)
        onSnapshot(collContent, (snapshot) => {
            setContent(snapshot.docs.map(snap => (
                {...snap.data(),id: snap.id}
            )))
            setLoading(false)
        },(error) => {
            setisNotConnectInet(true)
        })
    }

    useEffect(() => {
        getContent()
    }, []);

    return (
        <>
        {
            isNotConnectInet && <Text style={{ 
                paddingTop: 20,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500'
             }}>Sepertinya anda tidak terhubung ke internet</Text>
        }
        <View style={{ 
            paddingVertical: 25,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
         }}>
            {
                loading ?
                <LoadingCardContent />
                    :
                content.map((cont) => 
                    <CardContent key={cont.id} cont={cont} navigation={navigation} />
                )
            }
        </View>
        </>
    )
}

export default ParentCard