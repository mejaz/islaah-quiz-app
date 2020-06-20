import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      counter: 30,
      counterRunning: false,
      index: 1,
    } 
  }

  stopCounter = () => {
    this.setState({
      counterRunning: false,
    })
  }

  contaTempo = () => {
    console.log('in func')

    let myInterval = setInterval(() => {
      if (this.state.counterRunning) {
        if (this.state.counter <= 0 ) {
          console.log('in if')
          clearInterval(myInterval)
          this.props.answerOnTimeUp()
          this.setState({
            counterRunning: false,
          })
        } else {
          console.log('in else')
          this.setState({
            counterRunning: true,
            counter: this.state.counter - 1,
          })
        }
      } else if (!this.state.counterRunning) {
          clearInterval(myInterval)
      }
      
    }, 1000)

  } 

  resetCounter = () => {
    console.log('rest cntr')
    if (this.state.index + 1 === this.props.index) {
      this.setState({
        counterRunning: true,
        index: this.props.index,
        counter: 30
      }, () => {
        this.contaTempo(null)
      })
    }
  }

  componentDidMount = () => {
    this.setState({
      counterRunning: true,
    }, () => {
      this.contaTempo(null)
    })
    
  }  

  componentDidUpdate = () => {
    this.resetCounter()
  } 

  render() {
    console.log(this.props.index)
    console.log(this.state.index)
    return (
      <Text 
        style={styles.index}
        onPress={() => Alert.alert(
          "Poker!!",
          "Don't Poke Me!",
        )}
        >
        {
          this.state.counter > 0
          ? this.state.counter > 9 
            ? "00:" + this.state.counter
            : "00:0" + this.state.counter
          : "Time's Up!!"
        }
      </Text>
    )
  }
}

export default Timer

const styles = StyleSheet.create({
  index: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
    // textAlign: 'right',
    fontSize: 18,
    paddingLeft: 10,
    // paddingRight: 10,
    color: 'red',
    fontFamily: 'raleway-regular',
  }
})