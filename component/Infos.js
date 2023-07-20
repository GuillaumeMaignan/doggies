import {
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import data from "./data";
import { useRoute } from "@react-navigation/native";
function Infos(props) {
  const [loaded] = useFonts({
    ValencaKids: require("../assets/fonts/ValencaKids.otf"),
  });

  const route = useRoute();

  let dog = route.params.info || route.params.index;

  if (!dog) {
    dog = 0;
  }
  let loc = data[dog].map;
  let dogInfo = (
    <View style={styles.dogInfo}>
      <View style={styles.dogTag}>
        <Image style={styles.avatar} source={data[dog].picture}></Image>
        <Text style={styles.nom}> {data[dog].name} </Text>
      </View>
      <ScrollView style={styles.dogData}>
        <View style={styles.adressContainer}>
          <Text style={styles.text}>
            <Text style={styles.tag}>Adress : </Text>
            {data[dog].adress}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(loc);
            }}
          >
            <Image
              style={styles.icon}
              source={require("../assets/mapIcon.png")}
            ></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          <Text style={styles.tag}>Code : </Text>
          {data[dog].code}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.tag}>Key : </Text>
          {data[dog].keyColor}
        </Text>
        <Text style={styles.specs}>
          <Text style={styles.tag}>Spec : </Text>
          {data[dog].specs}
        </Text>
      </ScrollView>
    </View>
  );

  // console.log(name, "name");
  // console.log(dog, "dog");
  if (!loaded) {
    return null;
  }
  return <View style={styles.container}>{dogInfo}</View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(225, 212, 187)",
  },
  dogInfo: { marginTop: 0 },
  dogTag: { alignItems: "center" },
  dogData: { margin: 5 },
  tag: { fontFamily: "ValencaKids", fontSize: 30 },
  adressContainer: { display: "flex", flexDirection: "row" },
  avatar: { height: 430, width: 430 },
  nom: { fontFamily: "ValencaKids", fontSize: 60, marginTop: 10 },
  text: { fontSize: 20, margin: 5, fontFamily: "AvenirNext-Regular" },
  specs: {
    fontSize: 20,
    margin: 5,
    fontFamily: "Futura",
    fontStyle: "italic",
  },
  icon: { height: 30, width: 30, margin: 5 },
});
export default Infos;
