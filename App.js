import { Text, View, Dimensions } from "react-native";
import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SwipeContainer from "./Swipe/SwipeContainer";
import StoryContainer from "./Storys/StoryContainer";
import DragToSortContainer from "./DragToSort/DragToSortContainer";
import FlatListExampleContainer from "./FlatListExample/FlatListExampleContainer";
import ScrollViewExampleContainer from "./AnimatedScrollView/ScrollViewExampleContainer";

import { API_KEY } from "./config";

const { width, height } = Dimensions.get("window");

const API_URL =
	"https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20";

const fetchImagesFromPexels = async () => {
	const data = await fetch(API_URL, {
		headers: {
			Authorization: API_KEY,
		},
	});
	const { photos } = await data.json();
	return photos;
};

function DragToSort() {
	return (
		<View
			style={{
				width: width,
				height: height,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<DragToSortContainer />
		</View>
	);
}

const Tab = createBottomTabNavigator();

export default function App() {
	const [images, setImages] = useState(null);
	useEffect(() => {
		const fetchImages = async () => {
			const images = await fetchImagesFromPexels();
			setImages(images);
		};

		fetchImages();
	}, []);

	if (!images) {
		return null;
	}

	const Swipe = () => {
		return (
			<View
				style={{
					width: width,
					height: height,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<SwipeContainer images={images} />
			</View>
		);
	};

	const Story = () => {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<StoryContainer />
			</View>
		);
	};

	const FlatListExample = () => {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<FlatListExampleContainer images={images} />
			</View>
		);
	};

	const ScrollViewExample = () => {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ScrollViewExampleContainer images={images} />
			</View>
		);
	};

	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Swipe" component={Swipe} />
				<Tab.Screen name="Storys" component={Story} />
				<Tab.Screen name="FlatList" component={FlatListExample} />
				<Tab.Screen name="ScrollAnim" component={ScrollViewExample} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
