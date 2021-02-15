import React, { useRef } from "react";
import {
	View,
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Animated,
} from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

const ITEM_SIZE = 100;

const ScrollViewExampleContainer = ({ images }) => {
	const scrollY = useRef(new Animated.Value(0)).current;

	const setActiveIndex = (index) => {
		setIndex(index);
		topRef?.current?.scrollToOffset({
			offset: index * width,
			animated: true,
		});
		if (index * (IMAGE_SIZE + 10) - IMAGE_SIZE / 2 > width / 2) {
			bottomRef?.current?.scrollToOffset({
				offset: index * (IMAGE_SIZE + 10) - width / 2 + IMAGE_SIZE / 2,
				animated: true,
			});
		} else {
			bottomRef?.current?.scrollToOffset({
				offset: 0,
				animated: true,
			});
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Image
				style={StyleSheet.absoluteFillObject}
				source={{ uri: images[0].src.portrait }}
				blurRadius={60}
			/>
			<Animated.FlatList
				data={images}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={{ paddingTop: 100 }}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: true }
				)}
				renderItem={({ item, index }) => {
					const inputRange = [
						-1,
						0,
						ITEM_SIZE * index,
						ITEM_SIZE * (index + 2),
					];
					const scale = scrollY.interpolate({
						inputRange,
						outputRange: [1, 1, 1, 0],
					});
					const translateX = scrollY.interpolate({
						inputRange,
						outputRange: [0, 0, 0, -width],
					});
					const radius = scrollY.interpolate({
						inputRange,
						outputRange: [1, 1, 1, 0],
					});
					return (
						<Animated.View
							style={[
								{
									height: ITEM_SIZE,
									width: width - 20,
									marginHorizontal: 10,
									zIndex: 1,
									shadowColor: "black",
									shadowOpacity: 0.5,
									opacity: 0.8,
									transform: [{ scale }, { translateX }],
								},
							]}
						>
							<Animated.Image
								style={[
									{ flex: 1, borderRadius: 10, margin: 10, opacity: radius },
								]}
								source={{ uri: item.src.portrait }}
							/>
						</Animated.View>
					);
				}}
			/>
		</View>
	);
};

ScrollViewExampleContainer.propTypes = {
	images: PropTypes.shape({}),
};

export default ScrollViewExampleContainer;
