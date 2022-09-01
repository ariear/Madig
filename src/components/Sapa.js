import { useEffect, useState } from "react"
import { Text, StyleSheet } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sapa = () => {
    const [waktu, setWaktu] = useState('')
    const [nama,SetNama] = useState(null)

    useEffect(() => {
        const date = new Date().getHours() 
        if (date < 4) {
            setWaktu('malam')
        }else if (date < 10) {
            setWaktu('pagi')
        }else if (date < 13) {
            setWaktu('siang')
        }else if (date < 18) {
            setWaktu('sore')
        }else{
            setWaktu('malam')
        }

        getData()
    }, [])

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('user')
          if(value !== null) {
            const getName = JSON.parse(value)
            SetNama(getName.name.split('@')[0])
          }
        } catch(e) {
          // error reading value
        }
      }

    return (
        <Text style={style.sapa}>Selamat {waktu} <Text style={{ color: '#64A3EC' }}>{nama ? nama : ''}</Text></Text>
    )
}

const style = StyleSheet.create({
    sapa:{
        fontSize: 24,
        fontWeight: '500',
        paddingTop: 10,
        marginBottom: 15
    }
})

export default Sapa