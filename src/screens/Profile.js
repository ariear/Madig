import { Image, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import MainTopBar from "../components/MainTopBar"

const Profile = ({navigation}) => {
    return (
        <View>
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
                <Image source={require('../../assets/images/icons/person.png')} style={{ 
                    width: 100,
                    height: 100 
                 }} />
                </View>
            </View>
            <View style={{ 
                paddingTop: 55,
                paddingHorizontal: 30
             }}>
                <Text style={{ 
                    textAlign: 'center',
                    marginBottom: 25
                 }}>Ubah gambar</Text>

                <View style={{ marginBottom: 15 }}>
                    <Text style={{ 
                        fontWeight: '500',
                        marginBottom: 5
                     }}>Nama pengguna</Text>
                    <TextInput style={{ 
                        borderWidth: 1,
                        borderColor: '#64A3EC',
                        borderRadius: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 10
                     }} />
                </View>
                <View style={{ 
                    marginBottom: 25
                 }}>
                    <Text style={{ 
                        fontWeight: '500',
                        marginBottom: 5
                     }}>Nomor telepon</Text>
                    <TextInput keyboardType="phone-pad" style={{ 
                        borderWidth: 1,
                        borderColor: '#64A3EC',
                        borderRadius: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 10
                     }} />
                </View>
                <TouchableWithoutFeedback>
                    <Text style={{ 
                        textAlign: 'center',
                        paddingVertical: 10,
                        backgroundColor: '#64A3EC',
                        borderRadius: 10,
                        color: '#ffff',
                        fontWeight: '500'
                     }}>Perbarui</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

export default Profile