import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

class NoBookmark extends Component {
	render() {
		return (			
			<View style={styles.sb}>
				<View>
					<MaterialCommunityIcons 
						name='bookmark' 
						size={200}
						color={'#e9f268'}
					/>
				</View>
				<View>
					<Text style={{fontSize: 24, textAlign: 'center'}}>No Bookmark to display.</Text>
				</View>
			</View>
		)
	}
}


let styles = StyleSheet.create({
	sb: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	}
})

export default NoBookmark