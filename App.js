import { Text, View, Dimensions } from "react-native";
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SwipeContainer from "./Swipe/SwipeContainer";
import StoryContainer from "./Storys/StoryContainer";

const { width, height } = Dimensions.get("window");

function HomeScreen() {
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

function SettingsScreen() {
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
				<Tab.Screen name="Swipe" component={HomeScreen} />
				<Tab.Screen name="Storys" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
