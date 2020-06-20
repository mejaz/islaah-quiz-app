import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native'

class Biscuit extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    } 
  } 

  render() {
    const colorsArr = ['#efe9d7', '#f2e1f4', '#e1e9f7']
    const borderColorsArr = ['#fce49d', '#f3c0fa', '#b6cefa']
    return (
      <View style={[styles.mybis, {
          backgroundColor: colorsArr[this.props.index % colorsArr.length],
          borderColor: borderColorsArr[this.props.index % borderColorsArr.length]
          }
        ]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'TopicBookmark', 
              {
                title: this.props.title, 
                bm: this.props.bms
              }
            )
          }
        >
          <View style={{height: 0, paddingBottom: '100%'}}>
            <Text style={styles.title}>{this.props.title.toUpperCase()}</Text>
            <Text style={styles.count}>{"(" + this.props.bms.length + ")"}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Biscuit

const styles = StyleSheet.create({
  mybis: {
    // flex: 1,
    width: '42%',
    // backgroundColor: '#b8c2f9',
    margin: 6,
    borderRadius: 22,
    borderStyle: 'solid',
    borderWidth: 1,
    elevation: 5
    // borderColor: 'blue'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  title: {
    fontSize: 20,
    paddingTop: '30%',
    textAlign: 'center'
  },
  count: {
    fontSize: 18,
    textAlign: 'center'
  }
})



