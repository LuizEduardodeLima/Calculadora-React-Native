import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

//Estilização:
const styles = StyleSheet.create({
    display: {
        //Permite que o componente cresça de acordo com a necessidade da tela:
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        //Alinhando elemento a direita:
        alignItems: 'flex-end',
    },

    displayValue: {
        fontSize: 60,
        color: '#fff'
    }
})

export default props =>
    <View style={styles.display}>
        {/* O valor do display será passado via props */}
        <Text style={styles.displayValue} numberOfLines={1}>{props.value}</Text>
        {/* O numberOfLines força o Text a ter apenas um linha */}
    </View>

