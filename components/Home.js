import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Font } from 'expo'
import AppText from './AppText'
import { 
	darkPink,
	mainGreen, 
	mainBlack,
	backgroundGradientColor,
	backgroundGradientStart,
	backgroundGradientEnd
 } from './Colors'

class Home extends Component {

	state = {
		fontLoaded: false,
	}

	componentDidMount() {
		Font.loadAsync({
			'raleway-regular': require('../assets/fonts/Raleway-Regular.ttf')
		}).then(() => (
			this.setState({
				fontLoaded: true,
			})
		))
	}

	render() {
		return (
			<View style={styles.container}>
        <LinearGradient
          colors={backgroundGradientColor}
          start={backgroundGradientStart}
          end={backgroundGradientEnd}
          style={{flex: 1}}
        >
					{ this.state.fontLoaded 
						? <View style={styles.mainView}>
								<View style={{flex: 1, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-around'}}>
									<View>
										<Text style={styles.greeting}>السلام عليكم ورحمة الله وبركاته</Text>
										<Text style={{fontSize: 26, alignSelf: 'center'}}>Welcome To Islaah</Text>
										<Text style={{fontSize: 26, alignSelf: 'center'}}>The Islamic Quiz App!!</Text>
									</View>									
									<View>
										
											<Text style={styles.arabic}>
												فاذكروني أذكركم واشكروا لي ولا تكفرون {"\n\n"}
											</Text>
										
											<Text style={styles.english}>
												So remember Me; I will remember you. And be grateful to Me and do not deny Me.{"\n"}
												<Text style={{fontSize: 12, fontWeight: 'bold'}}>(Surah Al-Baqarah - 152)</Text>{"\n\n"}
											</Text>

									</View>
								</View>
								<View>
									<TouchableOpacity onPress={() => this.props.navigation.navigate("Topics")}>
										<View style={styles.gotoBtn}>
											<Text style={styles.gotoBtnText} >
												Go To Topics
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							</View>
						: null
					}
				</LinearGradient>
			</View>
		)
	}
}

export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	greeting: {
		fontStyle: "italic",
		fontWeight: 'bold',
		fontSize: 22,
		textAlign: 'center',
		padding: 10,
	},
	mainView: {
		flex: 1,
		justifyContent: 'space-between',
	},
	english: {
		fontSize: 18,
		fontStyle: 'italic',
	},
	arabic: {
		fontSize: 22,
		// fontStyle: 'italic',
	},
	text: {
		fontSize: 18,
		fontFamily: 'raleway-regular',
		color: mainBlack,
	},
	gotoBtn: {
		width: '100%',
		padding: 12,
		backgroundColor: darkPink,

	},
	gotoBtnText: {
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'raleway-regular',
		fontWeight: 'bold',
		color: mainBlack,
	}
})