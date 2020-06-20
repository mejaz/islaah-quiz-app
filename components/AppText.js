import React, { Component } from 'react'
import { Text, StyleSheet, Platform } from 'react-native'

class AppText extends Component {
	render() {
		const { text } = this.props
		return (
			<Text style={styles.txt} >{text}</Text>
		)
	}
}

export default AppText

const styles = StyleSheet.create({
	txt: {
		...Platform.select({
			ios: {
				fontFamily: 'Arial',
				fontSize: 18,
			},
			android: {
				fontFamily: 'Roboto',
				fontSize: 18,				
			}
		})
	}
})