import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'

class HeaderHome extends Component {
	render() {
	  return (
	    <View style={styles.container}>
	      <Text style={{fontSize: 20, color: '#000c0c', paddingLeft: 10}}>Islaah</Text>
	      {/*<Entypo name="menu" size={25} style={{color: '#aaa'}} onPress={() => this.props.navigation.navigate('DrawerOpen')}/> */}
	      <Entypo name="menu" size={35} style={{color: '#000c0c'}} onPress={() => this.props.navigation.toggleDrawer()}/>
	    </View>
	  )
	}
}

export default HeaderHome

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		flexDirection: 'row', 
		justifyContent: 'space-between',
		color: '#000c0c',
		padding: 5,
	}
})