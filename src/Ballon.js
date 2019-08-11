import React from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

const BUBBLE_WIDTH = 100;

export default props => {
  const { text, containerStyle, color, textStyle } = props;
  return (
    <Animated.View style={[containerStyle, { alignItems: "center" }]}>
      <Animated.View
        style={{
          padding: 2,
          backgroundColor: color,
          borderRadius: 5,
          maxWidth: BUBBLE_WIDTH
        }}
      >
        <Text style={textStyle}>{text}</Text>
      </Animated.View>
      <View
        style={{
          width: 10,
          height: 10,
          borderWidth: 5,
          borderColor: "transparent",
          borderTopColor: color,

          backgroundColor: "transparent",
          flexDirection: "row"
        }}
      />
    </Animated.View>
  );
};
