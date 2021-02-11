import React from "react";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import Tab, { TAB_SIZE } from "./Tab";

const {
	Value,
	event,
	add,
	cond,
	eq,
	block,
	set,
	useCode,
	multiply,
	divide,
	and,
	round,
	spring,
} = Animated;

export const withOffset = ({ offset, value, state: gestureState }) => {
	const safeOffset = new Value(0);
	return cond(
		eq(gestureState, State.ACTIVE),
		add(safeOffset, value),
		set(safeOffset, offset)
	);
};

const translationX = new Value(0);
const translationY = new Value(0);
const velocityX = new Value(0);
const velocityY = new Value(0);

const gestureState = new Value(State.UNDETERMINED);

const onGestureEvent = event(
	[
		{
			nativeEvent: {
				translationX: translationX,
				translationY: translationY,
				velocityX: velocityX,
				velocityY: velocityY,
				state: gestureState,
			},
		},
	],
	{ useNativeDriver: true }
);

export default SortableTab = ({ tab, offsets, index }) => {
	const currentOffset = offsets[index];
	const x = withOffset({
		value: translationX,
		offset: currentOffset.x,
		gestureState,
	});
	const y = withOffset({
		value: translationY,
		offset: currentOffset.y,
		gestureState,
	});
	const zIndex = 1;
	const offsetX = multiply(round(divide(x, TAB_SIZE)), TAB_SIZE);
	const offsetY = multiply(round(divide(y, TAB_SIZE)), TAB_SIZE);
	const translateX = spring(x, {}, velocityX, gestureState);
	const translateY = spring(y, {}, velocityY, gestureState);
	useCode(
		() =>
			block(
				offsets.map((offset) =>
					cond(
						and(
							eq(offsetX, offset.x),
							eq(offsetY, offset.y),
							eq(gestureState, State.ACTIVE)
						),
						[
							set(offset.x, currentOffset.x),
							set(offset.y, currentOffset.y),
							set(currentOffset.x, offsetX),
							set(currentOffset.y, offsetY),
						]
					)
				)
			),
		[currentOffset.x, currentOffset.y, offsetX, offsetY, offsets, gestureState]
	);
	return (
		<PanGestureHandler {...onGestureEvent}>
			<Animated.View
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: TAB_SIZE,
					height: TAB_SIZE,
					justifyContent: "center",
					alignItems: "center",
					transform: [{ translateX }, { translateY }],
					zIndex,
				}}
			>
				<Tab {...{ tab }} />
			</Animated.View>
		</PanGestureHandler>
	);
};
