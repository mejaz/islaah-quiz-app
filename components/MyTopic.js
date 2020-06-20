import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo, SimpleLineIcons } from '@expo/vector-icons'
import { Font } from 'expo'
import { 
	blue, 
	green, 
	purple, 
	yellow, 
	orange, 
	pink,
	white,
	mainBlack
} from './Colors'

class MyTopic extends Component{

	state = {
		fontLoaded: false,
	}

	componentDidMount() {
		Font.loadAsync({
			'raleway-semibold': require('../assets/fonts/Raleway-SemiBold.ttf'),
			'raleway-regular': require('../assets/fonts/Raleway-Regular.ttf')
		}).then(() => (
			this.setState({
				fontLoaded: true,
			})
		))
	}

	render() {
		const {topic, topicSummary, index, info } = this.props
		const colorsArr = ['#efe9d7', '#f2e1f4', '#e1e9f7']


		console.log("mytopics", this.props)
		console.log('info.q', info.q)

		return (
				this.state.fontLoaded
				? <TouchableOpacity 
						style={[styles.container, {backgroundColor: colorsArr[index % colorsArr.length]}]}
						
						onPress={() => this.props.navigation.navigate(
							'TopicDesc', 
								{
									title: info.title, 
									desc: topicSummary,
									color: colorsArr[index % colorsArr.length]
								})}
					>
						<View style={{flex: 1, flexDirection: 'row'}}>
							<SimpleLineIcons name='notebook' size={25} color={mainBlack}/>
							<View style={styles.topic}>
								<Text style={styles.topicText}>{topic}</Text>
							</View>
						</View>
						<SimpleLineIcons name="arrow-right" size={25} color={mainBlack}/>
					</TouchableOpacity>
				: null
		)
	}
}

export default MyTopic

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between',
		margin: 5,
		marginBottom: 3,
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'transparent',
		borderStyle: 'solid',
		elevation: 5
	},
	topic: {
		marginLeft: 10
	},
	topicText: {
		fontSize: 18,
		color: mainBlack,
		fontFamily: 'raleway-semibold',
	},
	topicDesc: {
		fontSize: 16,
		color: mainBlack,
		fontFamily: 'raleway-regular',
	}
})