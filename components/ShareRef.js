import React, { Component } from 'react'
import { Share } from 'react-native'
import { Entypo } from '@expo/vector-icons'

class ShareRef extends Component {

  share = () => {

  	let ref = this.props.msg
  	let islaahUrl = "https://play.google.com/store/apps/details?id=com.islaah.islaah&hl=en_US"
  	let appName = "Islaah - The Islamic Quiz App"

	  Share.share({
	    message: `\n ${ref} \n\n ${appName} \n\n ${islaahUrl}`,
	    title: 'Hadith Share from Islaah'
	  }, {
	    // Android only:
	    dialogTitle: 'Islaah share',
	  })
  }	

	render() {
		return (
			<Entypo 
				name='share' 
				size={30} 
				style={{padding: 5}}
				onPress={() => this.share()}
			/>
		)
	}
}

export default ShareRef

