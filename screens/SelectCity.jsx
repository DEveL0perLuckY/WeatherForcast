import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "./AuthContext";

const SelectCity = () => {
  const { setIsNewUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const con = await AsyncStorage.getItem("country");
      setCountry(con);
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        { country: con }
      );
      const data = response.data.data;
      setCities(data);
      setFilteredCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = async (city) => {
    try {
      await AsyncStorage.setItem("city", city);
      setIsNewUser(false);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving city to AsyncStorage:", error);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = cities.filter(
      (city) =>
        typeof city === "string" &&
        city.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        locations={[0, 0.5, 1]}
        colors={["#3C2DB9", "#211772", "#342798"]}
      />
      <ActivityIndicator animating={loading} size="large" color="#FFBA25" />
      {!loading && (
        <>
          <Text style={styles.title}>{country}</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={search}
              onChangeText={handleSearch}
              placeholderTextColor="white"
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
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  searchContainer: {
    width: "80%",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: "white",
  },
  flatlist: {
    width: "80%",
  },
  cityItem: {
    marginVertical: 5,
  },
});

export default SelectCity;
