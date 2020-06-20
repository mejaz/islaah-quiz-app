import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, BackHandler, AsyncStorage } from 'react-native'
import { 
	darkPink,
	mainGreen, 
	mainBlack,
	backgroundGradientColor,
	backgroundGradientStart,
	backgroundGradientEnd
 } from './Colors'
import { 
	Entypo, 
	// FontAwesome, 
	// Foundation, 
	Ionicons,
	AntDesign,
	MaterialCommunityIcons,
	// EvilIcons,
} from '@expo/vector-icons'
import { ALL_STATS_KEY } from '../constants/Keys'
import { ALL_STATS_TEMPLATE } from '../constants/Templates'
import { LinearGradient } from 'expo-linear-gradient'

class Score extends Component {
	constructor(props) {
	    super(props)
	    this.state = { 
	    	topic: this.props.navigation.state.params.scoreData.title,
	    	totalQ: this.props.navigation.state.params.scoreData.totalQ,
	    	correct: this.props.navigation.state.params.scoreData.right,
	    	statsKey: ALL_STATS_KEY,
	    }
	    this.handleBackPress = this.handleBackPress.bind(this);
	}

	componentDidMount = () => {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	
		AsyncStorage.getItem(this.state.statsKey)
			.then((s) => {
				if (s === null) {
					
					console.log(this.state.statsKey + ' not found')

					let stats = ALL_STATS_TEMPLATE
					stats.totalScore = this.calculateScore()
					stats.totalQuestionsPlayed = this.state.totalQ
					stats.totalCorrect = this.state.correct

					let dateTime = new Date()

					let myTopicScore = {
						lastPlayedDate: dateTime,
						lastPlayedTime: dateTime,
						totalQuestionsPlayed: this.state.totalQ,
						totalCorrectAnswers: this.state.correct,
					}

					let myScoreHistory = {
						date: dateTime,
						time: dateTime,
						topic: this.state.topic,
						correct: this.state.correct,
						total: this.state.totalQ,
						score: this.calculateScore()
					}

					stats.topics[this.state.topic] = myTopicScore
					stats.lastTenStats.push(myScoreHistory)

					console.log(stats)

					// saving in the AsyncStorage
					AsyncStorage.setItem(this.state.statsKey, JSON.stringify(stats))

				} else {

					console.log(this.state.statsKey + ' found')
					console.log('***************')
					console.log(s)
					console.log('*****-----*****')
					console.log(JSON.parse(s))

					let stats = JSON.parse(s)
					// stats.totalScore = 0
					stats.totalScore += this.calculateScore()
					stats.totalQuestionsPlayed += this.state.totalQ
					stats.totalCorrect += this.state.correct

					let dateTime = new Date()

					// if topic not found in stats
					if(stats.topics[this.state.topic] !== undefined) {

						let myTopicScore = stats.topics[this.state.topic]
						myTopicScore.lastPlayedDate = dateTime
						myTopicScore.lastPlayedTime = dateTime
						myTopicScore.totalQuestionsPlayed += this.state.totalQ
						myTopicScore.totalCorrectAnswers += this.state.correct

						stats.topics[this.state.topic] = myTopicScore

					} else {

						let myTopicScore = {
							lastPlayedDate: dateTime,
							lastPlayedTime: dateTime,
							totalQuestionsPlayed: this.state.totalQ,
							totalCorrectAnswers: this.state.correct,
						}

						stats.topics[this.state.topic] = myTopicScore

					}

					let myScoreHistory = {
						date: dateTime,
						time: dateTime,
						topic: this.state.topic,
						correct: this.state.correct,
						total: this.state.totalQ,
						score: this.calculateScore()
					}

					// stats.lastTenStats.splice(0, stats.lastTenStats.length)


					if (stats.lastTenStats.length === 11) {
						stats.lastTenStats.shift()
						stats.lastTenStats.push(myScoreHistory)
					} else {
						stats.lastTenStats.push(myScoreHistory)
					}
					console.log(stats)

					// saving in the AsyncStorage
					AsyncStorage.setItem(this.state.statsKey, JSON.stringify(stats))

				}
			})

	}

	componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		console.log('going back')
		this.props.navigation.popToTop()
		return true
	}

	getPrize() {

		let score = this.calculateScore()

		if (score === 100) {
			return <MaterialCommunityIcons name='sunglasses' size={200} color={'gold'}/>
		} else if (score >= 84) {
			return <Ionicons name='ios-bowtie' size={200} color={'gold'}/>
		} else if (score >= 70) {
			return <AntDesign name='rest' size={200} color={'gold'}/>
		} else if (score >= 56) {
			return <Entypo name='aircraft-take-off' size={200} color={'gold'}/>
		} else if (score >= 40) {
			return <Ionicons name='ios-fitness' size={200} color={'gold'}/>
		} else if (score > 27) {
			return <MaterialCommunityIcons name='bowl' size={200} color={'gold'}/>
		} else if (score > 13) {
			return <Ionicons name='ios-fitness' size={200} color={'gold'}/>
		} else {
			return <MaterialCommunityIcons name='duck' size={200} color={'gold'}/>
		}

	}

	goToTopics = () => {
		console.log('going back')
		this.props.navigation.popToTop()
		// this.props.navigation.goBack('Topics')
	}

	calculateScore = () => {
		const { topic, totalQ, correct } = this.state
		return parseInt((correct * 100) / totalQ)
	}

	render() {
		const { topic, totalQ, correct } = this.state
		console.log(this.state.statsKey)
    return (
		  <LinearGradient
	      colors={backgroundGradientColor}
	      start={backgroundGradientStart}
	      end={backgroundGradientEnd}
	      style={{flex: 1, paddingTop: 20}}
	    >
	    	<View style={styles.container}>
	    		<View style={{flex: 0.8, justifyContent: 'space-between'}}>
			    	<View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
			    		{
								this.getPrize()
			    		}
			    	</View>
			    	<View>
				      <View style={styles.row}>
				        <View style={styles.rowStyle}><Text style={styles.topicFont}>Topic</Text></View>
				        <View style={styles.rowStyle}><Text style={styles.topicFont}> { topic }</Text></View>
				      </View>
				      <View style={styles.row}>
				        <View style={styles.rowStyle}><Text style={styles.dataFont}>Total Questions</Text></View>
				        <View style={styles.rowStyle}><Text style={styles.dataFont}> { totalQ }</Text></View>
				      </View>
				      <View style={styles.row}>
				        <View style={styles.rowStyle}><Text style={styles.dataFont}>Correct Answers</Text></View>
				        <View style={styles.rowStyle}><Text style={styles.dataFont}> { correct }</Text></View>
				      </View>
				      <View style={styles.row}>
				        <View style={styles.rowStyle}><Text style={styles.dataFont}>Final Score</Text></View>
				        <View style={styles.rowStyle}><Text style={styles.dataFont}> {
				        		this.calculateScore()
				        	}</Text>
				        </View>
				      </View>
			      </View>
		      </View>
		      <TouchableOpacity style={styles.backBtn} 
						onPress={() => this.goToTopics()} >
						<Text style={styles.backBtnText}>Back to Home</Text>
					</TouchableOpacity>	
	      </View>
      </LinearGradient>
		)
	}
}

export default Score

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection: 'column',
		justifyContent: 'space-between',
		// paddingBottom: 8,
		// alignItems: 'center',
		// alignContent: 'center',
		// justifyContent: 'center'
	},
	row: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		// paddingLeft: 30,
		// alignItems: 'center',
		// borderColor: 'red',
		// borderStyle: 'solid',
		// borderWidth: 1
	},
	rowStyle: {
		flex: 1, 
		alignSelf: 'stretch'
	},
	topicFont: {
		// flex: 1,
		alignSelf: 'center',
		fontSize: 24,
		color: 'orange',
		fontFamily: 'raleway-regular',
	},
	dataFont: {
		// flex: 1,
		alignSelf: 'center',
		fontSize: 18,
		fontFamily: 'raleway-regular',
	},
	backBtn: {
		width: '100%',
		padding: 12,
		backgroundColor: darkPink,
	},	
	backBtnText: {
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'raleway-regular',
		fontWeight: 'bold',
		color: mainBlack,
	}
})