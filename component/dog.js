import { View, Text } from "react-native";
import React from "react";
import data from "./data";
export default function Dog() {
  const dog = dogOfTheDay.map((info, index, id) => {
    const togglePoop = (index) => {
      console.log(index, "index inside po");
      setIsPoop(!isPoop); // Toggle the value of isPoop
    };
    if (!loaded) {
      return null;
    }
    return (
      <Swipeable
        key={index}
        renderLeftActions={(progress, dragX) =>
          leftSwipe(progress, dragX, index)
        }
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.props.navigation.navigate("Infos", { info })}
          style={styles.card}
        >
          <Image style={styles.avatar} source={data[info].picture} />
          <Text style={styles.name}>{data[info].name}</Text>
          <Text style={styles.info}>{data[info].time}</Text>
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
          <TouchableOpacity onPress={() => togglePoop(index)}>
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
  });
}
