import React from 'react';
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { 
  DrawerItems, 
  createDrawerNavigator, 
  createStackNavigator, 
  SafeAreaView,
  createAppContainer
} from 'react-navigation'
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { Constants, LinearGradient, Font } from 'expo'
import Home from './components/Home'
import Topics from './components/Topics'
import Splash from './components/Splash'
import Stats from './components/Stats'
import Questions from './components/Questions'
import Reference from './components/Reference'
import Score from './components/Score'
import TopicDesc from './components/TopicDesc'
import HeaderHome from './components/HeaderHome'
import DrawerContent from './components/DrawerContent'
import About from './components/About'
import Credits from './components/Credits'
import ShareAppScreen from './components/ShareAppScreen'
import MyBookmarks from './components/MyBookmarks'
import TopicBookmark from './components/TopicBookmark'


const Stacks = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: <HeaderHome navigation={navigation}/>,
      }
    }
  },
  Topics: {
    screen: Topics,
    navigationOptions: {
      title: "Topics",
      key: 'Topics',
    }
  },
  TopicDesc: {
    screen: TopicDesc,
    navigationOptions: {
      title: "Topic Description",
    }
  },
  Questions: {
    screen: Questions,
    navigationOptions: ({navigation}) => {
      return {
        title: navigation.state.params.title.toUpperCase(),
        headerLeft: null,
      }
    }
  },
  Reference: {
    screen: Reference,
    navigationOptions: {
      title: "Reference",
    }
  },
  Score: {
    screen: Score,
    navigationOptions: {
      title: "Score",
      headerLeft: null,
    }
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#3bd3d3',
    },
    headerTitleStyle: {
      color: '#000c0c'
    },
    drawerLockMode: 'locked-closed'
  },
  headerMode: 'float',
  backgroundColor: '#00a290'
})

const Statistics = createStackNavigator({
  Statistics: {
    screen: Stats,
    navigationOptions: {
      title: "Statistics",
    }
  }
}, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#3bd3d3',
      },
      headerTitleStyle: {
        color: '#000c0c'
      },
    }
  })

const AboutScreen = createStackNavigator({
  AboutScreen: {
    screen: About,
    navigationOptions: {
      title: "About",
    }
  }
  }, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#3bd3d3',
      },
      headerTitleStyle: {
        color: '#000c0c'
      },
    }
  })

const BookMarkScreen = createStackNavigator({
  MyBookmarks: {
    screen: MyBookmarks,
    navigationOptions: {
      title: "My Bookmarks",
    }
  },
  TopicBookmark: {
    screen: TopicBookmark,
    navigationOptions: ({navigation}) => {
      return {
        title: navigation.state.params.title.toUpperCase() + " Bookmarks",
      }
    }    
  }
  }, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#3bd3d3',
      },
      headerTitleStyle: {
        color: '#000c0c'
      },
    }
  })

const CreditsScreen = createStackNavigator({
  CreditsScreen: {
    screen: Credits,
    navigationOptions: {
      title: "Credits",
    }
  }
  }, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#3bd3d3',
      },
      headerTitleStyle: {
        color: '#000c0c'
      },
    }
  })

const ShareScreen = createStackNavigator({
  CreditsScreen: {
    screen: ShareAppScreen,
    navigationOptions: {
      title: "Share App",
    }
  }
  }, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#3bd3d3',
      },
      headerTitleStyle: {
        color: '#000c0c'
      },
    }
  })

const Drawer = createDrawerNavigator({
  Home: {
    screen: Stacks,
    navigationOptions: {
      drawerLabel: "Home",
      drawerIcon: () => <Entypo name="home" size={25} />
    }
  },
  Statistics: {
    screen: Statistics,
    navigationOptions: {
      drawerLabel: "Statistics",
      drawerIcon: () => <Ionicons name="ios-stats" size={25} />
    }
  },
  Bookmarks: {
    screen: BookMarkScreen,
    navigationOptions: {
      drawerLabel: "My Bookmarks",
      drawerIcon: () => <MaterialCommunityIcons name="bookmark" size={25} />
    }
  },
  About: {
    screen: AboutScreen,
    navigationOptions: {
      drawerLabel: "About",
      drawerIcon: () => <Entypo name="hand" size={25} />
    }
  },
  Credits: {
    screen: CreditsScreen,
    navigationOptions: {
      drawerLabel: "Credits",
      drawerIcon: () => <Entypo name="sound" size={25} />
    }
  },
  Share: {
  screen: ShareScreen,
  navigationOptions: {
    drawerLabel: "Share App",
    drawerIcon: () => <Entypo name="share" size={25} />
  }
}  
}, {
  contentComponent: DrawerContent,
  drawerPosition: 'right',
  drawerBackgroundColor: '#e6eef2',
  drawerLockMode: 'locked-closed'
})

const DrawerApp = createAppContainer(Drawer);

export default class App extends React.Component {

  constructor(props) {
    super(props)
    Text.defaultProps = Text.defaultProps || {}
    Text.defaultProps.allowFontScaling = false
  }

  render() {
    console.log("props", this.props.children)
    return (
      <Provider store={createStore(reducer)}>
        <ScrollView  contentContainerStyle={styles.container}>
          <DrawerApp />
        </ScrollView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'stretch',
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
  }
});
