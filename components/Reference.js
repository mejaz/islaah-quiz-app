import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { 
	darkPink,
	mainBlack,
	backgroundGradientColor,
	backgroundGradientStart,
	backgroundGradientEnd
 } from './Colors'
import ShareRef from './ShareRef'

class Reference extends Component {
	render() {
		console.log("ref", this.props)
		return (
		  <LinearGradient
	      colors={backgroundGradientColor}
	      start={backgroundGradientStart}
	      end={backgroundGradientEnd}
	      style={{flex: 1, padding: 5, paddingTop: 5}}
	    >
				<ScrollView style={styles.container} showsVerticalScrollIndicator = {false}>
					<View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
						<ShareRef msg={this.props.navigation.state.params.reference} />
					</View>
					<Text style={styles.refText}>{this.props.navigation.state.params.reference}</Text>
					<TouchableOpacity 
						style={styles.goBackBtn}
						onPress={() => this.props.navigation.goBack()}
					>
						<Text style={styles.goBackBtnText}>Go Back</Text>
					</TouchableOpacity>
				</ScrollView>
			</LinearGradient>
		)
	}
}

export default Reference

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		marginBottom: 20,
	},
	refText: {
		fontSize: 18,
		fontFamily: 'raleway-regular',
		paddingBottom: 10,
	},
	goBackBtn: {
		alignSelf: 'flex-end',
		backgroundColor: darkPink,
		width: 100,
		margin: 2,
		padding: 10,
		borderRadius: 5,
	},	
	goBackBtnText: {
		fontSize: 14,
		fontWeight: 'bold',
		textAlign: 'center',
		color: mainBlack,
		fontFamily: 'raleway-regular',
	}
})