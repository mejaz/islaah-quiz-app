import React, { Component, createRef } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, BackHandler, Alert, AsyncStorage } from 'react-native'
import AlertAsync from "react-native-alert-async"
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import SnackBar from './SnackBar'
import { Font } from 'expo'
import { BOOKMARK_KEY } from '../constants/Keys'
import Timer from './Timer'
import { LinearGradient } from 'expo-linear-gradient'
import { 
	darkPink,
	mainBlack,
	backgroundGradientColor,
	backgroundGradientStart,
	backgroundGradientEnd
 } from './Colors'

class Questions extends Component{


	constructor(props) {
    super(props)
		this.state = {
			questions: [],
			index: 0,
			option0: ["", ""],
			option1: ["", ""],
			option2: ["", ""],
			option3: ["", ""],
			disabled: false,
			questionAnswered: false,
			fontLoaded: false,
			title: '',
			right: 0,
			wrong: 0,
			notAnswered: 0,
			optHeight: 0,
			optWidth: 0,
			randomQuestions: [],
			bookMarked: false,
			showSnackBar: false,
			bookmarkedQuestions: [],
		}
    this.handleBackPress = this.handleBackPress.bind(this);
    // this.showBookMarkAddUpdate = this.showBookMarkAddUpdate.bind(this);
	}


	componentDidMount() {
		console.log("pops", this.props)
		const { questions } = this.props
		const title = this.props.navigation.state.params.title
		const randomQuestions = this.getRandom(this.props.questions[title.toUpperCase()], 7)
		// let bookmarkedQuestions = this.props.navigation.state.params.bookmarkedQuestions

		// console.log(bookmarkedQuestions)

		Font.loadAsync({
			'nanum-mye-regular': require('../assets/fonts/NanumMyeongjo-Regular.ttf'),
			'kalam-regular': require('../assets/fonts/Kalam-Regular.ttf')
		}).then(() => (
			this.setState({
				fontLoaded: true,
			})
		))

		this.setState({
			questions: questions[title.toUpperCase()],
			title: title,
			randomQuestions: randomQuestions,
			bookmarkedQuestions: this.props.navigation.state.params.bookmarkedQuestions
		})

		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

	}

	componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	async handleBackPress() {
		console.log('going back')

		let ans =  await AlertAsync(
			'End Quiz Alert',
			'Do you want to end the quiz?',
			[{
				text: 'Cancel',
				onPress: () => false,
				style: 'cancel'
			}, {
				text: 'OK',
				onPress: () => true,
				// style: 'ok'
			}, {
				cancelable: false
			}]
		)

		if(ans === true) {
			console.log('canceling...')
			this.child.stopCounter()
			this.props.navigation.popToTop()
			return true
		} else {
			console.log('staying...')
			return false
		}
		
	}

	checkAnswer = (chosenOption, optNum, options) => {
		this.child.stopCounter()
		const { randomQuestions, index } = this.state
		const trimmedOptions = options.map((o) => o.trim())
		const answerIndex = trimmedOptions.indexOf(randomQuestions[index].answer)

		if (chosenOption === 'unanswered') {

			this.setState({
				["option" + answerIndex]: [0, "right"],
				disabled: true,
				questionAnswered: true,
				notAnswered: this.state.notAnswered + 1
			})

		} else if(chosenOption === randomQuestions[index].answer.trim()) {
			
			this.setState({
				["option" + optNum]: [0, "right"],
				disabled: true,
				questionAnswered: true,
				right: this.state.right + 1
			})

		} else {

			this.setState({
				["option" + optNum]: [1, "wrong"],
				["option" + answerIndex]: [0, 'right'],
				disabled: true,
				questionAnswered: true,
				wrong: this.state.wrong + 1
			})

		}
	}

	answerOnTimeUp = () => {
		alert("Time's Up!!")
		this.checkAnswer(
			'unanswered', 
			null, 
			this.state.randomQuestions[this.state.index].options.split("$")
		)
	}

	getRandom = (arr, n) => {
	    var result = new Array(n),
	        len = arr.length,
	        taken = new Array(len);
	    if (n > len)
	        throw new RangeError("getRandom: more elements taken than available");
	    while (n--) {
	        var x = Math.floor(Math.random() * len);
	        result[n] = arr[x in taken ? taken[x] : x];
	        taken[x] = --len in taken ? taken[len] : len;
	    }
	    return result;
	}

 	// ****** to do ********
	showBookMarkAddUpdate = (action) => {
		console.log('i am here!!')
		if (action === true) {
			this.setState({
				showSnackBar: true
			})
			setTimeout(() => 
				this.setState({
					showSnackBar: false
			}), 500)
		} 
		console.log(action)
	}	
	// toggleBookmark = (id, topic) => {
	// 	AsyncStorage.removeItem(BOOKMARK_KEY)
	// 	// let bm = this.state.bookMarked
	// 	// this.setState({
	// 	// 	bookMarked: !bm
	// 	// }, () => this.showBookMarkAddUpdate(!bm))

