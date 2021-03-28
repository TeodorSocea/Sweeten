import MainService from "./mainService";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Button,
  TouchableHighlight,
} from "react-native";

import React from "react";

class ImageLoader extends React.Component {
  state = {
    opacity: new Animated.Value(0),
  };

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    console.log(this.props.style);
    return (
      <>
        <Animated.Image
          onLoad={this.onLoad}
          source={require("../assets/sweeten_logo.png")}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0.1, 1],
                  }),
                },
              ],
            },
            this.props.style,
          ]}
        />
      </>
    );
  }
}

export default class LoadingScreen extends React.Component {
  state = {
    loaded: false,
  };

  constructor() {
    super();
    MainService.load(() => this.setState({ loaded: true }));
  }

  render() {
    const styles = this.props.style;
    return (
      <View style={styles}>
        <Text>Pog</Text>
        {this.state.loaded == true ? (
          <>
            <ImageLoader style={{ resizeMode: "contain" }} />
          </>
        ) : (
          <Text>Loading</Text>
        )}
      </View>
    );
  }
}

const stlyes = StyleSheet.create({
  body: {
    backgroundColor: "cornflowerblue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
