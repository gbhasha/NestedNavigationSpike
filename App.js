/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Dimensions,
  YellowBox,
} from 'react-native';
import {NavigationActions, StackActions, SafeAreaView} from 'react-navigation';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';

class App extends Component {
  render() {
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
    return <AppContainer />;
  }
}
export default App;

const Detail = props => (
  <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>{props.children}</View>
  </SafeAreaView>
);

const Tab1Screen = () => (
  <View style={styles.container}>
    <Text style={{color: 'brown', fontSize: 25}}>Welcome Home</Text>
  </View>
);

const Tab3Screen = () => (
  <Detail>
    <Text>Tab3 Screen</Text>
  </Detail>
);

const Tab2DetailScreen = ({navigation}) => (
  <Detail>
    <Text>Tab2 > Nav2 > Nav1 > Detail > Detail Screen</Text>
    <Button
      title="Go to Next Screen"
      onPress={() => navigation.navigate('Tab2Nav2FinalDetailsScreen')}
    />
  </Detail>
);

const Tab2Nav2FinalDetailsScreen = ({navigation}) => (
  <Detail>
    <View style={{...styles.container, flex: 0.8}}>
      <Text style={{color: 'green', fontSize: 40}}> Success !!!! </Text>
    </View>
    <View style={{...styles.container, flex: 0.2}}>
      <TouchableHighlight
        style={styles.primaryBtn}
        onPress={() => {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'DashboardTabNavigator',
              }),
            ],
          });
          navigation.dispatch(resetAction);
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
          Goto Home
        </Text>
      </TouchableHighlight>
    </View>
  </Detail>
);

const Tab2Nav2Nav1DetailScreen = ({navigation}) => (
  <Detail>
    <Text>Tab2 > Nav2 > Nav1 > DetailScreen</Text>
    <Button
      title="Goto Next Screen"
      onPress={() => navigation.navigate('Tab2DetailScreen')}
    />
  </Detail>
);

const Tab2Nav2Nav2DetailScreen = () => (
  <Detail>
    <Text>Tab2 > Nav2 > Nav2 > DetailScreen</Text>
  </Detail>
);

const Tab2Nav1Screen = () => (
  <Detail>
    <Text>Tab2 > Nav1 > DetailScreen</Text>
  </Detail>
);

const Tab2Nav2Screen = ({navigation}) => (
  <Detail>
    <Text>Tab2 > Nav2 > DetailScreen</Text>
    <Button
      title="Goto Next Screen"
      onPress={() => navigation.navigate('Tab2Nav2DetailsTopNavScreen')}
    />
  </Detail>
);

const Tab2Nav3Screen = () => (
  <Detail>
    <Text>Tab2 > Nav3 > DetailScreen</Text>
  </Detail>
);

const Tab2Nav4Screen = () => (
  <Detail>
    <Text>Tab2 > Nav4 > DetailScreen</Text>
  </Detail>
);

const HeaderLeftImage = props => (
  <Image
    source={require('./backImage.png')}
    style={{height: 26, width: 26, marginHorizontal: 16, ...props.style}}
  />
);

const HeaderLeft = ({navigation}) => (
  <TouchableOpacity
    onPress={() => {
      navigation.goBack();
    }}>
    <HeaderLeftImage />
  </TouchableOpacity>
);

const SafeAreaMaterialTopTabBar = props => {
  return (
    <SafeAreaView>
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  );
};

const SafeAreaMaterialTopTabBarWithBack = props => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <HeaderLeft navigation={props.navigation} />
      <MaterialTopTabBar
        {...props}
        style={{flex: 1, backgroundColor: 'transparent'}}
      />
    </SafeAreaView>
  );
};

const Tab2Nav2DetailsTopNavScreens = createMaterialTopTabNavigator(
  {
    nav1: {screen: Tab2Nav2Nav1DetailScreen},
    nav2: {screen: Tab2Nav2Nav2DetailScreen},
  },
  {
    initialLayout: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
    initialRouteName: 'nav1',
    swipeEnabled: true,
    tabBarComponent: SafeAreaMaterialTopTabBarWithBack,
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: 'brown',
        borderBottomWidth: 2,
      },
      style: {
        backgroundColor: 'white',
      },
    },
  },
);

const TopTabScreens = createMaterialTopTabNavigator(
  {
    nav1: {screen: Tab2Nav1Screen},
    nav2: {screen: Tab2Nav2Screen},
    nav3: {screen: Tab2Nav3Screen},
    nav4: {screen: Tab2Nav4Screen},
  },

  {
    initialRouteName: 'nav2',
    swipeEnabled: true,
    tabBarComponent: SafeAreaMaterialTopTabBar,
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: 'brown',
        borderBottomWidth: 2,
      },
      style: {
        backgroundColor: 'white',
        borderColor: 'transparent',
      },
    },
  },
);

const Tab2Stack = createStackNavigator(
  {
    TabScreen: {
      screen: TopTabScreens,
      navigationOptions: {
        header: null,
      },
    },
    Tab2Nav2DetailsTopNavScreen: {
      screen: Tab2Nav2DetailsTopNavScreens,
      navigationOptions: {
        header: null,
      },
    },
    Tab2DetailScreen: {
      screen: Tab2DetailScreen,
      navigationOptions: ({navigation}) => {
        return {
          headerLeft: <HeaderLeft navigation={navigation} />,
        };
      },
    },
    Tab2Nav2FinalDetailsScreen: {
      screen: Tab2Nav2FinalDetailsScreen,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
          tabBarVisible: false,
        };
      },
    },
  },
  {
    navigationOptions: ({navigation}) => {
      return {
        // Hide Bottom Navigation in Nav2 screens
        tabBarVisible: !navigation.state.index > 0,
      };
    },
  },
);

const Tab1Stack = createStackNavigator({
  Tab1Screen: {
    screen: Tab1Screen,
    navigationOptions: ({navigation}) => {
      return {
        header: null,
      };
    },
  },
});

const Tab3Stack = createStackNavigator({
  Tab3Screen: {
    screen: Tab3Screen,
    navigationOptions: ({navigation}) => {
      return {
        header: null,
      };
    },
  },
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Tab1Stack: Tab1Stack,
    Tab2Stack: Tab2Stack,
    Tab3Stack: Tab3Stack,
  },
  {
    initialRouteName: 'Tab2Stack',
  },
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        header: null,
      };
    },
  },
);

const AppContainer = createAppContainer(DashboardStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: 'rgb(136,15,30)',
    marginLeft: 50,
    marginRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
