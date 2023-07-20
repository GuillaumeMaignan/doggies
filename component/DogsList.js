import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/counter";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import data from "./data";
import { Swipeable } from "react-native-gesture-handler";

function DogsList(props) {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [popupText, setPopupText] = useState(false);
  const [Color, setColor] = useState("grey");
  const [showPopUp, setShowPopUp] = useState(false);

  const swipeableRefs = useRef([]);
  // console.log(swipeableRef.current, "ref");
  const [swipeablePosition, setSwipeablePosition] = useState(
    new Animated.Value(0)
  );

  const count = useSelector((state) => state.counter.value);
  const [loaded] = useFonts({
    ValencaKids: require("../assets/fonts/ValencaKids.otf"),
  });
  const resetSwipeables = () => {
    swipeableRefs.current.forEach((swipeableRef) => {
      if (swipeableRef && swipeableRef.current) {
        swipeableRef.current.close();
      }
    });
  };
  const PopUp = () => {
    const popupColor = useRef(new Animated.Value(0)).current;
    // console.log(popupColor);

    useEffect(() => {
      if (showPopUp) {
        Animated.timing(popupColor, {
          toValue: 1,
          duration: 1500, // Durée de l'animation en millisecondes
          useNativeDriver: false,
        }).start(() => {
          // L'animation de la couleur est terminée, masquer la PopUp
          setShowPopUp(false);
        });
      }
    }, [showPopUp]);

    if (!showPopUp) {
      return null; // Si showPopUp est false, ne rien afficher
    }
    return (
      <Animated.View
        style={{ backgroundColor: Color, height: 30, justifyContent: "center" }}
      >
        <Text style={styles.popupText}>{popupText}</Text>
      </Animated.View>
    );
  };
  const leftSwipe = (progress, dragX, id, index) => {
    handleAddDog = (id) => {
      const arr = [...count];
      if (!arr.includes(id)) {
        // const arr = [];
        arr.push(id);
        // setHomeDogs(arr);
        dispatch(increment(arr));
        setShowPopUp(true);
        setColor("green");
        setPopupText("Dog added");
      } else {
        console.log("ID already exists in homeDogs array");
        // Handle the case where the ID is already present
        setShowPopUp(true);
        setColor("red");
        setPopupText("Dog already added");
      }
      resetSwipeables();
    };

    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        onPress={() => handleAddDog(id)}
        // onPress={() => dispatch(increment())}
        style={styles.deleteBox}
      >
        <View>
          <Image
            style={styles.add}
            source={require("../assets/whitePlusIcon.jpg")}
          ></Image>
          <Animated.Text
            style={{
              color: "white",
              transform: [{ scale: scale }],
            }}
          >
            Add
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  const filteredDogs = data.filter((info) =>
    info.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // const dog = data.map((info, index) => {
  const dog = filteredDogs.map((info, index) => {
    // const togglePoop = () => {
    // const swipeableRef = useRef(null);
    const swipeableRef = React.createRef();
    swipeableRefs.current[index] = swipeableRef;

    // setIsPoop(!isPoop); // Toggle the value of isPoop
    // };
    if (!loaded) {
      return null;
    }
    return (
      <Swipeable
        key={index}
        ref={swipeableRef}
        renderLeftActions={(progress, dragX) =>
          leftSwipe(progress, dragX, info.id, index)
        }
        // onSwipeableWillOpen={resetSwipeables}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.navigation.navigate("Infos", { index })}
          style={styles.card}
        >
          <Image style={styles.avatar} source={info.picture} />
          <Text style={styles.name}>{info.name}</Text>
          <Text style={styles.info}>{info.time}</Text>
          {/* <TouchableOpacity
            onPress={() => {
              // Linking.openURL("whatsapp://send?text&group=Familizz");
              Linking.openURL("https://api.whatsapp.com/send?name=Familizz");
            }}
          >
            <Image
              style={styles.poop}
              source={require("../assets/camera-.png")}
            ></Image>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={togglePoop}>
            <Image
              style={styles.poop}
              source={
                isPoop
                  ? require("../assets/cacamojibg.png")
                  : require("../assets/cacamojiempty.png")
              }
            />
          </TouchableOpacity> */}
        </TouchableOpacity>
      </Swipeable>
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> All Dogs </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("CreateDog")}
        >
          <Image
            style={styles.profilImage}
            source={require("../assets/plusIcon.jpg")}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Image
          style={styles.searchIcon}
          source={require("../assets/loupeIcon.png")}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

      <ScrollView>
        {/* <Card props={props}></Card> */}
        {/* <AllDogs /> */}
        {dog}
      </ScrollView>
      <PopUp />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "rgb(203, 178, 121)",
    alignContent: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 45,
    fontWeight: "bold",
    fontFamily: "PawWow",
    marginBottom: 20,
    // marginTop: 40,
    textAlign: "center",
    // justifyContent: "center",
  },
  searchBar: { width: 300 },
  searchContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
  },
  searchIcon: { height: 30, width: 30 },
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
  card: {
    marginVertical: 1,
    display: "flex",
    borderColor: "rgb(83, 113, 136)",
    borderWidth: 5,
    borderRadius: 10,
    flexDirection: "row",
    height: 100,
    paddingRight: 10,
    backgroundColor: "rgb(238, 238, 238)",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilImage: {
    justifyContent: "flex-end",
    height: 45,
    width: 45,
    marginRight: 10,
  },
  deleteBox: {
    borderRadius: 10,
    backgroundColor: "blue",
    width: 100,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  add: { width: 35, height: 35 },
  info: { fontWeight: "bold" },
  allDogs: { backgroundColor: "red", height: 23 },
  popupText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
});
export default DogsList;
