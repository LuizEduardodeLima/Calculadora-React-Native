import React, {Component} from 'react'
import {Platform, Text, StyleSheet, View} from 'react-native'
//Importação do componentes criados:
import Button from './src/components/Button'
import Display from './src/components/Display'

const initiaLState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default class App extends Component{
  //Criando estado e adicionando o nosso elemento criado acima:
  state = { ...initiaLState }

  //Função que adiciona o digito a nosso, display, o n é o parâmentro que será passado:
  addDigit = n => {
    //Lógica para evitar zeros a esquerda:
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    
    //Lógica para impedir mais de um ponto no display:
    if(n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return
    }
    
    /* 
      Lógica - Caso o usuário tenha apertado a função limpar o display senão adicione o valor
      corrente ao display:
    */

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const  displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })

    if(n !== '.'){
      //Convertendo valor para float:
      const newValue = parseFloat(displayValue)
      //Os ... serve para clonar o elemento que estamos passando para a variável:
      const values = [...this.state.values]
      //Adicionando o novo valor ao nosso array dependendo da posição do current que pode ser [0, 1]
      values[this.state.current] = newValue
      //Mudança de estado:
      this.setState({ values })
    }
  }

  //Função que limpa a memória da nossa calculadora, o () é um parâmetro vazio:
  clearMemory = () => {
    //Clonando o nosso objeto inicialState e mudando o estado do App com ele:
    this.setState({ ...initiaLState })
  }

  //Função responsável por pegar qual operação será realizada:
  setOperation = operation => {
    if(this.state.current === 0){
      /*
        Se a ocorrência estive na posição do array current e algum botão de operção for clicado, o estado
        irá mudar, a operação vai ganhar seu símbolo, a ocorrencia passa para a posição 1 e o display será
        limpado.
      */
      this.setState({ operation, current: 1, clearDisplay: true })
    }else{
      const equals = operation === '='
      const values = [...this.state.values]
      //Tratamento de erro:
      try{
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      }catch(e){
        values[0] = this.state.values[0]
      }

      //Após ocorrer a operação, zerando elemento 1 de values:
      values[1] = 0
      //Setando valor do resultado da operação no display:
      this.setState({
        displayValue: `${values[0]}`,
        //Se operação for igual a = será setado o valor null, caso contrário será setado o símbolo.
        operation: equals ? null : operation,
        //Se operação for igaul será setado zero para a ocorrência, caso não será setado 1.
        current: equals ? 0 : 1,
        //Limpar display, toda vez que = for digitado ele limpará o diplay.
        clearDisplay: true,
        values,
      })
    }
  }

  //Renderização:
  render(){
    return(
      <View style={styles.container}>
        {/*
          Passando valor do display via props para nosso componente Button, o valor inicial de 
          displayValue é 0, portanto toda vez que o App for inicado irá começar com zero, a lógica do
          state = estado é que durante a execução o valor desse estado poderá ser alterado. 
        */}
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={this.setOperation} />
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='*' operation onClick={this.setOperation} />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' operation onClick={this.setOperation} />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='+' operation onClick={this.setOperation} />
          <Button label='0' double onClick={this.addDigit} />
          <Button label='.' operation onClick={this.addDigit} />
          <Button label='=' operation onClick={this.setOperation} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttons: {
    //Definindo a direção do flex box:
    flexDirection: 'row',
    //Querando a linha dos elementos contidos no flex-box:
    flexWrap: 'wrap',

  }
});
