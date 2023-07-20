import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../redux/counter";
import moment from "moment";
import Card from "./card";
import Cards from "./Cards";
import data from "./data";

function Home(props) {
  const dispatch = useDispatch();

  const [loaded] = useFonts({
    PawWow: require("../assets/fonts/PawWow.otf"),
  });
  const count = useSelector((state) => state.counter.value);

  if (!loaded) {
    return null;
  }
  const handleDelete = (id) => {
    const arr = [...count];
    arr.splice(id, 1);
    dispatch(increment(arr));

    // return arr;
  };
  const dogs = count.map((i, index) => {
    return (
      <Cards
        key={i}
        info={i}
        index={index}
        avatar={data[i].picture}
        name={data[i].name}
        time={data[i].time}
        props={props}
        handleDelete={handleDelete}
      />
    );
  });
  const AddDogs = () => {
    if (count.length >= 1) {
      return <View></View>;
    } else {
      return (
        <View>
          <TouchableOpacity
            style={styles.addDogs}
            onPress={() => props.navigation.navigate("DogsList")}
          >
            <Image
              style={styles.profilImage}
              source={require("../assets/plusIcon.jpg")}
            ></Image>
            <Text style={styles.name}>Press to add a dog from Dogs list</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  let time = moment().format("LT");
  let str = moment().format("dddd");
  const date = str.charAt(0).toUpperCase() + str.slice(1);
  // let date = str2.charAt(0).toUpperCase() + str2.slice(1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          // style={styles.return}
          onPress={() => props.navigation.navigate("Landing")}
          // title="Return"
        >
          <Image
            style={styles.returnImage}
            source={require("../assets/arrowback.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.date}> {date}</Text>
        <TouchableOpacity
          // style={styles.return}
          onPress={() => props.navigation.navigate("Map")}
          // title="Return"
        >
          <Image
            style={styles.profilImage}
            source={require("../assets/mapBlackIcon.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <AddDogs />
        {/* <Card props={props} time={time}></Card> */}
        {/* <Cards props={props} count={count}></Cards> */}
        {dogs}
      </ScrollView>
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
    marginTop: 30,
    justifyContent: "space-between",
  },
  date: {
    fontSize: 45,
    fontWeight: "bold",
    fontFamily: "PawWow",
    marginBottom: 20,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  return: {
    margin: 10,
    height: 25,
    width: 25,
    // backgroundColor: "grey",
  },
  returnImage: { height: 45, width: 45 },
  profilImage: { height: 45, width: 45, marginRight: 10 },
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
  addDogs: {
    marginVertical: 1,
    display: "flex",
    borderColor: "rgb(83, 113, 136)",
    borderWidth: 5,
    borderRadius: 10,
    flexDirection: "row",
    height: 100,
    backgroundColor: "rgb(238, 238, 238)",
    alignItems: "center",
  },
  name: { fontSize: 18, fontWeight: "bold" },
});
export default Home;
