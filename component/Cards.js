import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Linking,
} from "react-native";
import { useFonts } from "expo-font";
import data from "./data";
import { Swipeable } from "react-native-gesture-handler";
// import { increment } from "../redux/counter";
// import { useSelector, useDispatch } from "react-redux";
export default function Cards(props) {
  const [isPoop, setIsPoop] = useState(false); // Define isPoop state per card
  const [loaded] = useFonts({
    ValencaKids: require("../assets/fonts/ValencaKids.otf"),
  });
  let index = props.index;

  let id = props.id;
  const leftSwipe = (progress, dragX, id) => {
    // const handleDelete = () => {
    //   const arr = [...count];

    //   arr.splice(id, 1);

    //   dispatch(increment(arr));

    //   // return arr;
    // };

    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        onPress={() => props.handleDelete(index)}
        style={styles.deleteBox}
      >
        <View>
          <Image
            style={styles.trash}
            source={require("../assets/trash.png")}
          ></Image>
          <Animated.Text
            style={{ color: "white", transform: [{ scale: scale }] }}
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const togglePoop = () => {
    setIsPoop(!isPoop); // Toggle the value of isPoop
  };
  if (!loaded) {
    return null;
  }
  let info = props.info;
  return (
    <Swipeable
      //   key={index}
      renderLeftActions={(progress, dragX) => leftSwipe(progress, dragX)}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.props.navigation.navigate("Infos", { info })}
        style={styles.card}
      >
        <Image style={styles.avatar} source={props.avatar} />
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.info}>{props.time}</Text>
        <TouchableOpacity
          onPress={() => {
            // Linking.openURL("whatsapp://send?text&group=Familizz");
            Linking.openURL("https://api.whatsapp.com/send?name=Familizz");
            // setHour(props.time);
          }}
        >
          <Image
            style={styles.poop}
            source={require("../assets/camera-.png")}
          ></Image>
        </TouchableOpacity>
        <View>
          {/* <Text style={styles.info}>Start:{hour}</Text> */}
          {/* <Text style={styles.info}>End:</Text> */}
        </View>
        <TouchableOpacity onPress={togglePoop}>
          <Image
            style={styles.poop}
            source={
              isPoop
                ? require("../assets/cacamojibg.png")
                : require("../assets/cacamojiempty.png")
            }
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );

  //   return <ScrollView style={styles.container}>{dog}</ScrollView>;
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 4 },
  card: {
    marginVertical: 1,
    display: "flex",
    borderColor: "rgb(83, 113, 136)",
    borderWidth: 5,
    borderRadius: 10,
    flexDirection: "row",
    height: 100,
    // paddingRight: 5,
    backgroundColor: "rgb(238, 238, 238)",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },
  name: {
    fontSize: 30,
    fontFamily: "ValencaKids",
    color: "black",
    width: 100,
    textAlign: "center",
  },
  poop: { height: 50, width: 50 },
  info: { fontWeight: "bold" },
  deleteBox: {
    borderRadius: 10,
    backgroundColor: "red",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  trash: { width: 35, height: 35 },
});
