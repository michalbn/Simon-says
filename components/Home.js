import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const Home = props => {
  const { navigate } = props.navigation;

  const [level, setLevel] = useState(0); //Level of difficulty in the game
  const [msg, setMsg] = useState(""); //"Game over" message
  const [simonColor, setSimonColor] = useState([
    Math.floor(Math.random() * 4) + 1
  ]); //The colors that Simon-Says are Randomly chooses
  const [viewingColors, setViewingColors] = useState([
    false,
    false,
    false,
    false
  ]); //View selected colors
  const [userColor, setUserColor] = useState([]); //User button clicks
  //Bonus points - the user shouldn't be able to press the buttons while Simon is doing his sequence
  const [enableUserRspo, setEnableUserRspo] = useState(false);
  const [score, setScore] = useState([]);

  const newGame = () => {
    if (level > 1 || simonColor.length > 1) {
      simonColor.splice(
        0,
        simonColor.length,
        Math.floor(Math.random() * 4) + 1
      );
    }
    setMsg(""); //init
    setLevel(1); //init
    setUserColor([]); //init
    randomColor(); //call function
  };

  const randomColor = () => {
    var randomNum = Math.floor(Math.random() * 4) + 1; //random number between 1 to 4
    setSimonColor(simonColor => [...simonColor, randomNum]); //update simonColor
    setUserColor(simonColor); //Copies the array to the user's array
    playSimonSays(0); //call function with index 0.
  };

  const playSimonSays = index => {
    setEnableUserRspo(false); //The user cannot press buttons while running the colors
    if (index == simonColor.length) {
      setEnableUserRspo(true); //the sequence end
      return;
    } else {
      setTimeout(() => {
        //Delay between the colors
        setViewingColors([false, false, false, false]);
        if (simonColor[index] === 1) {
          //red
          blink(0, index);
        } else if (simonColor[index] === 2) {
          //green
          blink(1, index);
        } else if (simonColor[index] === 3) {
          //blue
          blink(2, index);
        } else {
          blink(3, index); //yellow
        }
      }, 100);
    }
  };

  const blink = (pos, index) => {
    //Change the button color
    var temp = [false, false, false, false];
    temp[pos] = true;
    setViewingColors(temp);
    setTimeout(() => {
      //Switch between the black and the desired color
      setViewingColors([false, false, false, false]);
      playSimonSays(index + 1);
    }, 300);
  };

  const userChoice = colorNum => e => {
    //onPress
    console.log(colorNum);
    // ... e are the native events for touch
    if (userColor.length > 0) {
      if (colorNum === userColor[0]) {
        //If the user click is correct but the array is not finished yet
        userColor.shift();
      } else {
        //If the click is incorrect
        setMsg("Game Over");
        setLevel(0);
        setEnableUserRspo(false);
        setSimonColor([Math.floor(Math.random() * 4) + 1]);
        setUserColor([]);
        setScore(score => [...score, level]); //update simonColor
      }
    }
    if (userColor.length === 0 && level != 0) {
      ////If all the clicks are correct and I have reached the end of the array
      setTimeout(() => {
        //Delay between user clicks and Simon game
        setLevel(level + 1);
        randomColor();
      }, 500);
    } else if (userColor.length === 0) {
      setMsg("Game Over");
      setEnableUserRspo(false);
      setLevel(0);
      setUserColor([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Simon Says</Text>
      <View
        style={styles.circle}
        pointerEvents={enableUserRspo ? "auto" : "none"}
      >
        <TouchableOpacity
          style={viewingColors[0] ? styles.coneBlack : styles.cone}
          // style={styles.cone}
          onPress={userChoice(1)}
        ></TouchableOpacity>
        <View style={styles.mid}>
          <TouchableOpacity
            style={viewingColors[1] ? styles.cone1Black : styles.cone1}
            onPress={userChoice(2)}
          ></TouchableOpacity>
          <View style={styles.rectangle}>
            <Text style={styles.levelFont}>{level}</Text>
          </View>
          <TouchableOpacity
            style={viewingColors[2] ? styles.cone2Black : styles.cone2}
            onPress={userChoice(3)}
          ></TouchableOpacity>
        </View>
        <TouchableOpacity
          style={viewingColors[3] ? styles.cone3Black : styles.cone3}
          onPress={userChoice(4)}
        ></TouchableOpacity>
      </View>
      <View style={styles.newGame}>
        <Button title="New Game" onPress={newGame} />
        <Text style={styles.levelFont}>{msg}</Text>
        <Button
          title="Leader Board"
          onPress={() => navigate("Leaderboard", { score: score })}
        />
        {/* <Text>{score}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: "5%",
    justifyContent: "space-evenly"
  },
  headline: {
    fontSize: 35,
    padding: "20%",
    color: "#0d47a1",
    fontWeight: "bold"
    // fontFamily:'',
  },
  circle: {
    width: 350,
    height: 350,
    borderRadius: 350 / 2,
    backgroundColor: "black",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  newGame: {
    padding: 70
  },
  cone: {
    width: 0,
    height: 0,
    borderLeftWidth: 105,
    borderRadius: 105,
    borderLeftColor: "transparent",
    borderRightWidth: 105,
    borderRightColor: "transparent",
    borderTopWidth: 130,
    borderTopColor: "red"
    // alignItems: 'center',

    // padding: 20
  },
  coneBlack: {
    width: 0,
    height: 0,
    borderLeftWidth: 105,
    borderRadius: 105,
    borderLeftColor: "transparent",
    borderRightWidth: 105,
    borderRightColor: "transparent",
    borderTopWidth: 130,
    borderTopColor: "black"
    // alignItems: 'center',

    // padding: 20
  },
  cone1: {
    width: 0,
    height: 0,
    borderRadius: 105,
    borderLeftColor: "transparent",
    borderLeftWidth: 105,
    borderRightWidth: 105,
    borderBottomWidth: 130,
    borderBottomColor: "green",
    borderRightColor: "transparent",
    transform: [{ rotate: "90deg" }]
    // borderTopWidth: 90,
    // borderTopColor: 'green',
    // alignItems: 'center',

    // padding: 20
  },
  cone1Black: {
    width: 0,
    height: 0,
    borderRadius: 105,
    borderLeftColor: "transparent",
    borderLeftWidth: 105,
    borderRightWidth: 105,
    borderBottomWidth: 130,
    borderBottomColor: "black",
    borderRightColor: "transparent",
    transform: [{ rotate: "90deg" }]
    // borderTopWidth: 90,
    // borderTopColor: 'green',
    // alignItems: 'center',

    // padding: 20
  },

  cone2: {
    width: 0,
    height: 0,
    borderLeftWidth: 105,
    borderRadius: 105,
    borderLeftColor: "transparent",
    borderRightWidth: 105,
    borderRightColor: "transparent",
    borderTopWidth: 130,
    borderTopColor: "blue",
    transform: [{ rotate: "90deg" }]
    // alignItems: 'center',

    // padding: 20
  },
  cone2Black: {
    width: 0,
    height: 0,
    borderLeftWidth: 105,
    borderRadius: 105,
    borderLeftColor: "transparent",
    borderRightWidth: 105,
    borderRightColor: "transparent",
    borderTopWidth: 130,
    borderTopColor: "black",
    transform: [{ rotate: "90deg" }]
    // alignItems: 'center',

    // padding: 20
  },
  cone3: {
    width: 0,
    height: 0,
    borderLeftWidth: 105,
    borderRadius: 105,
    borderLeftColor: "transparent",
    borderRightWidth: 105,
    borderRightColor: "transparent",
    // borderTopWidth: 90,
    borderBottomWidth: 130,
    borderBottomColor: "yellow"
    // borderTopColor: 'green',
    // alignItems: 'center',
  },
  cone3Black: {
    width: 0,
    height: 0,
    borderLeftWidth: 105,
    borderRadius: 105,
    borderLeftColor: "transparent",
    borderRightWidth: 105,
    borderRightColor: "transparent",
    // borderTopWidth: 90,
    borderBottomWidth: 130,
    borderBottomColor: "black"
    // borderTopColor: 'green',
    // alignItems: 'center',
  },

  mid: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"

    // paddingLeft:130,
    //paddingRight:130,
  },

  rectangle: {
    width: 45 * 2,
    height: 90,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  levelFont: {
    fontWeight: "bold",
    fontSize: 35
  }
});

export default Home;
