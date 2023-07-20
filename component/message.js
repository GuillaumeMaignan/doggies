import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MessageContainer = ({ senderName, messageContent, timestamp }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.senderName}>{senderName}</Text>
      <Text style={styles.messageContent}>{messageContent}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
};

const message = () => {
  return (
    <View style={styles.container}>
      <Text>message</Text>
      <MessageContainer
        senderName="John Doe"
        messageContent="Salut ! Comment ça va ?"
        timestamp="2023-07-01 10:30"
      />
      <MessageContainer
        senderName="Jane Smith"
        messageContent="Salut John ! Ça va bien, merci. Et toi ?"
        timestamp="2023-07-01 10:32"
      />
      <MessageContainer
        senderName="John Doe"
        messageContent="Ça va aussi, merci ! Qu'est-ce que tu fais de beau aujourd'hui ?"
        timestamp="2023-07-01 10:35"
      />
      {/* Ajoutez d'autres messages faux ici */}
    </View>
  );
};

export default message;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "rgb(83, 113, 136)",
    // alignContent: "center",
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageContent: {
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
});