	// }

// on button press, takes topic, id, 
	toggleBookmark = (id, topic) => {
		let bmQ = this.state.bookmarkedQuestions
		console.log('bmQ --> ', bmQ)
		console.log("inside toggle - ", id + '  ' + topic)
		AsyncStorage.getItem(BOOKMARK_KEY)
			.then((bm) => {
				if (bm !== null) {
					let bmCopy = JSON.parse(bm)
					console.log(bmCopy)
					if (bmCopy.hasOwnProperty(topic)) {
						if( bmCopy[topic].includes(id) ) {

							bmCopy[topic].splice(bmCopy[topic].indexOf(id), 1)
							AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(bmCopy))
							.then((s) => {
								console.log('con1', JSON.parse(s))
								this.setState({
									bookmarkedQuestions: bmCopy[topic]
								})
							})

						} else {

							bmCopy[topic].push(id)
							AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(bmCopy))
							.then((s) => {
								console.log('con2', JSON.parse(s))
								this.setState({
									bookmarkedQuestions: bmCopy[topic]
								}, () => this.showBookMarkAddUpdate(true))
							})
						
						}

					} else {

						bmCopy[topic] = [] // empty array
						bmCopy[topic].push(id)
						AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(bmCopy))
						.then((s) => {
							console.log('con3', JSON.parse(s))
							this.setState({
									bookmarkedQuestions: bmCopy[topic]
								}, () => this.showBookMarkAddUpdate(true))
							})

					}

				} else {

					let bm = {}
					bm[topic] = []
					bm[topic].push(id)
					AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(bm))
					.then((s) => {
						console.log('con4', JSON.parse(s))
						this.setState({
							bookmarkedQuestions: bm[topic]
						}, () => this.showBookMarkAddUpdate(true))
					})
				}

			})
		}


	nextQuestion = () => {
		this.setState({
			index: this.state.index + 1,
			option0: ["", ""],
			option1: ["", ""],
			option2: ["", ""],
			option3: ["", ""],
			disabled: false,
			questionAnswered: false,
		})
	}

	displayScoreCard = (title, totalQ, right) => {
		this.props.navigation.navigate("Score", {
				scoreData: {
					title, 
					totalQ,
					right
				}})
	}

	showReference = (ref) => {
		this.props.navigation.navigate("Reference", {reference: ref})
	}

	render() {
		const { 
			randomQuestions, 
			index, 
			questionAnswered, 
			title, 
			right, wrong, bookmarkedQuestions } = this.state
		const questionObj = randomQuestions.length > 0 ? randomQuestions[index] : null
		const currentQuestion = questionObj !== null ? questionObj.question : null
		const options = questionObj !== null ? questionObj.options.split("$") : null
		

		return (
			randomQuestions.length > 0 && <View style={styles.container}>
				{ 
					this.state.fontLoaded 
						?	<LinearGradient
			          colors={[this.props.navigation.state.params.backgroundColor, this.props.navigation.state.params.backgroundColor]}
			          start={backgroundGradientStart}
			          end={backgroundGradientEnd}
			          style={{flex: 1, padding: 5}}
			        >
								<View style={
									{
										flex: 1,
										width: '100%',
										justifyContent: 'space-between',
										backgroundColor: this.props.navigation.state.params.backgroundColor,
									}
								}>
									<View style={styles.questionTopPart}>
										<View style={styles.topBar}>
											<View style={styles.clock}>
												<Feather name='clock' size={25} />
												<Timer 
													index={index + 1} 
													ref={instance => { this.child = instance }}
													answerOnTimeUp={this.answerOnTimeUp}
												/>
											</View>
											<View style={styles.questions}
											>
												<Feather name='layers' size={25}/>
												<Text 
													onPress={() => Alert.alert(
								          "Questions Counter",
								          parseInt(randomQuestions.length - index - 1) + " Questions To Go!"
								        )}
													style={styles.index}>{index + 1} / {randomQuestions.length}
												</Text>
												
											</View>
										</View>
										<View style={styles.questionDesign}>
											<Text style={styles.question}>{currentQuestion}</Text>
										</View>
									</View>
									<View style={styles.optionsContainer} >
										<View> 
											{ options.map((o, i) => 
												<TouchableOpacity 
													key={i} 
													style={[styles.optionButton, 
																	this.state["option" + i][0] === 0 ? {backgroundColor: "#42a845"} : "",
																	this.state["option" + i][1] === "wrong" ? {backgroundColor: "#cf503c"} : "",
																]} 
													onPress={() => this.checkAnswer(o.trim(), i, options)}
													disabled={this.state.disabled === true ? true : false}
													>
													<View 
														onLayout={event => {
															this.setState({
																optWidth: event.nativeEvent.layout.width,
																optHeight: event.nativeEvent.layout.height
															})
														}}
													>
														<Text style={ styles.optionText }>{o.trim()}</Text>
													</View>
												</TouchableOpacity>
												)
											}
											{ questionAnswered === true
												? <View style={{
														flexDirection: 'row', 
														justifyContent: "space-between",
														// backgroundColor: '#bbbbbd',
													}}>
														<View>
															{
																bookmarkedQuestions.includes(questionObj.id) === true
																	? <TouchableOpacity>
																			<MaterialCommunityIcons 
																				name='bookmark' 
																				size={35}
																				style={{paddingLeft: 5, paddingTop: 5}}
																				color={darkPink}
																				onPress={() => 
																					this.toggleBookmark(
																						questionObj.id, 
																						(this.props.navigation.state.params.title).toLowerCase()
																					)}
																			/>
																		</TouchableOpacity>
																	: <TouchableOpacity>
																			<MaterialCommunityIcons 
																				name='bookmark-outline' 
																				size={35}
																				style={{paddingLeft: 5, paddingTop: 5}}
																				onPress={() => 
																					this.toggleBookmark(
																						questionObj.id, 
																						(this.props.navigation.state.params.title).toLowerCase()
																					)}
																			/>
																		</TouchableOpacity>												
															}
														</View>
														<View style={{flexDirection: 'row', justifyContent: "flex-end"}}>
															<TouchableOpacity style={styles.nextBtn} 
																onPress={() => this.showReference(questionObj.description)} >
																<Text style={styles.nextBtnText}>Reference</Text>
															</TouchableOpacity>					

															{index !== randomQuestions.length - 1 
																? <TouchableOpacity style={styles.nextBtn} 
																	onPress={() => this.nextQuestion()} >
																	<Text style={styles.nextBtnText}>Next >></Text>
																</TouchableOpacity>
																: <TouchableOpacity style={styles.nextBtn} 
																	onPress={() => this.displayScoreCard(title, randomQuestions.length, right)} >
																	<Text style={styles.nextBtnText}>Finish >></Text>
																</TouchableOpacity>
															}
														</View>
												</View>
												: <View style={{flexDirection: 'row', justifyContent: "flex-end"}}>
														<TouchableOpacity style={[styles.nextBtn, {backgroundColor: this.props.navigation.state.params.backgroundColor}]}>
															<Text style={[styles.nextBtnText, {color: 'transparent'}]}>Place</Text>
														</TouchableOpacity>	
													</View>
											}
											{this.state.showSnackBar && <SnackBar />}
										</View>
									</View>
								</View>
							</LinearGradient>
						: null
				}
			</View>
		)
	}
}

