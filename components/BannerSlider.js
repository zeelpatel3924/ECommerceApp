 
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";

export default function BannerSlider({ banners = [] }) {
  const width = useMemo(() => Dimensions.get("window").width, []);

  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onMomentumScrollEnd = useCallback(
    (e) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const nextIndex = Math.round(offsetX / width);
      setCurrentIndex(nextIndex);
    },
    [width],
  );

  useEffect(() => {
    if (!banners.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners.length;

        scrollRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        });

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length, width]);

  const renderedBanners = useMemo(
    () =>
      banners.map((img, index) => (
        <Image
          key={index}
          source={{ uri: img }}
          style={{ width, height: 180 }}
          resizeMode="cover"
        />
      )),
    [banners, width],
  );

  return (
    <View style={{ height: 180, marginTop: 10 }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {renderedBanners}
      </ScrollView>
    </View>
  );
}
