import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react"; // Importing useState hook
import react from "react";
import Toast from "react-native-toast-message";

// Home component
const Home = () => {
  // Function to format date string
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
  const [data, setData] = useState(null); // State for storing weather data
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  useFocusEffect(
    react.useCallback(() => {
      const fetchWeather = async () => {
        setIsLoading(true); // Set loading state to true when fetching starts
        try {
          const con = await AsyncStorage.getItem("city");
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=908601d4689e419798a74550242804&q=${con}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch weather");
          }
          const res = await response.json();
          if (res) {
            setData(res);
            setIsLoading(false); // Set loading state to false when data is fetched
          }
        } catch (error) {
          console.error("Error fetching weather:", error);
          setIsLoading(false); // Set loading state to false in case of error
          Toast.show({
            type: "error",
            text1: "Error",
            text2:
              "Failed to fetch weather. Please check your internet connection.",
          });
        }
      };
      fetchWeather(); // Fetch weather data when component gains focus
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {isLoading && ( // Display loading indicator if data is loading
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      )}
      {!isLoading &&
        data && ( // Display weather data if available and not loading
          <>
            <View style={styles.home}>
              <View style={[styles.rectangle, styles.rectanglePosition1]} />
              <View
                style={[styles.rectangleCopy, styles.mostlySunnyShadowBox]}
              />
              <View style={[styles.rectangleContainer, styles.group12Layout]}>
                <View style={[styles.rectangle3, styles.rectanglePosition]} />
                <View style={styles.ovalGroup}>
                  <Text style={[styles.text2, styles.textPosition1]}>32</Text>
                </View>
                <Text style={[styles.text3, styles.textPosition]}>14:00</Text>
                <Image
                  style={[styles.mostlySunnyCopyIcon, styles.iconLayout4]}
                  contentFit="cover"
                  source={require("../assets/mostly-sunny-copy.png")}
                />
              </View>
              <View style={[styles.frameParent, styles.group13Layout]}>
                <View
                  style={[styles.ovalContainer, styles.group11CopyPosition]}
                >
                  <Text style={[styles.text4, styles.textTypo]}>33</Text>
                </View>
                <View style={[styles.group11Copy, styles.group11CopyPosition]}>
                  <Text style={[styles.text5, styles.textPosition]}>24</Text>
                </View>
                <Text style={[styles.monNov17, styles.textPosition]}>
                  Mon, Nov 17
                </Text>
                <Image
                  style={[
                    styles.mostlySunnyCopyIcon1,
                    styles.rectanglePosition,
                  ]}
                  contentFit="cover"
                  source={require("../assets/mostly-sunny-copy.png")}
                />
              </View>
              <View style={[styles.frameGroup, styles.kmParentPosition]}>
                <View style={[styles.groupView, styles.rectanglePosition]}>
                  <Text style={[styles.text4, styles.textTypo]}>33</Text>
                  {/* here add the real feel */}
                </View>
                <Text style={[styles.realFeel, styles.textPosition]}>
                  Real Feel
                </Text>
              </View>
              <View style={[styles.kmParent, styles.kmParentPosition]}>
                <Text style={[styles.km, styles.textTypo]}>5km</Text>
                <Text style={[styles.realFeel, styles.textPosition]}>
                  Visibility
                </Text>
              </View>
              <View style={[styles.parent, styles.groupPosition]}>
                <Text style={[styles.text7, styles.textTypo]}>0</Text>
                <Text style={[styles.realFeel, styles.textPosition]}>
                  UV Index
                </Text>
              </View>
              <View style={[styles.group, styles.groupPosition]}>
                <Text style={[styles.text8, styles.textTypo]}>
                  {data.current.humidity}%
                </Text>
                {/* here add the humidity feel */}

                <Text style={[styles.realFeel, styles.textPosition]}>
                  Humidity
                </Text>
              </View>

              {/* rest of this static data so don't change that from here to */}
              <View style={[styles.group13Copy, styles.group13Layout]}>
                <View
                  style={[styles.ovalContainer, styles.group11CopyPosition]}
                >
                  <Text style={[styles.text4, styles.textTypo]}>30</Text>
                </View>
                <View style={[styles.group11Copy, styles.group11CopyPosition]}>
                  <Text style={[styles.text5, styles.textPosition]}>23</Text>
                </View>
                <Text style={[styles.monNov17, styles.textPosition]}>
                  Tue, Nov 18
                </Text>
                <Image
                  style={[
                    styles.mostlySunnyCopyIcon1,
                    styles.rectanglePosition,
                  ]}
                  contentFit="cover"
                  source={require("../assets/clouds.png")}
                />
              </View>
              <View style={[styles.group13Copy2, styles.group13Layout]}>
                <View
                  style={[styles.ovalContainer, styles.group11CopyPosition]}
                >
                  <Text style={[styles.text4, styles.textTypo]}>30</Text>
                </View>
                <View style={[styles.group11Copy, styles.group11CopyPosition]}>
                  <Text style={[styles.text5, styles.textPosition]}>24</Text>
                </View>
                <Text style={[styles.monNov17, styles.textPosition]}>
                  Wed, Nov 19
                </Text>
                <Image
                  style={[
                    styles.mostlySunnyCopyIcon1,
                    styles.rectanglePosition,
                  ]}
                  contentFit="cover"
                  source={require("../assets/rainy-lightning.png")}
                />
              </View>
              <View style={[styles.group13Copy3, styles.group13Layout]}>
                <View
                  style={[styles.ovalContainer, styles.group11CopyPosition]}
                >
                  <Text style={[styles.text4, styles.textTypo]}>28</Text>
                </View>
                <View style={[styles.group11Copy, styles.group11CopyPosition]}>
                  <Text style={[styles.text5, styles.textPosition]}>22</Text>
                </View>
                <Text style={[styles.monNov17, styles.textPosition]}>
                  Thu, Nov 20
                </Text>
                <Image
                  style={[
                    styles.mostlySunnyCopyIcon1,
                    styles.rectanglePosition,
                  ]}
                  contentFit="cover"
                  source={require("../assets/rainy.png")}
                />
              </View>
              <View style={[styles.group13Copy4, styles.group13Layout]}>
                <View
                  style={[styles.ovalContainer, styles.group11CopyPosition]}
                >
                  <Text style={[styles.text4, styles.textTypo]}>28</Text>
                </View>
                <View style={[styles.group11Copy, styles.group11CopyPosition]}>
                  <Text style={[styles.text5, styles.textPosition]}>22</Text>
                </View>
                <Text style={[styles.monNov17, styles.textPosition]}>
                  Fri, Nov 21
                </Text>
                <Image
                  style={[
                    styles.mostlySunnyCopyIcon1,
                    styles.rectanglePosition,
                  ]}
                  contentFit="cover"
                  source={require("../assets/rainy.png")}
                />
              </View>
              <View style={[styles.group13Copy5, styles.group13Layout]}>
                <View
                  style={[styles.ovalContainer, styles.group11CopyPosition]}
                >
                  <Text style={[styles.text4, styles.textTypo]}>31</Text>
                </View>
                <View style={[styles.group11Copy, styles.group11CopyPosition]}>
                  <Text style={[styles.text5, styles.textPosition]}>23</Text>
                </View>
                <Text style={[styles.monNov17, styles.textPosition]}>
                  Sat, Nov 22
                </Text>
                <Image
                  style={[
                    styles.mostlySunnyCopyIcon1,
                    styles.rectanglePosition,
                  ]}
                  contentFit="cover"
                  source={require("../assets/mostly-sunny-copy.png")}
                />
              </View>
              <View style={[styles.group12Copy, styles.group12Layout]}>
                <View style={[styles.rectangle3, styles.rectanglePosition]} />
                <View style={styles.ovalGroup}>
                  <Text style={[styles.text2, styles.textPosition1]}>32</Text>
                </View>
                <Text style={[styles.text3, styles.textPosition]}>15:00</Text>
                <Image
                  style={[styles.mostlySunnyCopyIcon, styles.iconLayout4]}
                  contentFit="cover"
                  source={require("../assets/mostly-sunny-copy.png")}
                />
              </View>
              <View style={[styles.group12Copy2, styles.group12Layout]}>
                <View style={[styles.rectangle3, styles.rectanglePosition]} />
                <View style={styles.ovalGroup}>
                  <Text style={[styles.text2, styles.textPosition1]}>31</Text>
                </View>
                <Text style={[styles.text3, styles.textPosition]}>16:00</Text>
                <Image
                  style={[styles.mostlySunnyCopyIcon, styles.iconLayout4]}
                  contentFit="cover"
                  source={require("../assets/cloudy-sunny.png")}
                />
              </View>
              <View style={[styles.group12Copy3, styles.group12Layout]}>
                <View style={[styles.rectangle3, styles.rectanglePosition]} />
                <View style={styles.ovalGroup}>
                  <Text
                    style={[styles.text2, styles.textPosition1]}
                  >{`30 `}</Text>
                </View>
                <Text style={[styles.text3, styles.textPosition]}>17:00</Text>
                <Image
                  style={[styles.mostlySunnyCopyIcon, styles.iconLayout4]}
                  contentFit="cover"
                  source={require("../assets/cloudy-sunny.png")}
                />
              </View>
              <View style={[styles.group12Copy4, styles.group12Layout]}>
                <View style={[styles.rectangle3, styles.rectanglePosition]} />
                <View style={styles.ovalGroup}>
                  <Text style={[styles.text2, styles.textPosition1]}>29</Text>
                </View>
                <Text style={[styles.text3, styles.textPosition]}>18:00</Text>
                <Image
                  style={[styles.mostlySunnyCopyIcon, styles.iconLayout4]}
                  contentFit="cover"
                  source={require("../assets/cloudy.png")}
                />
              </View>
              <Text style={[styles.today, styles.todayTypo]}>Today</Text>
              <Text style={[styles.everyDay, styles.todayTypo]}>Every day</Text>
              <Text style={[styles.detail, styles.todayTypo]}>Detail</Text>

              <View style={[styles.mostlySunny, styles.rectangle9Layout]}>
                <View style={[styles.rectangle9, styles.rectangle9Layout]} />
                <View style={[styles.group1, styles.groupLayout]}>
                  <View style={[styles.group2, styles.groupLayout]}>
                    <Image
                      style={[styles.ellipse11Icon, styles.iconLayout3]}
                      contentFit="cover"
                      source={{ uri: `https:${data.current.condition.icon}` }}
                    />
                  </View>
                </View>
              </View>
              <Text style={[styles.mostlySunny1, styles.textTypo]}>
                {data.current.condition.text}
              </Text>
              <View style={styles.wrapper}>
                <Text style={[styles.text29, styles.text29Typo]}>
                  {data.current.temp_c}°
                </Text>
              </View>
              <Text style={[styles.sunNovember16, styles.textClr]}>
                {data && formatDate(data.current.last_updated)}
              </Text>
              <View
                style={{
                  textAlign: "center",
                }}
              >
                <Text style={[styles.newMexico, styles.text29Typo]}>
                  {data.location.name}, {data.location.region}
                </Text>
              </View>
              <Pressable
                style={[styles.icoAdd, styles.icoAddLayout]}
                onPress={() => navigation.navigate("SelectCountry")}
              >
                <Image
                  source={require("../assets/addIcon12.png")}
                  style={styles.categoryImage}
                />
              </Pressable>
              <Image
                style={[styles.dividerIcon, styles.iconLayout]}
                contentFit="cover"
                source={require("../assets/divider.png")}
              />
              <Image
                style={[styles.divider2Icon, styles.iconLayout]}
                contentFit="cover"
                source={require("../assets/divider.png")}
              />
            </View>
          </>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rectanglePosition1: {
    width: 375,
    left: 0,
    position: "absolute",
  },
  ovalParentLayout: {
    height: 17,
    width: 40,
    top: 489,
    position: "absolute",
    overflow: "hidden",
  },
  iconLayout4: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  textClr: {
    color: Color.colorDimgray,
    lineHeight: 17,
    fontFamily: FontFamily.robotoRegular,
    position: "absolute",
  },
  icoPosition: {
    right: "62.5%",
    width: "37.5%",
    height: "88.24%",
    left: "0%",
    position: "absolute",
  },
  rectanglePosition: {
    bottom: "0%",
    top: "0%",
    height: "100%",
    right: "0%",
    position: "absolute",
  },
  mostlySunnyShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowColor: "rgba(33, 23, 114, 0.2)",
  },
  group12Layout: {
    height: 79,
    width: 48,
    top: 600,
    position: "absolute",
    overflow: "hidden",
  },
  textPosition1: {
    color: Color.colorWhite,
    lineHeight: 17,
    fontSize: FontSize.size_sm,
    top: "50%",
    marginTop: -8.5,
  },
  textPosition: {
    color: Color.colorGainsboro,
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 17,
    top: "50%",
    position: "absolute",
  },
  group13Layout: {
    height: 24,
    width: 327,
    left: 24,
    position: "absolute",
    overflow: "hidden",
  },
  group11CopyPosition: {
    bottom: "12.5%",
    top: "16.67%",
    width: "6.42%",
    height: "70.83%",
    position: "absolute",
    overflow: "hidden",
  },
  textTypo: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    textAlign: "left",
    position: "absolute",
  },
  kmParentPosition: {
    top: 1053,
    height: 17,
    position: "absolute",
    overflow: "hidden",
  },
  groupPosition: {
    top: 1089,
    height: 17,
    position: "absolute",
    overflow: "hidden",
  },
  todayTypo: {
    fontSize: FontSize.size_base,
    color: Color.colorWhite,
    left: 24,
    textAlign: "left",
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 17,
    position: "absolute",
  },
  rectangle9Layout: {
    height: 285,
    width: 285,
    position: "absolute",
  },
  groupLayout: {
    height: 238,
    width: 238,
    position: "absolute",
  },
  iconLayout3: {
    width: 143,
    position: "absolute",
  },
  iconLayout2: {
    width: 31,
    height: 11,
    top: 0,
    position: "absolute",
  },
  iconLayout1: {
    height: 31,
    width: 11,
    left: 0,
    position: "absolute",
  },
  text29Typo: {
    color: Color.colorMidnightblue,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    // position: "absolute",
  },
  icoAddLayout: {
    width: 24,
    height: 24,
    position: "absolute",
  },
  rectangleLayout: {
    height: 2,
    borderWidth: 1,
    borderColor: Color.colorGray,
    borderStyle: "solid",
    backgroundColor: Color.colorGainsboro,
    borderRadius: Border.br_12xs,
    width: 18,
    position: "absolute",
  },
  iconLayout: {
    height: 1,
    width: 327,
    left: 24,
    position: "absolute",
  },
  rectangle: {
    backgroundColor: Color.colorGhostwhite,
    top: 0,
    height: 1143,
  },
  ovalIcon: {
    height: "23.53%",
    width: "10%",
    top: "17.65%",
    bottom: "58.82%",
    left: "90%",
    right: "0%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
  },
  text: {
    left: "47.5%",
    textAlign: "left",
    fontSize: FontSize.size_sm,
    marginTop: -8.5,
    top: "50%",
  },
  rectangleParent: {
    left: "0%",
    width: "100%",
  },
  path2Icon: {
    height: "41.33%",
    width: "74.67%",
    top: "29.33%",
    right: "12.67%",
    bottom: "29.33%",
    left: "12.67%",
    position: "absolute",
  },
  icoArrowUp: {
    top: "5.88%",
    bottom: "5.88%",
    left: "0%",
  },
  ovalParent: {
    left: 242,
  },
  icoArrowDown: {
    top: "94.12%",
    bottom: "-82.35%",
    left: "0%",
  },
  ovalCopy4Parent: {
    left: 307,
  },
  rectangleCopy: {
    top: 538,
    shadowRadius: 10,
    elevation: 10,
    borderTopLeftRadius: Border.br_29xl,
    borderTopRightRadius: Border.br_29xl,
    backgroundColor: Color.colorMidnightblue,
    height: 605,
    width: 375,
    left: 0,
    position: "absolute",
  },
  rectangle3: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorIndigo,
    left: "0%",
    width: "100%",
  },
  ovalIcon1: {
    width: 4,
    height: 4,
  },
  text2: {
    left: "0%",
    textAlign: "left",
    fontFamily: FontFamily.robotoRegular,
    color: Color.colorWhite,
    position: "absolute",
  },
  ovalGroup: {
    height: "21.52%",
    width: "43.75%",
    top: "36.71%",
    right: "27.08%",
    bottom: "41.77%",
    left: "29.17%",
    position: "absolute",
    overflow: "hidden",
  },
  text3: {
    marginTop: -30.5,
    left: "18.75%",
    textAlign: "center",
    fontSize: FontSize.size_xs,
  },
  mostlySunnyCopyIcon: {
    height: "30.38%",
    width: "50%",
    top: "62.03%",
    right: "25%",
    bottom: "7.59%",
    left: "25%",
    position: "absolute",
  },
  rectangleContainer: {
    left: 24,
  },
  text4: {
    color: Color.colorWhite,
    lineHeight: 17,
    fontSize: FontSize.size_sm,
    top: "50%",
    marginTop: -8.5,
    left: "0%",
  },
  ovalContainer: {
    right: "26.3%",
    left: "67.28%",
  },
  text5: {
    left: "0%",
    textAlign: "left",
    fontSize: FontSize.size_sm,
    marginTop: -8.5,
  },
  group11Copy: {
    right: "14.37%",
    left: "79.2%",
  },
  monNov17: {
    marginTop: -8,
    fontSize: FontSize.size_xs,
    left: "0%",
    textAlign: "left",
  },
  mostlySunnyCopyIcon1: {
    width: "7.34%",
    left: "92.66%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  frameParent: {
    top: 753,
  },
  groupView: {
    width: "26.25%",
    left: "73.75%",
    overflow: "hidden",
  },
  realFeel: {
    fontSize: FontSize.size_xs,
    left: "0%",
    textAlign: "left",
    marginTop: -8.5,
    color: Color.colorGainsboro,
  },
  frameGroup: {
    width: 80,
    left: 24,
  },
  km: {
    left: "66.27%",
    color: Color.colorWhite,
    lineHeight: 17,
    fontSize: FontSize.size_sm,
    top: "50%",
    marginTop: -8.5,
  },
  kmParent: {
    width: 83,
    left: 188,
  },
  text7: {
    left: "87.88%",
    color: Color.colorWhite,
    lineHeight: 17,
    fontSize: FontSize.size_sm,
    top: "50%",
    marginTop: -8.5,
  },
  parent: {
    width: 66,
    left: 188,
  },
  text8: {
    left: "68.24%",
    color: Color.colorWhite,
    lineHeight: 17,
    fontSize: FontSize.size_sm,
    top: "50%",
    marginTop: -8.5,
  },
  group: {
    width: 85,
    left: 24,
  },
  group13Copy: {
    top: 793,
  },
  group13Copy2: {
    top: 833,
  },
  group13Copy3: {
    top: 873,
  },
  group13Copy4: {
    top: 913,
  },
  group13Copy5: {
    top: 953,
  },
  group12Copy: {
    left: 88,
  },
  group12Copy2: {
    left: 152,
  },
  group12Copy3: {
    left: 216,
  },
  group12Copy4: {
    left: 280,
  },
  group12Copy5: {
    left: 344,
  },
  today: {
    top: 572,
  },
  everyDay: {
    top: 720,
  },
  detail: {
    top: 1016,
  },
  rectangle9: {
    backgroundColor: Color.colorWhitesmoke,
    opacity: 0,
    left: 0,
    top: 0,
  },
  ellipse11Icon: {
    top: 48,
    left: 48,
    height: 143,
  },
  line54Icon: {
    left: 0,
  },
  line64Icon: {
    left: 207,
  },
  group4: {
    top: 113,
    height: 11,
    width: 238,
    left: 0,
    position: "absolute",
  },
  groupIcon: {
    top: 33,
    left: 33,
    width: 171,
    height: 171,
    position: "absolute",
  },
  line52Icon: {
    top: 207,
  },
  line62Icon: {
    top: 0,
  },
  group5: {
    left: 113,
    width: 11,
    height: 238,
    top: 0,
    position: "absolute",
  },
  group2: {
    left: 0,
    top: 0,
  },
  groupIcon2: {
    top: 94,
    left: 95,
    height: 96,
  },
  group1: {
    top: 24,
    left: 24,
  },
  mostlySunny: {
    top: 111,
    left: 45,
    shadowRadius: 28,
    elevation: 28,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowColor: "rgba(33, 23, 114, 0.2)",
  },
  mostlySunny1: {
    top: 403,
    fontSize: FontSize.size_5xl,
    color: "#9f93ff",
    left: 24,
  },
  text29: {
    marginTop: -42.5,
    fontSize: 72,
    left: "0%",
    textAlign: "left",
    top: "50%",
  },
  wrapper: {
    top: 436,
    width: 112,
    height: 85,
    left: 24,
    position: "absolute",
    overflow: "hidden",
  },
  sunNovember16: {
    top: 78,
    left: 139,
    textAlign: "center",
    fontSize: FontSize.size_xs,
  },
  newMexico: {
    top: 56,
    fontSize: FontSize.size_lg,
    textAlign: "center",
  },
  rectangle10: {
    left: 0,
    top: 0,
  },
  rectangleCopy2: {
    top: 8,
    left: 0,
  },
  rectangleCopy21: {
    top: 18,
    left: 8,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
  },
  rectangleCopy2Parent: {
    top: 3,
    left: 3,
    height: 18,
    width: 18,
    position: "absolute",
  },
  icoAdd: {
    top: 55,
    left: 324,
  },
  dotsIcon: {
    top: 101,
    left: 166,
    width: 44,
    height: 5,
    position: "absolute",
  },
  dividerIcon: {
    top: 701,
  },
  divider2Icon: {
    top: 997,
  },
  home: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    overflow: "hidden",
    height: 1143,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
