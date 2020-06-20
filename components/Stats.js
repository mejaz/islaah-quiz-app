import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native'
import HistoryBox from './HistoryBox'
import { ALL_STATS_KEY } from '../constants/Keys'
import { LinearGradient } from 'expo-linear-gradient'
import { Font } from 'expo'
import { 
	backgroundGradientColor,
	backgroundGradientStart,
	backgroundGradientEnd
 } from './Colors'

class Stats extends Component {

	constructor(props) {
	    super(props)
	    this.state = {
	    	hasStats: false,
	    	isFocused: false,
	    	allStatsJSON: {
	    		totalScore: 0,
	    		lastTenStats: []
	    	},
	    }
  }

	componentDidMount = () => {
		this.subs = this.props.navigation.addListener("didFocus", () => {
    console.log('in comp did mount')
		AsyncStorage.getItem(ALL_STATS_KEY)
			.then((s) => {
				if(s !== null) {
					this.setState({
						hasStats: true,
						allStatsJSON: JSON.parse(s)
					})
				} else {
					this.setState({
						hasStats: true,
					})
				} 
			})
		})
	}

	componentWillUnmount() {
    this.subs.remove()
  }

	render() {
		const totalScore = this.state.allStatsJSON.totalScore
		const historyList = this.state.allStatsJSON.lastTenStats.slice().reverse()
		console.log('--------')
		console.log(this.state.allStatsJSON)
		console.log(historyList)

		return (
	    <LinearGradient
	      colors={backgroundGradientColor}
	      start={backgroundGradientStart}
	      end={backgroundGradientEnd}
	      style={{flex: 1, padding: 5, paddingTop: 20}}
	    >			
				<View style={styles.container}>
				{ this.state.hasStats === true
					? this.state.allStatsJSON.lastTenStats.length === 0
						? <View style={{flex: 1, justifyContent: 'flex-start'}}>
								<View style={{flex: 0.1}}>
									<Text style={styles.totalScore}>Total Score : 0</Text>
								</View>
								<View style={{flex: 0.9}}>
									<Text style={styles.noData}>Looks Like You Haven't Played Any Quiz Yet!</Text>
								</View>
							</View>
							
						:	<View style={{flex: 1, justifyContent: 'flex-start'}}>
								<View style={{flex: 0.1}}>
									<Text style={styles.totalScore}>Total Score : { totalScore }</Text>
								</View>
								<View style={{flex: 0.9}}>
									<Text style={{paddingBottom: 15}}>Last 10 scores:</Text>
									<ScrollView showsVerticalScrollIndicator = {false}>
											
										{ historyList.map((l, i) => 
											<HistoryBox 
												key = { i }
												topic = { l.topic }
												totalQ = { l.total }
												finalScore = { l.score }
												correct = { l.correct }
												mydate = { l.date }
												mytime = { l.time }
											/>
											)
										}
									
									</ScrollView>
								</View>
							</View>
					: <ActivityIndicator
				 			style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} 
				 			size="large" 
				 			color="#0000ff" 
				 		/>
				}
				</View>
			</LinearGradient>
		)
	}
}

export default Stats

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		paddingRight: 0,
		marginBottom: 10,
	},
	totalScore: {
		fontSize: 20,
		// paddingBottom: 10,
	},
	noData: {
		fontSize: 24,
		color: '#f49b42',
		textAlign: 'center'
	}
})




