import React, { Component } from 'react'
import { View, Text, ScrollView, AsyncStorage, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { 
	backgroundGradientColor,
	backgroundGradientStart,
	backgroundGradientEnd
 } from './Colors'
 import { BOOKMARK_KEY } from '../constants/Keys'
 import Biscuit from './Biscuit'
 import NoBookmark from './NoBookmark'

class MyBookmarks extends Component {

	constructor(props) {
		super(props)
		this.state = {
			bm: [],
			allBms: {}
		}
	}

	componentDidMount = () => {
		console.log('yes')
		this.subs = this.props.navigation.addListener("didFocus", () => {
			AsyncStorage.getItem(BOOKMARK_KEY)
			.then((bm) => {
				if (bm !== null) {
					let bmParse = JSON.parse(bm)
					let mybm = Object.keys(bmParse)
					let allBookmarks = []
					this.setState({
						bm: mybm,
						allBms: bmParse,
					})
				}
			})
		})
	}

	componentWillUnmount() {
    this.subs.remove()
  }
	render() {
		let { bm, allBms } = this.state
		console.log('allBms', this.state.allBms)

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
					<View style={{fontSize: 16}}>
						
						<View>{
							bm.length > 0 
								? <View style={styles.bm}>
										{  
											Object.keys(allBms).map((b, i) => 
												{ 
													console.log('vals', allBms[b].length)
													return (
														allBms[b].length > 0 && <Biscuit 
														key={i} 
														title={b} 
														bms={allBms[b]}
														index={i} 
														navigation={this.props.navigation}
													/>)
												}
											)
										}
									</View>
								: <NoBookmark />
						}</View>
					</View>
				</ScrollView>
			</LinearGradient>
		)
	}
}

export default MyBookmarks

const styles = StyleSheet.create({
	bm: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		// alignContent: 'center'

	}
})
