// import React, { useRef, useState, useEffect } from "react";
// import Carousel, { ParallaxImage } from "react-native-snap-carousel";
// import {
//   View,
//   Text,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
// } from "react-native";
// import { Header } from "react-native-elements";

// const ENTRIES1 = [
//   {
//     title: "Beautiful and dramatic Antelope Canyon",
//     subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
//     illustration: "https://i.postimg.cc/c4q7ry6y/d.jpg",
//   },
//   {
//     title: "Earlier this morning, NYC",
//     subtitle: "Lorem ipsum dolor sit amet",
//     illustration:
//       "https://i.postimg.cc/ZRrg2PMC/e2b0b6c8-296b-4c21-b670-d12c1c81cf00.jpg",
//   },
//   {
//     title: "White Pocket Sunset",
//     subtitle: "Lorem ipsum dolor sit amet et nuncat ",
//     illustration: "https://i.postimg.cc/XvFRbgyw/a.jpg",
//   },
// ];
// const { width: screenWidth } = Dimensions.get("window");

// const MainCarousel = (props) => {
//   const [entries, setEntries] = useState([]);
//   const carouselRef = useRef(null);

//   const goForward = () => {
//     carouselRef.current.snapToNext();
//   };

//   useEffect(() => {
//     setEntries(ENTRIES1);
//   }, []);

//   const renderItem = ({ item, index }, parallaxProps) => {
//     return (
//       <View style={styles.item}>
//         <ParallaxImage
//           source={{ uri: item.illustration }}
//           containerStyle={styles.imageContainer}
//           style={styles.image}
//           parallaxFactor={0.4}
//           {...parallaxProps}
//         />
//         {/* <Text style={styles.title} numberOfLines={2}>
//           {item.title}
//         </Text> */}
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Header
//         placement="left"
//         centerComponent={{
//           text: "Lifting up with hands of help.",
//           style: {
//             color: "#fff",
//             fontSize: 16,
//             padding: 35,
//             fontFamily: "serif",
//           },
//         }}
//         containerStyle={{
//           backgroundColor: "#268c77",
//           justifyContent: "space-around",
//           paddingBottom: 15,
//           height: 30,
//           marginTop: 6,
//         }}
//       />
//       <Carousel
//         ref={carouselRef}
//         sliderWidth={screenWidth}
//         sliderHeight={screenWidth}
//         itemWidth={screenWidth - 1}
//         data={entries}
//         renderItem={renderItem}
//         hasParallaxImages={true}
//         autoplay={true}
//         autoplayDelay={1}
//         loop={true}
//       />
//     </View>
//   );
// };

// export default MainCarousel;

// const styles = StyleSheet.create({
//   item: {
//     width: 50,
//     height: 160,
//   },
//   imageContainer: {
//     flex: 1,
//     width: 370,
//     height: 160,
//     marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
//     backgroundColor: "white",
//   },
//   image: {
//     resizeMode: "cover",
//   },
// });

import React from 'react'
import { View, Text } from 'react-native'

export default function Carousel() {
  return (
    <View>
      <Text>Carousel.js file</Text>
    </View>
  )
}

