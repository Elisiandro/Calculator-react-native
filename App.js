import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import Button from "./src/components/Button"
import Display from "./src/components/Display"
import { TrackingConfigurations } from 'expo/build/AR'


const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default class App extends Component {

  state = { ...initialState }

  addDigit = n => {
    
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

    if (n === '.'&& !clearDisplay  && this.state.displayValue.includes('.')) {
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n

    this.setState({ displayValue, clearDisplay: false })

    if (n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]

      values[this.state.current] = newValue
      this.setState({ values: values })
    }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    }
    else {
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        const comando = `${values[0]} ${this.state.operation} ${values[1]}`
        console.log(comando)
        values[0] = eval(comando)

      }
      catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values: values
      })
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue}></Display>
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory}></Button>
          <Button label='/' operation onClick={this.setOperation}></Button>
          <Button label='7' onClick={this.addDigit} ></Button>
          <Button label='8' onClick={this.addDigit} ></Button>
          <Button label='9' onClick={this.addDigit} ></Button>
          <Button label='*' operation onClick={this.setOperation}></Button>
          <Button label='4' onClick={this.addDigit} ></Button>
          <Button label='5' onClick={this.addDigit} ></Button>
          <Button label='6' onClick={this.addDigit} ></Button>
          <Button label='-' operation onClick={this.setOperation}></Button>
          <Button label='1' onClick={this.addDigit} ></Button>
          <Button label='2' onClick={(this.addDigit)} ></Button>
          <Button label='3' onClick={this.addDigit} ></Button>
          <Button label='+' operation onClick={this.setOperation}></Button>
          <Button label='0' double onClick={this.addDigit} ></Button>
          <Button label='.' onClick={this.addDigit} ></Button>
          <Button label='=' operation onClick={this.setOperation}></Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  buttons:
  {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }

  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
