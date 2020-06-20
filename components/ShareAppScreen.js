import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { 
	backgroundGradientColor,
	backgroundGradientStart,
	backgroundGradientEnd
 } from './Colors'
import ShareApp from './ShareApp'

class ShareAppScreen extends Component {
	render() {
		return (
			<LinearGradient
        colors={backgroundGradientColor}
        start={backgroundGradientStart}
        end={backgroundGradientEnd}
        style={{flex: 1, padding: 10, paddingTop: 20}}
      >					
				<ScrollView 
					showsVerticalScrollIndicator = {false} 
				>		
					<Text style={{fontSize: 16}}>
						Jazakumullah Khair{"\n\n"}

						I hope this app has helped you 
						gain knowledge on Islam. Help us bring more users to this app
						by sharing through WhatsApp or any social networking channels.

						May Allah accept our work.{"\n\n"}

					</Text>
					<TouchableOpacity>
						<ShareApp />
					</TouchableOpacity>
				</ScrollView>
			</LinearGradient>
		)
	}
}

export default ShareAppScreen