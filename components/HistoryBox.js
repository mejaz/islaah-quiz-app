import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment'
import { mainBlack } from './Colors'

class HistoryBox extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			currentDate: new Date(),
		}
	}

	render() {
		const { topic, totalQ, correct, finalScore, mydate, mytime } = this.props
		console.log(mydate, mytime)
		const today = this.state.currentDate
		const day = moment(mydate).format('dddd')
		const date = moment(mydate).format('DD/MM/YYYY')
		const time = moment(mytime).format('LT')

		return (
			<View style={ styles.container }>
				<View style={ styles.date }>
					<Text style={styles.dateFont}>{ date }</Text>
					<Text style={styles.dateFont}>{ time }</Text>
				</View>
				<View style={ styles.bigRow }>
					<View style={styles.row}>
		        <View style={styles.rowStyle}><Text style={styles.scoreFont}>Topic</Text></View>
		        <View style={styles.rowStyle}><Text style={styles.scoreFont}> : { topic }</Text></View>
		      </View>
		      <View style={styles.row}>
		        <View style={styles.rowStyle}><Text style={styles.scoreFont}>Total Question</Text></View>
		        <View style={styles.rowStyle}><Text style={styles.scoreFont}> : { totalQ }</Text></View>
		      </View>
		      <View style={styles.row}>
		        <View style={styles.rowStyle}><Text style={styles.scoreFont}>Correct Answers</Text></View>
		        <View style={styles.rowStyle}><Text style={styles.scoreFont}> : { correct }</Text></View>
		      </View>
		      <View style={styles.row}>
		        <View style={styles.rowStyle}><Text style={styles.scoreFont}>Final Score</Text></View>
		        <View style={styles.rowStyle}><Text style={styles.scoreFont}> : { finalScore }</Text></View>
		      </View>
				</View>
			</View>
		)
	}
}

export default HistoryBox

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		marginBottom: 7,
		marginRight: 10,		
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: 'transparent', 
		backgroundColor: 'white',
		elevation: 5
	},
	date: {
		flex: 0.3,
		flexDirection: 'row',
		padding: 5,
		fontSize: 24,
		justifyContent: 'space-between'
	},
	bigRow: {
		paddingLeft: 5,
		flex: 0.7,
	},
	row: {
		flexDirection: 'row',
		alignSelf: 'stretch',
	},
	rowStyle: {
		flex: 1, 
		alignSelf: 'stretch'
	},
	dateFont: {
		color: '#d36586'
	},
	scoreFont: {
		alignSelf: 'stretch',
	}
})



