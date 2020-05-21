
import React, { Component } from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MenuProvider } from 'react-native-popup-menu';
import { HomeStackScreen } from './screens/home';
import Todo from './screens/todo';
import Settings from './screens/settings';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from './colors';
import ToolBox from './screens/toolBox';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
const Tab = createBottomTabNavigator();

class App extends Component {
  render() {
    return (
      <MenuProvider>

        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === '首页') {
                iconName = focused ? 'ios-home' : 'ios-home';
              }
              else if (route.name === '我的') {
                iconName = focused ? 'ios-person' : 'ios-person';
              }
              else if (route.name === '工具箱') {
                iconName = focused ? 'ios-gift' : 'ios-gift';
              }

              // You can return any component that you like here!
              return(<Icon name={iconName} size={size} color={color} />);
            },
          })}
            tabBarOptions={{
              activeTintColor: Colors.purple,
              inactiveTintColor: 'gray',
            }}
          >

            <Tab.Screen name="首页" component={HomeStackScreen} />
            <Tab.Screen name="工具箱" component={ToolBox} />
            <Tab.Screen name="我的" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </MenuProvider>
    );
  }
}

export default App;
