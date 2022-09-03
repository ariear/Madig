import { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { updateProfile } from 'firebase/auth'
import MainTopBar from "../components/MainTopBar"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, storage } from "../../firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util"
import * as ImagePicker from 'expo-image-picker';
import Loading from "../components/Loading";

const Profile = ({navigation}) => {
    const [user,setUser] = useState({})
    const [isNotFound,setIsNotFound] = useState(true)
    const [fields,setFields] = useState({
        displayName: ''
    })
    const [loadingUpload,setLoadingUpload] = useState(false)

    const getUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            if(value !== null) {
              const resVal = JSON.parse(value)
              setUser(resVal)
              setIsNotFound(false)
              setFields({displayName: resVal.name})
            }
          } catch(e) {
            console.log(e.message);
          }
    }

    const updateUser = async () => {
        if (fields.displayName === '') return false

        setLoadingUpload(true)
        try {
            await updateProfile(auth.currentUser,{
                displayName: fields.displayName
            })
            await AsyncStorage.setItem('user', JSON.stringify({
                ...user,
                name: fields.displayName
            }))
            
            setLoadingUpload(false)
            navigation.replace('DrawerNav', {screen: 'Home'})
        } catch (error) {
            console.log(error.message);
        }
    }

    const uploadPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,4],
            quality: 1
        })

        if (!result.cancelled) {
            const PhotoRef = ref(storage, `photoProfile/${uuidv4()}`)
            
            setLoadingUpload(true)

            const img = await fetch(result.uri)
            const bytes = await img.blob()

            await uploadBytes(PhotoRef, bytes)
            const getdownload = await getDownloadURL(PhotoRef)
            
            try {
                await updateProfile(auth.currentUser,{
                    photoURL: getdownload
                })
                await AsyncStorage.setItem('user', JSON.stringify({
                    ...user,
                    photo_url: getdownload
                }))
                setLoadingUpload(false)
                navigation.replace('DrawerNav', {screen: 'Home'})
                
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getUser()
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ 
                backgroundColor: '#64A3EC',
                paddingHorizontal: 15,
                paddingBottom: 80
             }}>
                <MainTopBar navigation={navigation} name="menu-white.png" />

                <View style={{ 
                    width: '100%',
                    position: 'absolute',
                    bottom: -50,
                    left: 15,
                    alignItems: 'center'
                 }}>
                <Image source={{ uri: user.photo_url ? user.photo_url : 'https://firebasestorage.googleapis.com/v0/b/madig-b9821.appspot.com/o/person.png?alt=media&token=1ac82a87-54a8-444d-b07b-225255132a51' }} style={{ 
                    width: 100,
                    height: 100 ,
                    borderRadius: 50
                 }} />
                </View>
            </View>
            {
                !isNotFound ? 
                <View style={{ 
                    paddingTop: 55,
                    paddingHorizontal: 30
                 }}>
                    <TouchableWithoutFeedback onPress={() => uploadPhoto()} >
                    <Text style={{ 
                        textAlign: 'center',
                        marginBottom: 25
                     }}>Ubah gambar</Text>
                    </TouchableWithoutFeedback>
    
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ 
                            fontWeight: '500',
                            marginBottom: 5
                         }}>Email</Text>
                        <TextInput style={style.input} value={user.email} editable={false} />
                    </View>
                    <View style={{ marginBottom: 25 }}>
                        <Text style={{ 
                            fontWeight: '500',
                            marginBottom: 5
                         }}>Nama pengguna</Text>
                        <TextInput style={style.input} value={fields.displayName} onChangeText={(input) => setFields({...fields,displayName: input})} />
                    </View>
                    <TouchableWithoutFeedback onPress={() => updateUser()} >
                        <Text style={style.btnUpdate}>Perbarui</Text>
                    </TouchableWithoutFeedback>
                </View>
                    :
            <View style={{ paddingTop: 60, paddingHorizontal: 30 }}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')} ><Text style={style.btnLogin}>Masuk terlebih dahulu</Text></TouchableWithoutFeedback>
            </View>
            }
            {
                loadingUpload &&
            <Loading />
            }
        </View>
    )
}

const style = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: '#64A3EC',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    btnLogin:{
        textAlign: 'center',
        fontWeight: '500',
        backgroundColor: '#64A3EC',
        color: '#fff',
        paddingVertical: 15,
        borderRadius: 10
    },
    btnUpdate:{
        textAlign: 'center',
        paddingVertical: 10,
        backgroundColor: '#64A3EC',
        borderRadius: 10,
        color: '#ffff',
        fontWeight: '500'
    }
})

export default Profile