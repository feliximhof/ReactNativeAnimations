import { StyleSheet, View } from "react-native";
import Profiles from "./Profiles";
import React from "react";

export default SwipeContainer = ({ images }) => {
	return (
		<View style={styles.container}>
			<Profiles images={images} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "80%",

		alignItems: "center",
		justifyContent: "center",
	},
});
