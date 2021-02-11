import { Text, View, Dimensions } from "react-native";
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SwipeContainer from "./Swipe/SwipeContainer";
import StoryContainer from "./Storys/StoryContainer";
import DragToSortContainer from "./DragToSort/DragToSortContainer";

const { width, height } = Dimensions.get("window");

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

function Swipe() {
	return (
		<View
			style={{
				width: width,
				height: height,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<SwipeContainer />
		</View>
	);
}

function Story() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<StoryContainer />
		</View>
	);
}

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Swipe" component={Swipe} />
				<Tab.Screen name="Storys" component={Story} />
				<Tab.Screen name="DragToSort" component={DragToSort} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