function mapStateToProps({questions}) {
	return { questions: questions }
}

export default connect(mapStateToProps)(Questions)


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	questionTopPart: {
		flex: 0.5,
		justifyContent: 'space-between'
	},
	topBar: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	index: {
    fontSize: 18,
		paddingLeft: 10,
		paddingRight: 10,
		color: 'red',
		fontFamily: 'raleway-regular',
	},
	question: {
		paddingTop: 20,
		paddingLeft: 10,
		paddingRight: 10,
		textAlign: 'center',
		fontSize: 28,
		fontFamily: 'raleway-regular',
	},
	optionsContainer: {
		flex: 0.5,
		justifyContent: "flex-end",
		alignSelf: 'stretch',
	},
	optionButton: {
		alignSelf: 'stretch',
		backgroundColor: '#3d6dba',
		margin: 5,
		padding: 10,
		borderRadius: 5,
	},
	optionText: {
		fontSize: 16,
		textAlign: 'center',
		color: 'white',
		fontFamily: 'raleway-regular',
	},
	nextBtn: {
		alignSelf: 'flex-end',
		backgroundColor: darkPink,
		width: 100,
		margin: 2,
		padding: 10,
		borderRadius: 5,
	},	
	nextBtnText: {
		fontSize: 14,
		textAlign: 'center',
		fontWeight: 'bold',
		color: mainBlack,
		fontFamily: 'nanum-mye-regular'
	},
	clock: {
		flex: 1, 
		flexDirection: 'row',  
		justifyContent: 'flex-start',
		paddingLeft: 5,
	},
	questions: {
		flex: 1, 
		flexDirection: 'row',  
		justifyContent: 'flex-end',
		paddingRight: 5,
	},
	questionDesign: {
		flex: 0.9, 
		justifyContent: 'center', 
		alignItems: 'center',
	}


})


