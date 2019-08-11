import React, { Component } from "react";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Ballon from "./Ballon";

const {
  Value,
  event,
  cond,
  eq,
  set,
  clockRunning,
  startClock,
  spring,
  stopClock,
  Extrapolate,
  sub,
  Clock,
  divide,
  call,
  interpolate,
  multiply,
  block,
  or
} = Animated;

const BUBBLE_WIDTH = 100;

class Slider extends Component {
  constructor(props) {
    const { progress, min, max, cache } = props;
    super(props);
    this.gestureState = new Value(0);
    this.x = new Value(0);
    this.width = new Value(0);
    this.progress_x = multiply(divide(progress, sub(max, min)), this.width);
    this.cache_x = multiply(divide(cache, sub(max, min)), this.width);

    this.clamped_x = interpolate(this.x, {
      inputRange: [-0.000000000001, this.width],
      outputRange: [-0.000000000001, this.width],
      extrapolate: Extrapolate.CLAMP
    });
    this.value_x = divide(multiply(this.clamped_x, max), this.width);
    this.onGestureEvent = event([
      {
        nativeEvent: {
          state: this.gestureState,
          x: this.x
        }
      }
    ]);

    this.clock = new Clock();
    this.seek = block([
      // debug("s", this.),
      cond(
        or(
          eq(this.gestureState, State.ACTIVE),
          eq(this.gestureState, State.BEGAN)
        ),
        [
          call([this.value_x], x => {
            this.setState({ ballon: props.ballon(x[0]) });
          }),
          cond(
            eq(this.gestureState, State.BEGAN),
            call([this.value_x], () => props.onSlidingStart())
          ),
          this.clamped_x
        ],
        [
          cond(eq(this.gestureState, State.END), [
            set(this.gestureState, State.UNDETERMINED),
            call([this.value_x], x => props.onSlidingComplete(x[0]))
          ]),
          this.progress_x
        ]
      )
    ]);

    this.spring_state = {
      finished: new Value(0),
      velocity: new Value(0),
      position: new Value(0),
      time: new Value(0)
    };
    this.runspring = ({ toValue }) => {
      const config = {
        damping: 10,
        mass: 1,
        stiffness: 150,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: new Value(0)
      };
      return [
        cond(clockRunning(this.clock), 0, [
          set(this.spring_state.finished, 0),
          set(this.spring_state.velocity, 0),
          // set(this.spring_state.position, from),
          set(config.toValue, toValue),
          startClock(this.clock)
        ]),

        spring(this.clock, this.spring_state, config),
        cond(this.spring_state.finished, [stopClock(this.clock)]),
        this.spring_state.position
      ];
    };

    this.height = cond(
      or(
        eq(this.gestureState, State.BEGAN),
        eq(this.gestureState, State.ACTIVE)
      ),
      [this.runspring({ from: 0, toValue: 1 })],
      cond(
        or(
          eq(this.gestureState, State.UNDETERMINED),
          eq(this.gestureState, State.END)
        ),
        [this.runspring({ from: 1, toValue: 0 })],
        this.spring_state.position
      )
    );

    this.state = { ballon: "" };
  }

  onLayout = ({ nativeEvent }) => {
    this.width.setValue(nativeEvent.layout.width);
  };

  renderBallon = ({ text }) => {
    return <Ballon text={text} color="#f3f" />;
  };

  render() {
    const { ballon } = this.state;
    const { renderBallon, style } = this.props;
    const ballonRenderer = renderBallon || this.renderBallon;
    return (
      <PanGestureHandler
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onGestureEvent}
      >
        <Animated.View
          style={[
            {
              flex: 1,
              height: 30,
              overflow: "visible",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#3330"
            },
            style
          ]}
          onLayout={this.onLayout}
        >
          <Animated.View
            style={{
              width: "100%",
              height: 5,
              borderRadius: 2,
              borderColor: "#fff",
              overflow: "hidden",
              borderWidth: 1,
              backgroundColor: "transparent"
            }}
          >
            <Animated.View
              style={{
                backgroundColor: "#777",
                height: "100%",
                width: this.cache_x,

                position: "absolute"
              }}
            />
            <Animated.View
              style={{
                backgroundColor: "#f3f",
                height: "100%",
                maxWidth: "100%",
                width: this.seek,
                position: "absolute"
              }}
            />
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              bottom: 20,
              left: -50,
              width: BUBBLE_WIDTH,
              opacity: this.height,
              transform: [
                {
                  translateY: 0
                },
                {
                  translateX: this.clamped_x
                },
                {
                  scale: this.height
                }
              ]
            }}
          >
            {ballonRenderer({ text: ballon })}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

export default Slider;
