import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const GetStarted = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        locations={[0, 0.5, 1]}
        colors={["#3C2DB9", "#211772", "#342798"]}
      />

      <View style={styles.content}>
        <Image
          source={require("../assets/gettingStarted.png")}
          style={styles.icon}
        />
        <View style={styles.weatherParent}>
          <Text style={styles.weather}>Weather</Text>
          <Text style={styles.forecastApp}>Forecast App.</Text>
          <Text style={styles.forecastAppClr}>
            It's the newest weather app. It has a bunch of features and that
            includes most of the ones that every weather app has.
          </Text>
        </View>
        <Pressable
          style={styles.btnSecondary}
          onPress={() => navigation.navigate("SelectCountry")}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  weatherParent: {
    margin: 23,
    marginVertical: 40,
  },
  weather: {
    fontSize: 44,
    fontWeight: "500",
    color: "#FFBA25",
  },
  forecastApp: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  forecastAppClr: {
    marginTop: 20,
    fontSize: 16,
    color: "white",
    flexWrap: "wrap",
  },
  btnSecondary: {
    backgroundColor: "#FFBA25",
    padding: 15,
    borderRadius: 20,
    width: 200, // Adjust width as needed
    alignItems: "center",
  },
  getStartedText: {
    fontSize: 18,
    color: "white",
  },
});

export default GetStarted;
