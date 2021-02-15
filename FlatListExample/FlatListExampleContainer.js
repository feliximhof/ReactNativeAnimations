import React, { useEffect, useState, useRef } from "react";
import { View, Dimensions, FlatList, Image } from "react-native";
import PropTypes from "prop-types";

import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const IMAGE_SIZE = 80;

const FlatListExampleContainer = ({ images }) => {
	const [activeIndex, setIndex] = useState(0);

	const topRef = useRef();
	const bottomRef = useRef();

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
			<FlatList
				ref={topRef}
				data={images}
				horizontal
				keyExtractor={(item) => item.id.toString()}
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={(ev) => {
					setActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
				}}
				decelerationRate="fast"
				renderItem={({ item }) => {
					return (
						<View style={{ height: height, width: width }}>
							<Image style={{ flex: 1 }} source={{ uri: item.src.portrait }} />
						</View>
					);
				}}
			/>
			<FlatList
				ref={bottomRef}
				data={images}
				horizontal
				contentContainerStyle={{ padding: 10 }}
				keyExtractor={(item) => item.id.toString()}
				showsHorizontalScrollIndicator={false}
				style={{ position: "absolute", bottom: 20 }}
				renderItem={({ item, index }) => {
					return (
						<TouchableWithoutFeedback onPress={() => setActiveIndex(index)}>
							<Image
								style={{
									width: IMAGE_SIZE,
									height: IMAGE_SIZE,
									borderRadius: 12,
									borderWidth: 2,
									borderColor: activeIndex === index ? "white" : "transparent",
									marginRight: 10,
								}}
								source={{ uri: item.src.medium }}
							/>
						</TouchableWithoutFeedback>
					);
				}}
			/>
		</View>
	);
};

FlatListExampleContainer.propTypes = {
	images: PropTypes.shape({}),
};

export default FlatListExampleContainer;
