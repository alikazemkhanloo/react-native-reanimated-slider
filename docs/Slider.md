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



### `ballonTranslateY`

value to pass to the container of the ballon as `translateY`

defaultValue: `-25`


### `borderColor`

color of the border of the slider

defaultValue: `"#fff"`


### `cache`

an AnimatedValue from `react-native-reanimated` library which is the
curren value of the cache. the cache is optional and will be rendered behind
the main progress indicator.



### `cacheTrackTintColor`

defaultValue: `"#777"`


### `max` (required)

an AnimatedValue from `react-native-reanimated` library which is the
maximum value of the slider.



### `maximumTrackTintColor`

defaultValue: `"transparent"`


### `min` (required)

an AnimatedValue from `react-native-reanimated` library which is the
minimum value of the slider.



### `minimumTrackTintColor`

defaultValue: `"#f3f"`


### `onSlidingComplete` (required)

callback called when the users stops sliding. the new value will be passed as
argument



### `onSlidingStart` (required)

callback called when the users starts sliding



### `progress` (required)

an AnimatedValue from `react-native-reanimated` library which is the
current value of the slider.



### `renderBallon`

render custom Ballon to show when sliding.



### `renderThumbImage`

render custom thumb image.



### `setBallonText`

this function will be called while sliding, and should set the text inside your custom
ballon.



### `style`

style for the container view



### `thumbOffset`

thumb offset from the end of seek

defaultValue: `7`

