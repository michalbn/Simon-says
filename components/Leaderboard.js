import React, { useState } from "react";
import { StyleSheet, Text, View, ListItem } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const Leaderboard = props => {
  const { navigation } = props;
  const [scores, setScores] = useState(
    navigation
      .getParam("score")
      .sort()
      .reverse()
      .slice(0, 10)
  );
  //My Top 10 - Scores

  //   JSON.stringify(
  //   navigation
  //     .getParam("score")
  //     .sort()
  //     .reverse()
  //     .slice(0, 10)
  // )

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>My Top 10 - Scores</Text>
      {/* <Text>score :{scores}</Text> */}
      {scores.map((item, key) => (
        <Text key={key} style={styles.TextStyle}>
          {" "}
          {item - 1}{" "}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: "5%",
    justifyContent: "space-evenly"
    // flex: 1,
    // margin: 10
  },
  headline: {
    fontSize: 24,
    padding: "8%",
    color: "#0d47a1",
    fontWeight: "bold"
    // fontFamily:'',
  },

  TextStyle: {
    fontSize: 20,
    textAlign: "center",
    padding: "2%"
  }
});

export default Leaderboard;
