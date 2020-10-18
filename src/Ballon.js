import React from "react";
import { TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

const BUBBLE_WIDTH = 100;

type Props = {
  /**
   * background color of the ballon
   */
  color: string,

  /**
   * the style for the container view
   */
  containerStyle:ViewStyleProp,

  /**
   * the style for the TextInput inside ballon
   */
  textStyle: TextStyleProp,
};
/**
 * a component to show text inside a ballon
 */
export default class Ballon extends React.Component<Props> {
  static defaultProps = {
    color: "#f3f"
  };
  text = React.createRef();

  /**
   * sets the text inside the ballon. it uses `setNativeProps` to perform fast while sliding
   */
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
