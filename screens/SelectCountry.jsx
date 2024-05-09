import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SelectCountry = () => {
  const navigation = useNavigation();
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountrySelect = async (country) => {
    try {
      await AsyncStorage.setItem("country", country);
      navigation.navigate("SelectCity");
    } catch (error) {
      console.error("Error saving country to AsyncStorage:", error);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCountries(filtered);
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
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={search}
              placeholderTextColor="white"
              onChangeText={handleSearch}
            />
          </View>
          <FlatList
            style={styles.flatlist}
            data={filteredCountries}
            keyExtractor={(item) => item.name.common}
            renderItem={({ item }) => (
              <View style={styles.countryItem}>
                <Button
                  title={item.name.common}
                  onPress={() => handleCountrySelect(item.name.common)}
                />
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
  countryItem: {
    marginVertical: 5,
  },
});

export default SelectCountry;
