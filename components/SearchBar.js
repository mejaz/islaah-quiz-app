import React, { Component } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { searchGray } from './Colors'

class SearchBar extends Component {

	state = {
		searchText: "",
	}

	updateState = (t) => {


		const arr = this.props.allTopics
		console.log("topic arr", t)

		this.props.filterMethod(arr, t.trim())

		this.setState({
			searchText: t.trim()
		})

	}

	render() {
		// console.log(this.state.searchText)
		return (
			<View style={styles.container} >
				<FontAwesome name="search" size={25}/>
				<TextInput 
					placeholder={"Search Topics"}
					underlineColorAndroid= {'transparent'}
					style={{flex: 1, marginLeft: 10}}
					onChangeText={(t) => this.updateState(t)}
				/>
			</View>
		)
	}
}

export default SearchBar

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: searchGray,
		padding: 7,
		justifyContent: 'flex-start',
		// alignSelf: 'stretch'
	}
})