import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { useSelector } from "react-redux";
import data from "./data";
import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";

export default function Map(props) {
  const count = useSelector((state) => state.counter.value);

  const [firstLat, setFirstLat] = useState(32.0682774);
  const [firstLong, setFirstLong] = useState(34.7792525);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setFirstLat(location.coords.latitude);
      setFirstLong(location.coords.longitude);

      console.log(location.coords.longitude, "loc");
    };
    getPermissions();
  }, []);

  let minLatitude = firstLat;
  let maxLatitude = firstLat;
  let minLongitude = firstLong;
  let maxLongitude = firstLong;

  if (count.length > 0) {
    minLatitude = data[count[0]].latitude;
    maxLatitude = data[count[0]].latitude;
    minLongitude = data[count[0]].longitude;
    maxLongitude = data[count[0]].longitude;
  }

  const MarkerTag = count.map((i, info) => {
    let longitude = data[i].longitude;
    let latitude = data[i].latitude;
    let title = data[i].name;

    minLatitude = Math.min(minLatitude, latitude);
    maxLatitude = Math.max(maxLatitude, latitude);
    minLongitude = Math.min(minLongitude, longitude);
    maxLongitude = Math.max(maxLongitude, longitude);
    return (
      <Marker
        key={i}
        coordinate={{ latitude: latitude, longitude: longitude }}
        title={title}
      >
        <Image style={styles.marker} source={data[i].picture}></Image>
      </Marker>
    );
  });
  let latitudeDelta = Math.abs(maxLatitude - minLatitude) * 1.4;
  let longitudeDelta = Math.abs(maxLongitude - minLongitude) * 1.4;

  let latitude = (maxLatitude + minLatitude) / 2;
  let longitude = (maxLongitude + minLongitude) / 2;

  if (latitudeDelta === 0) {
    latitudeDelta = 0.0019646199999996837;
    longitudeDelta = 0.019646199999996837;
  }

  // if (!MarkerTag || MarkerTag.length === 0) {
  //   latitude = firstLat;
  //   longitude = firstLong;
  // }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <Image
            style={styles.returnImage}
            source={require("../assets/arrowback.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.title}>Map</Text>
      </View>
      <MapView
        showsUserLocation={true}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        style={styles.map}
      >
        {MarkerTag}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(203, 178, 121)",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  returnImage: { height: 45, width: 45, justifyContent: "flex-start" },
  title: {
    flex: 1,
    fontSize: 45,
    fontWeight: "bold",
    fontFamily: "PawWow",
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
  },

  map: {
    width: "100%",
    height: "100%",
  },
  marker: { width: 30, height: 30, borderRadius: 30 },
});
