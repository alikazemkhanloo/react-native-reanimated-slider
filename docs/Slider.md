`Slider` (component)
====================

The slider component to show progress. you should install and link `react-native-reanimated`
and `react-native-gesture-handler` to be able to use it. All animated values must be imported from
`react-native-reanimated`.

## Usage

```js
import Slider from 'react-native-reanimated-slider';
...

renderBallon=()=>(
 <View>
   <TextInput ref={this.text} />
 </View>
)

setBallonText=(text)=>{
  this.text.setNativeProps({text})
}

render(){
  return (
    <Slider
      style={{ flex: 1 }}
      minimumTrackTintColor="#fff"
      thumbTintColor="#fff"
      ballon={value => this.convertSecondToTime(value)}
      progress={this.currentTime}
      min={new Reanimated.Value(0)}
      cache={this.playableDuration}
      max={this.seekableDuration}
      onSlidingStart={this.slidingStart}
      onSlidingComplete={this.slidingComplete}

      // only if you want to render custom ballon for sliding
      renderBallon={this.renderBallon}
      setBallonText={this.setBallonText}
    />
  )
}
```

Props
-----

### `ballon` (required)

a function that gets the current value of the slider as you slide it,
and returns a string to be used in the ballon

type: `number => string`


### `ballonTranslateY`

value to pass to the container of the ballon as `translateY`

type: `number`
defaultValue: `-25`


### `borderColor`

color of the border of the slider

type: `string`
defaultValue: `"#fff"`


### `cache`

an AnimatedValue from `react-native-reanimated` library which is the
curren value of the cache. the cache is optional and will be rendered behind
the main progress indicator.

type: `Animated.Value`


### `cacheTrackTintColor`

type: `string`
defaultValue: `"#777"`


### `max` (required)

an AnimatedValue from `react-native-reanimated` library which is the
maximum value of the slider.

type: `Animated.Value`


### `maximumTrackTintColor`

type: `string`
defaultValue: `"transparent"`


### `min` (required)

an AnimatedValue from `react-native-reanimated` library which is the
minimum value of the slider.

type: `Animated.Value`


### `minimumTrackTintColor`

type: `string`
defaultValue: `"#f3f"`


### `onSlidingComplete` (required)

callback called when the users stops sliding. the new value will be passed as
argument

type: `number => void`


### `onSlidingStart` (required)

callback called when the users starts sliding

type: `() => void`


### `progress` (required)

an AnimatedValue from `react-native-reanimated` library which is the
current value of the slider.

type: `Animated.Value`


### `renderBallon`

render custom Ballon to show when sliding.

type: `() => React.ReactNode`


### `renderThumbImage`

render custom thumb image.

type: `() => React.ReactNode`


### `setBallonText`

this function will be called while sliding, and should set the text inside your custom
ballon.

type: `string => void`


### `style`

style for the container view

type: `any`


### `thumbOffset`

thumb offset from the end of seek

type: `number`
defaultValue: `7`

