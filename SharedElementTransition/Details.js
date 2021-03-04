import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
} from "react-native";
import PropTypes from "prop-types";

import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const IMAGE_HEIGHT = 400;
const SPACING = 40;

const Details = ({ images }) => {
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
					<View style={{ height: IMAGE_HEIGHT }}>
						<Image style={styles.image} source={{ uri: item.src.medium }} />
						<Text style={styles.imageTitle}>
							{item.photographer.toUpperCase()}
						</Text>
					</View>
				)}
			/>
		</View>
	);
};

Details.propTypes = {
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

export default Details;
