/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';
import {YellowBox} from 'react-native';

class App extends React.Component {
  render() {
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
    return <AppContainer />;
  }
}
export default App;

const ScreenDetails = ({children}) => (
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>
);

const Nav1Screen = () => (
  <ScreenDetails>
    <Text>Nav1 Screen</Text>
  </ScreenDetails>
);
const Nav2Screen = () => (
  <ScreenDetails>
    <Text>Nav1 Screen</Text>
  </ScreenDetails>
);
const Nav3Screen = () => (
  <ScreenDetails>
    <Text>Nav1 Screen</Text>
  </ScreenDetails>
);
function SafeAreaMaterialTopTabBar(props) {
  return (
    <SafeAreaView>
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  );
}
const TopNavScreens = createMaterialTopTabNavigator(
  {
    Nav1: Nav1Screen,
    Nav2: Nav2Screen,
    Nav3: Nav3Screen,
  },
  {
    tabBarComponent: SafeAreaMaterialTopTabBar,
  },
);

const DashboardStack = createStackNavigator(
  {
    Dashboard: TopNavScreens,
  },
  {
    defaultNavigationOptions: () => {
      return {
        header: null,
      };
    },
  },
);

const AppContainer = createAppContainer(DashboardStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
