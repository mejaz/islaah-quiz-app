import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Splash extends Component {
	render() {
		return (
			<View style={styles.loading}>
				<Text style={{fontSize: 30}} >Loading...</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#3B3B98',
	}
})

export default Splash