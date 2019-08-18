import React from "react";
import { TextInput, View } from "react-native";
import Animated from "react-native-reanimated";

const BUBBLE_WIDTH = 100;

type Props = {
  color: string,
  text: string
};
export default class Ballon extends React.Component<Props> {
  static defaultProps = {
    color: "#f3f"
  };
  text = React.createRef();
  setText = text => {
    this.text.current.setNativeProps({ text });
  };
  render() {
    const { containerStyle, color, textStyle } = this.props;

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
          <TextInput
            ref={this.text}
            style={[{ paddingVertical: -25 }, textStyle]}
            text={""}
          />
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
  }
}
