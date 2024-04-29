import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Home from "./screens/Home";
import SelectCountry from "./screens/SelectCountry";
import SelectCity from "./screens/SelectCity";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStarted from "./screens/GetStarted";
import { AuthContext, AuthProvider } from "./screens/AuthContext";

const Stack = createNativeStackNavigator();

const App = () => {
  const { isNewUser } = React.useContext(AuthContext);

  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isNewUser ? (
          <>
            <Stack.Screen
              name="GetStarted"
              component={GetStarted}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectCountry"
              component={SelectCountry}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="SelectCity"
              component={SelectCity}
              options={{ headerShown: true }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectCountry"
              component={SelectCountry}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="SelectCity"
              component={SelectCity}
              options={{ headerShown: true }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
