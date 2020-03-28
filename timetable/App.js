
import React, { Component } from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MenuProvider } from 'react-native-popup-menu';


import { HomeStackScreen } from './screens/home';
import Todo from './screens/todo';
import Settings from './screens/settings';

const Tab = createBottomTabNavigator();

class App extends Component {
  render() {
    return (
      <MenuProvider>  
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="首页" component={HomeStackScreen} />
          <Tab.Screen name="Todo" component={Todo} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
      </MenuProvider>
    );
  }
}






export default App;
