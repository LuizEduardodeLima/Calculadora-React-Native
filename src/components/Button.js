import React from 'react'
import{
    StyleSheet, 
    Text, 
    Dimensions, 
    TouchableHighlight
} from 'react-native'

//Estilização:
const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        /* Usando o dimensions para pegar toda largura e altura da tela do celular e divindo por 4 */
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888',
        backgroundColor: 'rgb(59, 59, 59)',
        color: 'white'
    },

    operationButton: {
        backgroundColor: 'rgb(141, 123, 243)'
    },

    buttonDouble:{
        width: (Dimensions.get('window').width / 4) * 2,
    },

    buttonTriple:{
        width: (Dimensions.get('window').width / 4) * 3,
    },
})

//Componente: 
export default props => {
    //Criando condicional para aplicar estilo dependendo do tipo de botão:
    const stylesButton = [styles.button] //Todo botão vai começar com essa estilização.
    
    //Botão com tamanho em dobro:
    if(props.double) stylesButton.push(styles.buttonDouble)
    //Botão com tamanho triplo:
    if(props.triple) stylesButton.push(styles.buttonTriple)
    /*
        Na prática o que ocorre é, se o parâmentro passado pelo props, identificar que aquele 
        botão é de operação, então o estilo abaixo será aplicado no lugar de button:
    */
    if(props.operation) stylesButton.push(styles.operationButton)

    return(
        /*
            Quando o elemento for clicado dentro da função onClick já estamos passando o parâmetro de
            acordo com seu label, como podemos ver abaixo:
        */
        <TouchableHighlight onPress={() => props.onClick(props.label)}>
            {/* O texto contido no botão será passado via parâmetro = {props.label} */}
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}
