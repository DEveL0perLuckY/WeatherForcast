import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import Toast from "react-native-toast-message";

// Component for selecting a city
const SelectCity = ({ navigation }) => {
  // State variables
  const [cities, setCities] = useState([]); // List of all cities
  const [search, setSearch] = useState(""); // Search query
  const [filteredCities, setFilteredCities] = useState([]); // Filtered list of cities based on search query
  const { setIsNewUser } = useContext(AuthContext); // Context for authentication
  const [country, setCountry] = useState(""); // Selected country

  // Fetch cities data when component mounts
  useEffect(() => {
    fetchCities();
  }, []);

  // Function to fetch list of cities for the selected country
  const fetchCities = async () => {
    try {
      // Get selected country from AsyncStorage
      const con = await AsyncStorage.getItem("country");
      setCountry(con);
      // Fetch cities data from API
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        { country: con }
      );
      const data = response.data.data;
      // Set cities data and initialize filtered cities with all cities
      setCities(data);
      setFilteredCities(data);
    } catch (error) {
      // Handle error fetching cities
      console.error("Error fetching cities:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch cities. Please check your internet connection.",
      });
    }
  };

  // Function to handle city selection
  const handleCitySelect = async (city) => {
    try {
      // Save selected city to AsyncStorage
      await AsyncStorage.setItem("city", city);
      // Update isNewUser status in authentication context
      setIsNewUser(false);
      // Navigate to Home screen
      navigation.navigate("Home");
    } catch (error) {
      // Handle error saving city
      console.error("Error saving city to AsyncStorage:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save city. Please try again.",
      });
    }
  };

  // Function to handle search input
  const handleSearch = (text) => {
    setSearch(text);
    // Filter cities based on search query
    const filtered = cities.filter(
      (city) =>
        typeof city === "string" &&
        city.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  // JSX rendering
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        locations={[0, 0.5, 1]}
        colors={["#F0F0F0", "#D8D8D8", "#B0B0B0"]}
      />
      <Text style={styles.title}>{country}</Text>
      <Text style={styles.title}>Select Your City</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        style={styles.flatlist}
        data={filteredCities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cityItem}>
            <Button title={item} onPress={() => handleCitySelect(item)} />
          </View>
        )}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  searchContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  flatlist: {
    width: "80%",
    marginBottom: 20,
  },
  cityItem: {
    marginBottom: 10,
  },
});

export default SelectCity;
