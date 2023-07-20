import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import data from "./data";
function Profil() {
  function CalendarTable() {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Total"];
    const count = useSelector((state) => state.counter.value);

    // console.log(data);
    // let payOfTheDay = count.map((i, info) => {
    //   return <Text>{data[info].money}</Text>;
    // });
    let payOfTheDay = count.reduce((total, info) => {
      return total + data[info].money;
    }, 0);
    // console.log(mone, "money");

    return (
      <View style={styles.calendar}>
        {/* En-tête du tableau */}
        <View style={styles.row}>
          {daysOfWeek.map((day, index) => (
            <View
              style={[
                styles.cell,
                index === 5 && styles.verticalLine, // Add the vertical line style
              ]}
              key={day}
            >
              <Text style={styles.headerText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Reste du tableau */}
        {/* ... */}
        <Text style={styles.today}>Today: {payOfTheDay}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}> Guillaume Maignan </Text>
      <View style={styles.buble}>
        <Text style={styles.name}>This Week: </Text>
        <CalendarTable style={styles.calendar}></CalendarTable>
      </View>
      <View style={styles.buble}>
        <Text style={styles.name}>This Month: </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "rgb(83, 113, 136)",
    // alignContent: "center",
  },
  name: {
    textAlign: "center",
    marginTop: 45,
    fontSize: 50,
    fontFamily: "PawWow",
    color: "black",
  },
  buble: {
    backgroundColor: "white",
    marginVertical: 20,
    height: 250,
    borderRadius: 30,
  },
  calendar: { backgroundColor: "white" },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
  verticalLine: {
    borderRightWidth: 1, // Add the vertical line style
    borderRightColor: "gray", // Add the vertical line style
  },
  today: { fontWeight: "bold", marginTop: 4 },
});
export default Profil;
