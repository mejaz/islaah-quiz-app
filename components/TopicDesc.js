import React, { Component } from 'react'
import { 
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, Alert, ScrollView, AsyncStorage } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'	
import { 
	darkPink,
	mainGreen, 
	mainBlack,
	backgroundGradientColor,
	backgroundGradientStart,
	backgroundGradientEnd
 } from './Colors'

class TopicDesc extends Component {

	state = {
		backgroundColor: 'transparent',
		bookmarkedQuestions: []
	}

	componentDidMount = () => {
		AsyncStorage.getItem('bookmark')
		.then((mybm) => {
			if (mybm !== null) {
				let bm = JSON.parse(mybm)
				let topic = (this.props.navigation.state.params.title).toLowerCase()

				console.log('bm found!')
				console.log(bm)
				console.log(topic)

				if (bm.hasOwnProperty(topic)) {
					this.setState({
						bookmarkedQuestions: bm[topic],
						backgroundColor: this.props.navigation.state.params.color
					})
				} else {
					console.log('topic NOT found!')
					this.setState({
						backgroundColor: this.props.navigation.state.params.color
					})
				}
			} else {
				console.log('bm NOT found!')
				this.setState({
					backgroundColor: this.props.navigation.state.params.color
				})
			}
		})
	}

	render () {
		return (
			<LinearGradient
        colors={[this.props.navigation.state.params.color, this.props.navigation.state.params.color]}
        start={backgroundGradientStart}
        end={backgroundGradientEnd}
        style={{flex: 1, paddingTop: 20}}
      >				
				<View style={
					{
						flex: 1, 
						justifyContent: 'space-between',
						backgroundColor: 'transparent',
					}
				}>		
					<ScrollView showsVerticalScrollIndicator = {false}>
						<Text style={styles.topic}>{this.props.navigation.state.params.title}</Text>
						<Text style={styles.desc}>{this.props.navigation.state.params.desc}</Text>
					</ScrollView>
					<TouchableOpacity 
						onPress={() => 
							this.props.navigation.navigate(
								'Questions', 
								{
									title: this.props.navigation.state.params.title,
									backgroundColor: this.props.navigation.state.params.color,
									bookmarkedQuestions: this.state.bookmarkedQuestions,
								}
							)
						}
					>
						<View style={styles.startbtn}>
							<Text style={styles.startBtnText}>Start Quiz</Text>
						</View>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		)
	}

}


export default TopicDesc

const styles = StyleSheet.create({
	topic: {
		fontSize: 28,
		alignSelf: 'center',
		padding: 5,
		margin: 5,
		fontFamily: 'raleway-regular',
	},
	desc: {
		fontSize: 22,
		padding: 8,
		margin: 5,
		fontFamily: 'raleway-regular',
	},
	startbtn: {
		width: '100%',
		padding: 12,
		backgroundColor: darkPink,
	},
	startBtnText: {
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'raleway-regular',
		fontWeight: 'bold',
		color: mainBlack,
	},
	modalCntDwn: {
		flex: 0.2,
		marginTop: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'yellow'
	},
	modalCntDwnText: {
		fontSize: 64,
		color: 'red'
	}
})




