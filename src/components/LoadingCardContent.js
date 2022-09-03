import { View } from "react-native"

const LoadingCardContent = () => {
    const loop = [1,2,3,4,5,6]

    return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {
                loop.map(loo => 
                    <View key={loo} style={{ 
                        width: '47%',
                        height: 80,
                        backgroundColor: '#64A3EC',
                        borderRadius: 10,
                        marginBottom: 15
                     }}></View>
                )
            }
        </View>
    )
}

export default LoadingCardContent