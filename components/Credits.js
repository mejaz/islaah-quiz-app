import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { 
	backgroundGradientColor,
	backgroundGradientStart,
	backgroundGradientEnd
 } from './Colors'

class Credits extends Component {
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
						1. www.muflihun.com {"\n"}
						2. www.sunnah.com {"\n"}
						3. www.vecteezy.com (for app icon) {"\n\n"}
					</Text>
				</ScrollView>
			</LinearGradient>
		)
	}
}

export default Credits