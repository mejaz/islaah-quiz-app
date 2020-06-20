import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { DrawerItems } from 'react-navigation'
import { Font } from 'expo'

class DrawerContent extends React.Component {

  state = {
    fontLoaded: false,
  }

  componentDidMount = () => {
    Font.loadAsync({
      'open-sans-bold': require('../assets/fonts/OpenSans-Light.ttf')
    }).then(() => (
      this.setState({fontLoaded: true})
    ))
  }

  render() {
    return (
      <View>
        <View style={styles.drawer}>
          {this.state.fontLoaded 
            ? <Text style={{fontFamily: 'open-sans-bold', color: 'white', fontSize: 22 }}>
                Islaah - The Quiz App
              </Text>
            : null}
        </View>
        <DrawerItems {...this.props} />
      </View>
    )
  }
}

export default DrawerContent

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#630325',
    height: 140,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 5,
  }
})