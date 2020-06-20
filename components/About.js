import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { 
	backgroundGradientColor,
	backgroundGradientStart,
	backgroundGradientEnd
 } from './Colors'

class About extends Component {
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
					The intent of this app is to create awareness of Islam and to 
					highlight the life changing Ayahs and Hadiths in Islam. 
					We have tried to move beyond the basics and covered the influential 
					Hadiths and Ayahs, so whoever comes to this app, leaves with more knowledge.
					This is a work-in-progress. We are constantly adding questions to this app
					which will get added automatically if you play online. 
					Good News - you can even play offline. {"\n\n"}

					We have tried to add tough questions and made sure every question has a 
					reference from the Qura'n and the Sahih hadith. Every care has been taken 
					to make sure there is no error in the reference. Every question has been double 
					or even triple checked to avoid any error. If you have any doubts on the questions
					or references, feel free to leave a comment in the Google App Store. 
					We'll try to respond at the earliest.{"\n\n"}

					May Allah accept our work.{"\n\n"}

					</Text>
				</ScrollView>
			</LinearGradient>
		)
	}
}

export default About