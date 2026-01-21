/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { View, ScrollView, Image, Dimensions } from "react-native";

export default function BannerSlider({ banners }) {
  const { width } = Dimensions.get("window");
  const scrollRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % banners.length;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={{ height: 180, marginTop: 10 }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {banners.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={{ width, height: 180 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
}
