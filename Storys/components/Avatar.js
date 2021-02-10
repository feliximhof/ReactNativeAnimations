// @flow
import * as React from "react";
import { StyleSheet, View, Image, Text, Platform } from "react-native";
import { Constants } from "expo";

export default class Avatar extends React.PureComponent {
	render() {
		const { user, avatar: source } = this.props;
		return (
			<View style={styles.container}>
				<Image {...{ source }} style={styles.avatar} />
				<Text style={styles.username}>{user}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 16,
		alignItems: "center",
		marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
	},
	avatar: {
		width: 36,
		height: 36,
		borderRadius: 36 / 2,
		marginRight: 16,
	},
	username: {
		color: "white",
		fontSize: 16,
	},
});
