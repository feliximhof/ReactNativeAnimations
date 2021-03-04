// @flow
import React from "react";
import { StatusBar } from "react-native";
// Two implementations of the story components.
// One using linear interpolation which doesn't make it a perfect cube and one with setNativeProps
import { Stories } from "./components";

export default class StoryContainer extends React.Component {
	state = {
		ready: false,
	};

	async componentDidMount() {
		await Promise.all(
			stories.map((story) =>
				Promise.all([
					Asset.loadAsync(story.source),
					Asset.loadAsync(story.avatar),
				])
			)
		);
		this.setState({ ready: true });
	}

	render() {
		const { images } = this.props;
		return (
			<>
				<StatusBar barStyle="light-content" />
				<Stories stories={images} />
			</>
		);
	}
}
