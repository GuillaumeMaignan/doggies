import { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Linking,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  Button,
} from "react-native";
import { useFonts } from "expo-font";
// import { SafeAreaView } from "react-native-safe-area-context";

function Landing(props) {
  const [loaded] = useFonts({
    Hiladous: require("../assets/fonts/Hiladous.otf"),
  });
  const [name, setName] = useState("Name");
  const [password, setPassword] = useState("Password");
  const [conection, setConection] = useState("Connection");

  const [modalVisible, setModalVisible] = useState(false);
  const [flag, setFlag] = useState(require("../assets/gb.png"));
  const setLanguage = (lang) => {
    if (lang === "fr") {
      setFlag(require("../assets/fr.png"));
      setName("Nom");
      setPassword("Mot de passe");
      setConection("Connexion");
    }
    if (lang === "spain") {
      setFlag(require("../assets/panama.png"));
      setName("Nombre");
      setPassword("Contraseña");
      setConection("Conexión");
    }
    if (lang === "isr") {
      setFlag(require("../assets/Isr.webp"));
      setName("שם");
      setPassword("סיסמה");
      setConection("להתחבר");
    }
    if (lang === "eng") {
      setFlag(require("../assets/gb.png"));
      setName("Name");
      setPassword("Password");
      setConection("Connection");
    }
    closeModal();
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  if (!loaded) {
    return null;
  }

  // Hébreux vocab : nom : שם
  // Password :  סיסמה
  //  Connexion : חיבור
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.flagPicker}
          title="eng"
          onPress={openModal}
        >
          <Image style={styles.flag} source={flag}></Image>
        </TouchableOpacity>
        <View style={styles.modalContainer}>
          <Modal visible={modalVisible} animationType="fade" transparent={true}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setLanguage("fr")}>
                <Image
                  style={styles.flag}
                  source={require("../assets/fr.png")}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLanguage("isr")}>
                <Image
                  style={styles.flag}
                  source={require("../assets/Isr.webp")}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLanguage("spain")}>
                <Image
                  style={styles.flag}
                  source={require("../assets/panama.png")}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLanguage("eng")}>
                <Image
                  style={styles.flag}
                  source={require("../assets/gb.png")}
                ></Image>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
      <Text style={styles.title}> Doggies</Text>
      <TextInput placeholder={name} style={styles.input}></TextInput>
      <TextInput
        keyboardAppearance="dark"
        style={styles.input}
        placeholder={password}
      ></TextInput>

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("Tabs")}
      >
        <Text style={styles.buttonText}>{conection}</Text>
      </TouchableOpacity>
      <Text
        onPress={() =>
          Linking.openURL(
            "https://guillaumemaignan.github.io/guillaumeMaignan/"
          )
        }
        style={styles.credit}
      >
        Powered by Guillaume Maignan
      </Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgb(83, 113, 136)" },
  header: {
    // marginBottom: 40,
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "flex-end",
  },
  title: {
    padding: 33,
    fontFamily: "Hiladous",
    fontSize: 80,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    fontSize: 30,
    margin: 20,
    backgroundColor: "rgb(238, 238, 238)",
    borderColor: "black",
    height: 100,
    borderRadius: 30,
  },
  button: {
    fontSize: 30,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    justifyContent: "center",
    height: 50,
    width: 150,
    backgroundColor: "rgb(225, 212, 187)",
    borderRadius: 30,
  },
  buttonText: { fontSize: 20 },
  credit: { bottom: -160, alignSelf: "center", color: "rgb(211, 211, 211)" },
  flag: { margin: 2, height: 30, width: 45, borderRadius: 5 },
  flagPicker: { alignItems: "flex-end", margin: 10 },
  modalContainer: {
    // position: "absolute",
    // top: 40,
    // right: 0,
  },
  modalContent: {
    height: "auto",
    margin: 11,
    marginTop: 30,
    borderRadius: 10,
    width: 46,
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "white",
  },
});
export default Landing;
