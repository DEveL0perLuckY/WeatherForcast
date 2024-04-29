import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const GetStarted = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.getStarted}>
      <LinearGradient
        style={styles.rectangle}
        locations={[0, 0.5, 1]}
        colors={["#3C2DB9", "#211772", "#342798"]}
      />
      <Image
        style={styles.ovalCopy3}
        contentFit="cover"
        source={require("../assets/oval-copy-3.png")}
      />
      <Image
        style={styles.ovalCopy4}
        contentFit="cover"
        source={require("../assets/oval-copy-4.png")}
      />
      <View style={[styles.rainyLightningWindySunny, styles.rectangle1Layout]}>
        <View style={[styles.rectangle1, styles.rectangle1Layout]} />
        <View style={styles.group}>
          <View style={[styles.group1, styles.groupLayout]}>
            <Image
              style={styles.ellipse112Icon}
              contentFit="cover"
              source={require("../assets/ellipse-1-12.png")}
            />
            <View style={styles.group2}>
              <Image
                style={[styles.line548Icon, styles.iconLayout1]}
                contentFit="cover"
                source={require("../assets/line-5-48.png")}
              />
              <Image
                style={[styles.line648Icon, styles.iconLayout1]}
                contentFit="cover"
                source={require("../assets/line-6-48.png")}
              />
            </View>
            <Image
              style={styles.groupIcon}
              contentFit="cover"
              source={require("../assets/group7.png")}
            />
            <View style={styles.group3}>
              <Image
                style={[styles.line546Icon, styles.iconLayout]}
                contentFit="cover"
                source={require("../assets/line-5-46.png")}
              />
              <Image
                style={[styles.line646Icon, styles.iconLayout]}
                contentFit="cover"
                source={require("../assets/line-6-46.png")}
              />
            </View>
            <Image
              style={styles.groupIcon}
              contentFit="cover"
              source={require("../assets/group8.png")}
            />
          </View>
          <Image
            style={[styles.groupIcon2, styles.groupLayout]}
            contentFit="cover"
            source={require("../assets/group9.png")}
          />
          <Image
            style={styles.groupIcon3}
            contentFit="cover"
            source={require("../assets/group10.png")}
          />
          <Image
            style={styles.pathIcon}
            contentFit="cover"
            source={require("../assets/path.png")}
          />
        </View>
      </View>
      <View style={styles.weatherParent}>
        <Text style={[styles.weather, styles.weatherFlexBox]}>Weather</Text>
        <Text style={[styles.forecastApp, styles.forecastAppClr]}>
          Forecast App.
        </Text>
        <Text style={[styles.itsTheNewest, styles.forecastAppClr]}>
          Welcome to my Weather App!
        </Text>
      </View>
      <Pressable
        style={styles.btnSecondary}
        onPress={() => navigation.navigate("SelectCountry")}
      >
        <View style={styles.rectangle2} />
        <Text style={[styles.getStarted1, styles.forecastAppClr]}>
          Get Started
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle1Layout: {
    height: 220,
    width: 220,
    position: "absolute",
  },
  groupLayout: {
    height: 124,
    position: "absolute",
  },
  iconLayout1: {
    width: 11,
    height: 6,
    top: 0,
    position: "absolute",
  },
  iconLayout: {
    height: 11,
    width: 6,
    left: 0,
    position: "absolute",
  },
  weatherFlexBox: {
    textAlign: "left",
    left: "0%",
  },
  forecastAppClr: {
    color: Color.colorWhite,
    position: "absolute",
  },
  rectangle: {
    width: 375,
    backgroundColor: "transparent",
    left: 0,
    top: 0,
    position: "absolute",
    height: 812,
  },
  ovalCopy3: {
    top: 513,
    left: -129,
    width: 634,
    height: 634,
    opacity: 0.52,
    position: "absolute",
  },
  ovalCopy4: {
    top: 66,
    left: 1,
    width: 374,
    height: 374,
    opacity: 0.27,
    position: "absolute",
  },
  rectangle1: {
    backgroundColor: Color.colorWhitesmoke,
    opacity: 0,
    left: 0,
    top: 0,
  },
  ellipse112Icon: {
    top: 20,
    left: 20,
    width: 84,
    height: 84,
    position: "absolute",
  },
  line548Icon: {
    left: 0,
  },
  line648Icon: {
    left: 113,
  },
  group2: {
    top: 59,
    height: 6,
    width: 124,
    left: 0,
    position: "absolute",
  },
  groupIcon: {
    top: 17,
    left: 17,
    width: 89,
    height: 89,
    position: "absolute",
  },
  line546Icon: {
    top: 113,
  },
  line646Icon: {
    top: 0,
  },
  group3: {
    left: 59,
    width: 6,
    height: 124,
    top: 0,
    position: "absolute",
  },
  group1: {
    left: 60,
    width: 124,
    height: 124,
    top: 0,
  },
  groupIcon2: {
    top: 32,
    width: 183,
    left: 0,
  },
  groupIcon3: {
    top: 163,
    left: 31,
    width: 109,
    height: 43,
    position: "absolute",
  },
  pathIcon: {
    top: 128,
    left: 68,
    width: 48,
    height: 82,
    position: "absolute",
  },
  group: {
    top: 5,
    left: 18,
    height: 211,
    width: 183,
    position: "absolute",
  },
  rainyLightningWindySunny: {
    top: 143,
    left: 78,
    height: 220,
  },
  weather: {
    marginTop: -91,
    fontSize: 44,
    color: Color.colorOrange,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    top: "50%",
    position: "absolute",
  },
  forecastApp: {
    marginTop: -34,
    fontSize: 36,
    textAlign: "left",
    left: "0%",
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    top: "50%",
  },
  itsTheNewest: {
    height: "32.97%",
    top: "67.03%",
    fontSize: FontSize.size_xs,
    lineHeight: 20,
    fontFamily: FontFamily.robotoRegular,
    textAlign: "left",
    left: "0%",
    width: "100%",
  },
  weatherParent: {
    top: 430,
    left: 36,
    width: 302,
    height: 182,
    position: "absolute",
    overflow: "hidden",
  },
  rectangle2: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorOrange,
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  getStarted1: {
    marginTop: -11,
    left: "31.36%",
    fontSize: FontSize.size_base,
    textAlign: "center",
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    top: "50%",
  },
  btnSecondary: {
    top: 654,
    height: 48,
    width: 220,
    left: 78,
    position: "absolute",
    overflow: "hidden",
  },
  getStarted: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    overflow: "hidden",
    height: 812,
    width: "100%",
  },
});

export default GetStarted;
