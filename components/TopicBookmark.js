import React, { Component } from 'react'
import { View, 
	Text, 
	ScrollView, 
	AsyncStorage, StyleSheet, TouchableOpacity, Share } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { QUESTIONS_KEY, BOOKMARK_KEY } from '../constants/Keys'
import { 
	backgroundGradientColor,
	backgroundGradientStart,
	backgroundGradientEnd,
	mainBlack,
	darkPink
 } from './Colors'
import ShareRef from './ShareRef'

class TopicBookmark extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    	bmQuestions: [],
    	index: 0,
    	bms: []
    } 
  } 	

	componentDidMount = () => {
		this.subs = this.props.navigation.addListener("didFocus", () => {
			this.generateBmQuestions()
		})
	}

	generateBmQuestions = () => {
		let title = this.props.navigation.state.params.title
		let bms = this.props.navigation.state.params.bm
		let bmQues = []

		AsyncStorage.getItem(QUESTIONS_KEY)
		.then((q) => {

			let allQues = JSON.parse(q)
			// console.log('allQues', allQues)
			let myTopicQues = allQues[title.toUpperCase()]

			console.log('bms - ', bms)
			// console.log('myTopicQues - ', myTopicQues)
			bms.map((id) => {
				console.log(id)
				myTopicQues.map((q) => {
					if (id === q.id) {
						console.log('found!!')
						bmQues.push(q)
					}
				})
			})

			this.setState({
				bmQuestions: bmQues,
				bms: this.props.navigation.state.params.bm,
				title: this.props.navigation.state.params.title
			})

		})		
	}

	componentWillUnmount() {
    this.subs.remove()
  }	

	deleteBookmark = (index, id) => {

		let title = this.props.navigation.state.params.title
		let currentBookmarksIndices = this.state.bms
		let bmQuestions = this.state.bmQuestions

		if (bmQuestions.length >= 2) {

			if (index === 0) {

				// index should not be changed

				console.log("******* index 0 and length > 2 *******")

				// let newBmQuestions = bmQuestions.splice(
				// 	bmQuestions.indexOf(index), 1)

				let newBmQuestions = bmQuestions.filter((t) => t !== bmQuestions[index])

				let newBookmarksIndices = 
					currentBookmarksIndices.filter((t) => t !== id)				

				AsyncStorage.getItem(BOOKMARK_KEY)
				.then((q) => {
					let allQues = JSON.parse(q)

					console.log("****------*****------*****")
					console.log('currentIndices', allQues[title])

					allQues[title] = newBookmarksIndices

					console.log('newIndices', allQues[title])

					AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(allQues))
					.then(() => { 
						console.log('bookmarks updated!!')

						this.setState({
							bmQuestions: newBmQuestions,
							bms: newBookmarksIndices
						})

					})
				})


			} else if (index === currentBookmarksIndices.length - 1) {

				// index should be reduced by 1

				console.log("******* index length and length > 2 *******")

				let newBmQuestions = bmQuestions.filter((t) => t !== bmQuestions[index])

				let newBookmarksIndices = 
					currentBookmarksIndices.filter((t) => t !== id)

				let newIndex = index - 1

				AsyncStorage.getItem(BOOKMARK_KEY)
				.then((q) => {
					let allQues = JSON.parse(q)

					console.log("****------*****------*****")
					console.log('currentIndices', allQues[title])

					allQues[title] = newBookmarksIndices

					console.log('newIndices', allQues[title])

					AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(allQues))
					.then(() => { 
						console.log('bookmarks updated!!')

						this.setState({
							bmQuestions: newBmQuestions,
							bms: newBookmarksIndices,
							index: newIndex,
						})

					})
				})

			} else {

				// index should not be changed

				console.log("******* index b/w length and length > 2 *******")

				let newBmQuestions = bmQuestions.filter((t) => t !== bmQuestions[index])

				// let newBookmarksIndices = 
				// 	currentBookmarksIndices.splice(
				// 		currentBookmarksIndices.indexOf(id), 1)

				let newBookmarksIndices = 
					currentBookmarksIndices.filter((t) => t !== id)

				// let newIndex = index - 1

				AsyncStorage.getItem(BOOKMARK_KEY)
				.then((q) => {
					let allQues = JSON.parse(q)

					console.log("****------*****------*****")
					console.log('currentIndices', allQues[title])

					allQues[title] = newBookmarksIndices

					console.log('newIndices', allQues[title])

					AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(allQues))
					.then(() => { 
						console.log('bookmarks updated!!')

						this.setState({
							bmQuestions: newBmQuestions,
							bms: newBookmarksIndices,
						})

					})
				})

			}


		} else {

			let newBookmarksIndices = 
				currentBookmarksIndices.filter((t) => t !== id)
			// let allQues = {}

			AsyncStorage.getItem(BOOKMARK_KEY)
			.then((q) => {
				let allQues = JSON.parse(q)

				console.log("****------*****------*****")
				console.log('currentIndices', allQues[title])

				allQues[title] = newBookmarksIndices

				console.log('newIndices', allQues[title])
				
				// delete that topic from the dictionary
				delete allQues[title]
				console.log('topic deleted')

				console.log('allues', allQues)				

				AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(allQues))
				.then(() => { 
					console.log('bookmarks updated!!')
					this.props.navigation.goBack()
				})
			})
		}
	}

  nextBookmark = () => {
  	let i = this.state.index
  	if (i < this.state.bmQuestions.length - 1) {
  		this.setState({
  			index: i + 1
  		})
  	}
  }

  previousBookmark = () => {
  	let i = this.state.index
  	if (i > 0) {
  		this.setState({
  			index: i - 1
  		})
  	}  	
  }

	render() {
		let { bmQuestions, index } = this.state
		return (
			<View style={{flex: 1}}>
				<LinearGradient
	        colors={backgroundGradientColor}
	        start={backgroundGradientStart}
	        end={backgroundGradientEnd}
	        style={{flex: 1, padding: 10, paddingTop: 20}}
	      >					
					<ScrollView 
						showsVerticalScrollIndicator = {false} 
					>		
						{ bmQuestions.length > 0 && 

						<View>
							<View style={styles.sectionBox}>
								<Text style={styles.sectionTopic}>Question</Text>
								<Text style={styles.question}>
									{bmQuestions[index].question}
								</Text>
							</View>
							<View style={styles.sectionBox}>
								<Text style={styles.sectionTopic}>Options</Text>
								<Text style={styles.options}>
									{
										bmQuestions[index].options
										.split('$').map((o, i) => {
											
											return o === bmQuestions[index].answer
												?  <Text key={i} style={{color: 'green'}}>{o + "\n"}</Text>
												:  <Text key={i}
												>{o + "\n"}</Text>

										})
									}
								</Text>
							</View>
							<View style={styles.sectionBox}>
								<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
									<Text style={styles.sectionTopic}>Reference</Text>
										<ShareRef 
											msg={bmQuestions[index].description}
										/>
								</View>
								<Text style={styles.description}>
									{bmQuestions[index].description}
								</Text>
							</View>
						</View>

						}
					</ScrollView>		
				</LinearGradient>
				<View style={styles.navigatorBar}>
					<View style={styles.navigator}>
						<TouchableOpacity>
							<AntDesign 
								name='delete' 
								size={40} 
								color={mainBlack} 
								style={{ margin: 5, padding: 5 }} 
								onPress={() => this.deleteBookmark(index, bmQuestions[index].id)} />
						</TouchableOpacity>	
						<View style={{flexDirection: 'row'}}>				
							<TouchableOpacity>
								<AntDesign 
									name='arrowleft' 
									size={40} 
									color={mainBlack} 
									style={{ margin: 5, padding: 5 }} 
									onPress={() => this.previousBookmark()} />
							</TouchableOpacity>
							<TouchableOpacity>
								<AntDesign 
									name='arrowright' 
									size={40} 
									color={mainBlack} 
									style={{ margin: 5, padding: 5 }} 
									onPress={() => this.nextBookmark()} />
							</TouchableOpacity>
						</View>
					</View>
				</View>		
			</View>			
		)
	}
}

export default TopicBookmark

const styles = StyleSheet.create({
	navigatorBar: { 
		margin: 0,
		flex: 1, 
		position: 'absolute', 
		top: '90%', 
		height: '10%',
		width: '100%',
		backgroundColor: darkPink,
		// borderStyle: 'solid',
		// borderColor: 'black',
		// borderWidth: 1,
		// alignItems: 'center'

	},
	navigator: {
		// flex: 1, 
		// width: '100%',
		flexDirection: 'row', 
		justifyContent: 'space-between',
		paddingLeft: 3,
		paddingRight: 3
	},
	question: {
		fontSize: 24,
		color: '#f571d8',
		padding: 8,
	},
	options: {
		fontSize: 18,
		padding: 8,
	},
	answer: {
		fontSize: 18,
		color: '#3b53cc',
		padding: 8,
	},
	description: {
		fontSize: 18,
		color: '#3d3d3d',
		padding: 8,
		paddingBottom: 100
	},
	sectionBox: {
		borderWidth: 2,
		borderColor: '#d8e2f2',
		borderStyle: 'solid'
	},
	sectionTopic: {
		paddingLeft: 5,
		paddingTop: 5,
		color: '#bebfc2',
		fontSize: 16,
	}
})