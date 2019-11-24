import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Leaderboard: { screen: Leaderboard }
});

const App = createAppContainer(MainNavigator);

export default App;
