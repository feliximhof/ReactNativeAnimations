import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Animated from "react-native-reanimated";

const Card = ({ items, saveOpacity, dontSaveOpacity }) => {
	return (
		<View
			style={{
				alignSelf: "center",
				position: "absolute",
				justifyContent: "center",
				height: "70%",
				width: "85%",
			}}
		>
			<View
				style={{
					flex: 1,
					borderRadius: 20,
				}}
			>
				<Image style={styles.image} source={{ uri: items.src.original }} />
				<Animated.View style={[{ opacity: dontSaveOpacity }]}>
					<Text style={styles.text1}>Don't Save</Text>
				</Animated.View>
				<Animated.View style={[{ opacity: saveOpacity }]}>
					<Text style={styles.text2}>Save</Text>
				</Animated.View>
			</View>
		</View>
	);
};

Card.defaultProps = {
	dontSaveOpacity: 0,
	saveOpacity: 0,
};

const styles = StyleSheet.create({
	card: {
		height: "100%",
		width: "80%",
		backgroundColor: "blue",
		borderRadius: 20,
	},
	text1: {
		position: "absolute",
		left: 10,
		top: 10,
		fontSize: 20,
	},
	text2: {
		position: "absolute",
		right: 10,
		top: 10,
		fontSize: 20,
	},
	image: {
		...StyleSheet.absoluteFillObject,
		height: null,
		width: null,
		borderRadius: 10,
	},
});

export default Card;
