import React from "react";
import { View, SafeAreaView, StyleSheet, Dimensions, Text } from "react-native";
import PropTypes from "prop-types";
import Card from "./Card";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Feather as Icon, createMultiStyleIconSet } from "@expo/vector-icons";

const {
	Value,
	event,
	Extrapolate,
	concat,
	interpolate,
	cond,
	eq,
	neq,
	add,
	multiply,
	set,
	block,
	call,
	spring,
	and,
	lessThan,
	greaterThan,
	startClock,
	clockRunning,
	stopClock,
	Clock,
} = Animated;

const { width } = Dimensions.get("window");

const ProfileData = [
	{
		id: 1,
		name: "Card 1",
	},
	{
		id: 2,
		name: "Card 2",
	},
	{
		id: 3,
		name: "Card 3",
	},
	{
		id: 4,
		name: "Card 4",
	},
];

const { height } = Dimensions.get("window");
const toRadians = (angle) => angle * (Math.PI / 180);
const rotatedWidth =
	width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

function runSpring(clock, value, dest) {
	const state = {
		finished: new Value(0),
		velocity: new Value(0),
		position: new Value(0),
		time: new Value(0),
	};

	const config = {
		damping: 20,
		mass: 0.1,
		stiffness: 10,
		overshootClamping: false,
		restSpeedThreshold: 1,
		restDisplacementThreshold: 20,
		toValue: new Value(0),
	};

	return [
		cond(clockRunning(clock), 0, [
			set(state.finished, 0),
			set(state.velocity, 0),
			set(state.position, value),
			set(config.toValue, dest),
			startClock(clock),
		]),
		spring(clock, state, config),
		cond(state.finished, stopClock(clock)),
		state.position,
	];
}

export default class Profiles extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { ProfileData };
		this.translationX = new Value(0);
		this.translationY = new Value(0);
		this.velocityX = new Value(0);
		this.offsetY = new Value(0);
		this.offsetX = new Value(0);
		this.clockX = new Clock();
		this.clockY = new Clock();
		this.gestureState = new Value(State.UNDETERMINED);
		this.onGestureEvent = event(
			[
				{
					nativeEvent: {
						translationX: this.translationX,
						translationY: this.translationY,
						velocityX: this.velocityX,
						state: this.gestureState,
					},
				},
			],
			{ useNativeDriver: true }
		);
		this.init();
	}

	static PropTypes = {
		images: PropTypes.shape({}).isRequired,
	};

	init = () => {
		const clockX = new Clock();
		const clockY = new Clock();
		const {
			translationX,
			translationY,
			velocityX,
			gestureState,
			offsetY,
			offsetX,
		} = this;
		gestureState.setValue(State.UNDETERMINED);
		translationX.setValue(0);
		translationY.setValue(0);
		velocityX.setValue(0);
		offsetY.setValue(0);
		offsetX.setValue(0);

		const finalTranslateX = add(translationX, multiply(0.6, velocityX));
		const translationThreshold = width / 10;
		const snapPoint = cond(
			lessThan(finalTranslateX, -translationThreshold),
			-rotatedWidth,
			cond(greaterThan(finalTranslateX, translationThreshold), rotatedWidth, 0)
		);
		// TODO: handle case where the user drags the card again before the spring animation finished
		this.translateY = cond(
			eq(gestureState, State.END),
			[
				set(translationY, runSpring(clockY, translationY, 0)),
				set(offsetY, translationY),
				translationY,
			],
			cond(
				eq(gestureState, State.BEGAN),
				[stopClock(clockY), translationY],
				translationY
			)
		);
		this.translateX = cond(
			eq(gestureState, State.END),
			[
				set(translationX, runSpring(clockX, translationX, snapPoint)),
				set(offsetX, translationX),
				cond(and(eq(clockRunning(clockX), 0), neq(translationX, 0)), [
					call([translationX], this.swipped),
				]),
				translationX,
			],
			cond(
				eq(gestureState, State.BEGAN),
				[stopClock(clockX), translationX],
				translationX
			)
		);
	};

	swipped = () => {
		const {
			ProfileData: [lastProfile, ...ProfileData],
		} = this.state;
		this.setState({ ProfileData }, this.init);
	};

	render() {
		const { onGestureEvent, translateX, translateY } = this;
		const { images } = this.props;
		const {
			ProfileData: [lastProfile, ...ProfileData],
		} = this.state;
		const rotateZ = concat(
			interpolate(translateX, {
				inputRange: [-width / 2, width / 2],
				outputRange: [15, -15],
				extrapolate: Extrapolate.CLAMP,
			}),
			"deg"
		);
		const likeOpacity = interpolate(translateX, {
			inputRange: [0, width / 4],
			outputRange: [0, 1],
		});
		const nopeOpacity = interpolate(translateX, {
			inputRange: [-width / 4, 0],
			outputRange: [1, 0],
		});
		const style = {
			...StyleSheet.absoluteFillObject,
			alignSelf: "center",

			justifyContent: "center",
			transform: [{ translateX }, { translateY }, { rotateZ }],
		};

		console.warn();
		return (
			<SafeAreaView style={styles.container}>
				<View
					style={{
						alignItems: "center",
						justifyContent: "center",
						flex: 1,
					}}
				>
					<View style={styles.header}>
						<Icon name="user" size={32} color="gray" />
						<Icon name="message-circle" size={32} color="gray" />
					</View>
					{ProfileData.length >= 1 ? (
						<>
							{images.reverse().map((items, index) => {
								return <Card key={items.id} items={items} />;
							})}
							<PanGestureHandler
								onHandlerStateChange={onGestureEvent}
								onGestureEvent={onGestureEvent}
							>
								<Animated.View style={style}>
									<Card
										items={images[1]}
										saveOpacity={likeOpacity}
										dontSaveOpacity={nopeOpacity}
									/>
								</Animated.View>
							</PanGestureHandler>
						</>
					) : (
						<Text>nothing to swipe anymore</Text>
					)}
					<View style={styles.footer}>
						<Animated.View style={([styles.circle], { opacity: nopeOpacity })}>
							<Icon name="x" size={32} color="#ec5288" />
						</Animated.View>
						<Animated.View style={([styles.circle], { opacity: likeOpacity })}>
							<Icon name="heart" size={32} color="#6ee3b4" />
						</Animated.View>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

/**	<PanGestureHandler
								onHandlerStateChange={onGestureEvent}
								onGestureEvent={onGestureEvent}
							>
								<Animated.View style={style}>
									<Card
										items={}
										saveOpacity={likeOpacity}
										dontSaveOpacity={nopeOpacity}
									/>
								</Animated.View>
							</PanGestureHandler> */

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		flex: 1,
		width: "100%",
	},
	cards: {
		flex: 1,
		margin: 8,
		zIndex: 100,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		padding: 16,
		width: "100%",
	},
	circle: {
		width: 64,
		height: 64,
		borderRadius: 32,
		padding: 12,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		shadowColor: "gray",
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.18,
		shadowRadius: 2,
	},
});
