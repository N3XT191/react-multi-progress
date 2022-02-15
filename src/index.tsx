import * as React from "react";
import { css } from "glamor";

interface ProgressElement {
	value: number;
	color: string;
	showPercentage?: boolean;
	foreColor?: string;
}

export type IMultiProgressProps = {
	backgroundColor?: string;
	border?: string;
	elements: ProgressElement[];
	height?: number | string;
	round?: boolean;
	roundLastElement?: boolean;
	transitionTime?: number;
};
const styles = {
	progressContainer: (round: boolean, height: string | number, border: string) => {
		const convertedHeight = typeof height === "string" ? height : height + "px";
		return css({
			width: "100%",
			height: convertedHeight,
			position: "relative",
			border,
			borderRadius: round ? "400px" : "0",
			overflow: "hidden",
		});
	},
	progressBackground: (backgroundColor: string) =>
		css({
			backgroundColor,
			width: "100%",
			height: "100%",
			position: "absolute",
			top: 0,
			left: 0,
		}),
	progressElement: (
		backgroundColor: string,
		offset: number,
		value: number,
		transitionTime: number,
		roundRight: boolean,
		foreColor: string,
	) => {
		const roundRightString = roundRight ? "40px 40px" : "0 0";
		return css({
			backgroundColor,
			width: value + "%",
			zIndex: 8,
			height: "100%",
			top: 0,
			left: offset + "%",
			position: "absolute",
			transition:
				"width " + transitionTime + "s ease-in-out, left " + transitionTime + "s ease-in-out",
			borderRadius: "0 " + roundRightString + " 0",
			color: foreColor,
			textAlign: "center"
		});
	},
};

const createElementArray = (
	elements: ProgressElement[],
	transitionTime: number,
	roundLastElement: boolean
) => {
	let currentOffset = 0;
	let newElements = [] as any[];

	elements.forEach((element, i) => {
		newElements.push(
			<div
				{...styles.progressElement(
					element.color,
					currentOffset,
					element.value,
					transitionTime,
					i === elements.length - 1 && roundLastElement,
					element.foreColor
				)}
				key={i}
			>
				{element.showPercentage && `${element.value}%`}
			</div>
		);
		currentOffset += element.value;
	});
	return newElements;
};

const MultiProgress: React.FC<IMultiProgressProps> = ({
	backgroundColor = "#ffffff",
	border = "",
	elements,
	height = 10,
	round = true,
	roundLastElement = true,
	transitionTime = 0.6,
}) => {
	return (
		<div {...styles.progressContainer(round, height, border)}>
			<div {...styles.progressBackground(backgroundColor)} />
			{createElementArray(elements, transitionTime, roundLastElement).map((element, i) => (
				<div key={i}>{element}</div>
			))}
		</div>
	);
};

export default MultiProgress;
