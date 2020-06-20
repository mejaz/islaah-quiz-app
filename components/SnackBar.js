import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class SnackBar extends Component {
	render() {
		return (			
			<View style={styles.sb}>
				<View style={styles.innersb}>
					<Text style={{textAlign: 'center', fontSize: 18}}>
						Bookmarked!!
					</Text>
				</View>
			</View>
		)
	}
}


let styles = StyleSheet.create({
	sb: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',

		top: '60%',
		width: '100%',
		height: '15%',
		position: 'absolute',

	},
	innersb: {
		width: '60%',
		height: '100%',
		justifyContent: 'center',
		opacity: 0.7,
		backgroundColor: '#bab9b8',
		borderRadius: 50,
	}
})

export default SnackBar