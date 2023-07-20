import { StatusBar } from "expo-status-bar";
import { StyleSheet, LogBox, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

// LogBox.ignoreAllLogs(); //Ignore all log notifications

import Landing from "./component/Landing";
import Home from "./component/Home";
import Infos from "./component/Infos";
import Profil from "./component/Profil";
import DogsList from "./component/DogsList";
import Map from "./component/Map";
import message from "./component/message";
import store from "./redux/store";
import createDog from "./component/createDog";
const Stack = createStackNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

const TabsNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Home") {
            // iconName = "home";
            return <Ionicons name={"home"} size={25} color={color} />;
          } else if (route.name === "Profil") {
            // iconName = "face-man-profile";
            return (
              <MaterialCommunityIcons
                name="face-man-profile"
                size={25}
                color={color}
              />
            );
          } else if (route.name === "Chat") {
            iconName = "chatbox-ellipses-outline";
            return <Ionicons name={iconName} size={25} color={color} />;
          } else if (route.name === "DogsList") {
            iconName = "ion-ios-paw";
            return <FontAwesome5 name="dog" size={24} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: "rgb(238, 238, 238)", // Tab Bar color
        },
        activeTintColor: "#0984e3",
        inactiveTintColor: "black",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Chat"
        component={message}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen name="DogsList" component={DogsList} />
      <Tab.Screen name="Profil" component={Profil} />

      {/* <Tab.Screen name="Infos" component={Infos} /> */}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Tab.Navigator tabBar={(props) => <TabsNav {...props} />}>
        <Tab.Screen name="Landing" component={Landing} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Tabnav" component={TabsNav} />
        <Tab.Screen name="Profil" component={Profil} />
        <Tab.Screen name="DogsList" component={DogsList} />

        <Tab.Screen name="Infos" component={Infos} />
    
    </Tab.Navigator> */}
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Landing"
        >
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Tabs" component={TabsNav} />
          <Stack.Screen name="CreateDog" component={createDog} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="DogsList" component={DogsList} />
          <Stack.Screen name="Infos" component={Infos} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{ headerShown: false }}
    //     initialRouteName="Landing"
    //   >
    //     <Stack.Screen name="Landing" component={Landing} />
    //     {/* <Stack.Screen name="Tabs" component={TabsNav} /> */}
    //     <Stack.Screen name="Home" component={Home} />

    //     <Stack.Screen name="Infos" component={Infos} />
    //     <Stack.Screen name="Profil" component={Profil} />
    //     {/* <View style={styles.container}> */}
    //     {/* <Landing /> */}
    //     {/* <Home /> */}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
