import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import SelectCountry from "./screens/SelectCountry";
import SelectCity from "./screens/SelectCity";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStarted from "./screens/GetStarted";
import { AuthContext, AuthProvider } from "./screens/AuthContext";
import { StatusBar } from "react-native";
const Stack = createNativeStackNavigator();

const App = () => {
  const { isNewUser } = useContext(AuthContext);

  // until isNewUser is locading  i have to show something u know
  // war na null pointer exception aa jiye ga
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#211772" barStyle="light-content" />

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
              options={{ headerShown: true, title: "Select Country" }}
            />
            <Stack.Screen
              name="SelectCity"
              component={SelectCity}
              options={{ headerShown: true, title: "Select City" }}
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
              name="SelectCity"
              component={SelectCity}
              options={{ headerShown: true, title: "Select City" }}
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
