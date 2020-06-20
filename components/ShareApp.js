import React, { Component } from 'react'
import { Share, Text, View, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'

class ShareApp extends Component {

  share = () => {

  	let ref = `Assalamualaikum Warahmatullahi Wabarakatuh.\n\nFollow the link below to install the islamic quiz app from Google Play. I found it knowledgeable, Insha Allah you will also learn a lot.`
  	let islaahUrl = "https://play.google.com/store/apps/details?id=com.islaah.islaah&hl=en_US"
  	let appName = "Islaah - The Islamic Quiz App"

	  Share.share({
	    message: `\n${ref} \n\n ${appName} \n\n ${islaahUrl}`,
	    title: 'Islaah - App Share'
	  }, {
	    // Android only:
	    dialogTitle: 'Islaah - App Share',
	  })
  }	

	render() {
		return (
			<View>
				<Entypo 
					name='share' 
					size={30} 
					style={{padding: 5}}
					onPress={() => this.share()}
				/>
				<Text>Share App</Text>
			</View>
		)
	}
}

export default ShareApp

