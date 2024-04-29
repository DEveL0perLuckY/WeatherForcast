import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const SelectCountry = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch countries. Please check your internet connection.',
      });
    }
  };

  const handleCountrySelect = async (country)  => {
    try {
      await AsyncStorage.setItem('country', country);
      navigation.navigate("SelectCity");
    } catch (error) {
      console.error("Error saving country to AsyncStorage:", error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save country. Please try again.',
      });
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(text.toLowerCase()));
    setFilteredCountries(filtered);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        locations={[0, 0.5, 1]}
        colors={["#F0F0F0", "#D8D8D8", "#B0B0B0"]}
      />
      <Text style={styles.title}>Select Your Country</Text>
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
        data={filteredCountries}
        keyExtractor={(item) => item.name.common}
        renderItem={({ item }) => (
          <View style={styles.countryItem}>
            <Button title={item.name.common} onPress={() => handleCountrySelect(item.name.common)} />
          </View>
        )}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
    justifyContent: "center",
    alignItems: "center",
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
  countryItem: {
    marginBottom: 10,
  },
});

export default SelectCountry;
