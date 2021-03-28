import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { AuthContext } from "./components/context";
import { AuthScreen } from "./components/AuthScreen";
import { Explore } from "./components/Explore";

import * as firebase from "firebase";
import getCreds from "./creds/creds";

//firebase.initializeApp(getCreds());

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const authContext = React.useMemo(() => ({
    signIn: async (userName, password) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(userName, password)
        .catch((error) => console.log(error.code));
    },
    signOut: async () => {
      firebase
        .auth()
        .signOut()
        .catch((error) => {
          console.log(error.code);
        });
    },
    signUp: async (userName, password) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userName, password)
        .catch((error) => console.log(error.code));
    },
  }));

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <>
      <StatusBar hidden />
      <AuthContext.Provider value={authContext}>
        {user != null ? <Explore /> : <AuthScreen />}
      </AuthContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loading: {
    backgroundColor: "cornflowerblue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    padding: 0,
  },
});
