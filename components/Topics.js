import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { AsyncStorage } from 'react-native'
import { 
	StyleSheet, 
	Text, 
	View, 
	TouchableOpacity, 
	ScrollView, 
	Alert, 
	ActivityIndicator,
	KeyboardAvoidingView,
	NetInfo
} from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'
import * as api from '../utils/api'
import { List, ListItem, Button, Avatar } from 'react-native-elements'
import Splash from './Splash'
import { addTopicsToStore, addQuestionsToStore } from '../actions'
import MyTopic from './MyTopic'
import { LinearGradient } from 'expo-linear-gradient'
import SearchBar from './SearchBar'
import escapeRegExp from 'escape-string-regexp'
import { CATEGORIES_KEY, QUESTIONS_KEY } from '../constants/Keys'
import { 
	mainBlack,
	backgroundGradientColor,
	backgroundGradientStart,
	backgroundGradientEnd
 } from './Colors'

class Topics extends Component {

	state = {
		filteredTopics: [],
		hasResponse: false,
	}

	componentDidMount = () => {

		this.subs = this.props.navigation.addListener("didFocus", () => {

			NetInfo.isConnected.fetch().then(isConnected => {
				// alert(isConnected ? 'online' : 'offline')

				if (isConnected) {
					// if the internet is connected
					api.getTopics()
					.then((response) => {
						if (response.sts === 'success') { // ** backend is up!! **
							// push to store --> DONE!
							const { dispatch } = this.props
							const topics = response.response["categories"]
							topics.map((t) => dispatch(addTopicsToStore({topics: t})))
							this.setState({
								filteredTopics: topics,
								hasResponse: true,
							})

							// push to AsyncStorage
							// -- TO DO --
							AsyncStorage.setItem(
								CATEGORIES_KEY, JSON.stringify(response.response["categories"])
							)

						} else { 
							let storedTopics = AsyncStorage.getItem(CATEGORIES_KEY)
							storedTopics.then((response) => {
								const topics = JSON.parse(response)
								topics.map((t) => 
									this.props.dispatch(addTopicsToStore({topics: t}))
								)
								this.setState({
									filteredTopics: topics,
									hasResponse: true,
								})
							})
						}
					}) 
					.then(() => api.getAllQuestions()).then((response) => {
						if (response.sts === 'success') { // ** backend is up!! **
							this.props.dispatch(
								addQuestionsToStore({ 
									questions: response.response["questions"] 
								})
							)
							
							AsyncStorage.setItem(
								QUESTIONS_KEY, JSON.stringify(response.response["questions"])
							)
							

						} else { 
							let storedQuestions = AsyncStorage.getItem(QUESTIONS_KEY)
							storedQuestions.then((response) => {
								this.props.dispatch(
									addQuestionsToStore({ 
										questions: JSON.parse(response)
									})
								)
							})
							
						}
					})
				} else {

					let storedTopics = AsyncStorage.getItem(CATEGORIES_KEY)
					storedTopics.then((response) => {
						const topics = JSON.parse(response)
						topics.map((t) => 
							this.props.dispatch(addTopicsToStore({topics: t}))
						)
						this.setState({
							filteredTopics: topics,
							hasResponse: true,
						})
					})

					let storedQuestions = AsyncStorage.getItem(QUESTIONS_KEY)
					storedQuestions.then((response) => {
						this.props.dispatch(
							addQuestionsToStore({ 
								questions: JSON.parse(response)
							})
						)
					})
				}
			})
		})
	}

	componentWillUnmount() {
    this.subs.remove()
  }

	filterSearches = (listOfTopics, userChosenTopic) => {
		let filteredTopics

		if (userChosenTopic !== "") {
			const match = new RegExp(escapeRegExp(userChosenTopic), "i")
			filteredTopics = listOfTopics.filter((topics) => (
				match.test(topics.name)
			))

			this.setState({
				filteredTopics: filteredTopics,
			})

		} else {
			const {arr} = this.props
			this.setState({
				filteredTopics: this.props.arr,
			})
		}
	}

	render() {
		// console.log("from store", this.props)
		const { arr } = this.props
		const { filteredTopics } = this.state
		// const searchedTopics = this.filterSearches(arr)
		// const { arr } = this.state 
		// console.log("arr", JSON.stringify(arr))

		return (
			<View style={styles.container}>
				<LinearGradient
          colors={backgroundGradientColor}
          start={backgroundGradientStart}
          end={backgroundGradientEnd}
          style={{flex: 1, padding: 5}}
        >
					<SearchBar 
						filterMethod={this.filterSearches}
						allTopics={arr}
					/>
					<ScrollView showsVerticalScrollIndicator = {false}>
						{
							this.state.hasResponse === true
							?	arr.length > 0
								 ? 	<KeyboardAvoidingView
								 			behavior="padding"
								 		>
									 		{filteredTopics.map((t, i) => 
									 			<MyTopic 
									 				topic={t.name}
									 				key={i}
									 				topicSummary={t.description}
									 				index={i}
									 				info={{ q: "Questions", title: t.name }}
									 				navigation={this.props.navigation}
									 			/>
									 		)}
								 		</KeyboardAvoidingView>
								 	: <Text>No Questions Returned. Please Try After Sometime.</Text>

					    : <ActivityIndicator
						 			style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} 
						 			size="large" 
						 			color={mainBlack} 
					 		  />
						}
					</ScrollView>
				</LinearGradient>
			</View>
		)
	}
}

function mapStateToProps({topics}) {
	const arr = []
	console.log("json", JSON.stringify(topics))
	for(key in topics) {
		if (topics.hasOwnProperty(key)) {
			arr.push(topics[key])
		}
	}

	return { arr: arr }
}

export default connect(mapStateToProps)(Topics)



const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
		backgroundColor: 'transparent', 
	},
	eachTopic: {
		flexDirection: 'row',
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: 'transparent', 
		width: 300,
		height: 50,
		padding: 5,
		margin: 2,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	topicIcon: {
		paddingLeft: 10,
	},

})