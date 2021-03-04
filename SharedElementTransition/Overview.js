import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

const IMAGE_HEIGHT = 400;
const SPACING = 40;

const Overview = ({ images, navigation }) => {
	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<FlatList
				horizontal
				data={images}
				style={{ marginTop: 50 }}
				snapToInterval={width}
				decelerationRate="fast"
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => navigation.navigate("Details", { item })}
					>
						<View style={{ height: IMAGE_HEIGHT }}>
							<Image style={styles.image} source={{ uri: item.src.medium }} />
							<Text style={styles.imageTitle}>
								{item.photographer.toUpperCase()}
							</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

Overview.propTypes = {
	images: PropTypes.arrayOf(PropTypes.shape({})),
};

const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: width - SPACING,
		resizeMode: "cover",
		margin: SPACING - SPACING / 2,
		borderRadius: 20,
	},
	imageTitle: {
		fontSize: 30,
		fontWeight: "900",
		color: "white",
		position: "absolute",
		bottom: SPACING - 10,
		left: SPACING,
	},
});

export default Overview;
