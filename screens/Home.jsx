import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  BackHandler,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const [backButtonPressedOnce, setBackButtonPressedOnce] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (navigation.isFocused()) {
          if (!backButtonPressedOnce) {
            ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
            setBackButtonPressedOnce(true);

            setTimeout(() => {
              setBackButtonPressedOnce(false);
            }, 2000);

            return true;
          } else {
            BackHandler.exitApp();
            return true;
          }
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [backButtonPressedOnce, navigation]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${dayOfWeek}, ${month} ${day}`;
  };

  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchWeather = async () => {
        setIsLoading(true);
        try {
          const city = await AsyncStorage.getItem("city");
          const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=908601d4689e419798a74550242804&q=${city}&days=7`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch weather");
          }
          const currentWeather = await response.json();
          setData(currentWeather);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching weather:", error);
          setIsLoading(false);
        }
      };

      fetchWeather();
    }, [])
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        )}
        {!isLoading && data && (
          <View style={styles.contentContainer}>
            <View style={{ margin: 20 }}>
              <View style={styles.containerCity}>
                <View></View>
                <View>
                  <Text style={styles.containerCityText1}>
                    {data.location.name},{data.location.region}
                  </Text>
                  <Text style={styles.containerCityText2}>
                    {formatDate(data.location.localtime)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SelectCity");
                  }}
                >
                  <Image
                    source={require("../assets/addIcon.png")}
                    style={styles.icon}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.containerIcon}>
                <Image
                  source={{ uri: `https:${data.current.condition.icon}` }}
                  style={styles.icon2}
                ></Image>
              </View>
              <View>
                <Text style={styles.conditionText}>
                  {data.current.condition.text}
                </Text>
                <Text style={styles.conditionTempText}>
                  {data.current.temp_c}°
                </Text>
              </View>
            </View>
            <View style={styles.parentDetials}>
              <Text style={[styles.everyDay, { fontSize: 20 }]}>
                Every day{" "}
              </Text>
              <View style={styles.divider} />
              {data.forecast.forecastday.map((dayData, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  <Text style={styles.everyDayDetails}>
                    {formatDate(dayData.date)}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "50%",
                      // this is not working
                    }}
                  >
                    <Text style={styles.everyDayDetails}>
                      {dayData.day.maxtemp_c}°
                    </Text>
                    <Text style={styles.everyDayDetails}>
                      {dayData.day.mintemp_c}°
                    </Text>

                    <Image
                      source={{ uri: `https:${dayData.day.condition.icon}` }}
                      style={styles.icon3}
                    ></Image>
                  </View>
                </View>
              ))}
              <View style={styles.divider} />
              <Text style={[styles.everyDay, { marginBottom: 15 }]}>
                Detail
              </Text>
              <Text style={{ color: "white", marginBottom: 10 }}>
                Real Feel {"  "} {data.current.feelslike_c}°
              </Text>
              <Text style={{ color: "white", marginBottom: 10 }}>
                Humidity {"  "} {data.current.humidity}%
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F2",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  containerCity: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerCityText1: {
    fontSize: 15,
    textAlign: "center",
    color: "#211772",
    fontWeight: "bold",
  },
  containerCityText2: {
    textAlign: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  icon2: {
    width: 200,
    height: 200,
  },
  containerIcon: {
    alignItems: "center",
    margin: 50,
  },
  conditionText: {
    color: "#9F93FF",
    fontWeight: "bold",
    fontSize: 30,
  },
  conditionTempText: {
    color: "#211772",
    fontWeight: "bold",
    fontSize: 50,
  },
  parentDetials: {
    padding: 30,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#021B79",
  },
  everyDay: {
    color: "white",
    fontSize: 25,
  },
  everyDayDetails: {
    color: "white",
    marginTop: 5,
    marginBottom: 5,
  },
  icon3: {
    width: 35,
    height: 35,
  },
  divider: {
    height: 1,
    backgroundColor: "white",
    marginBottom: 25,
    marginTop: 25,
  },
});

export default Home;
