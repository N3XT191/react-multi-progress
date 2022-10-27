import * as React from "react";
import { css } from "glamor";

export interface ProgressElement {
	value: number;
	color: string;
	showPercentage?: boolean;
	textColor?: string;
	fontSize?: number;
	className?: string;
}

export type ProgressComponentProps<T> = {
	children?: React.ReactNode,
	className?: string,
	element: (ProgressElement & T)
} & Record<string, unknown>;

export type IMultiProgressProps<T> = {
	backgroundColor?: string;
	border?: string;
	elements: (ProgressElement & T)[];
	height?: number | string;
	round?: boolean;
	roundLastElement?: boolean;
	transitionTime?: number;
	className?: string;
	component?: React.ElementType<ProgressComponentProps<T>>
};
const styles = {
	progressContainer: (
		round: boolean,
		height: string | number,
		border: string
	) => {
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
		textColor: string | undefined,
		fontSize: number | undefined
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
				"width " +
				transitionTime +
				"s ease-in-out, left " +
				transitionTime +
				"s ease-in-out",
			borderRadius: "0 " + roundRightString + " 0",
			color: textColor,
			textAlign: "center",
			fontSize: fontSize ? fontSize : 8,
		});
	},
};

function createElementArray<T>(
	elements: (T & ProgressElement)[],
	transitionTime: number,
	roundLastElement: boolean,
	component: IMultiProgressProps<T>["component"]
) {
	let currentOffset = 0;
	let newElements = [] as any[];

	const Element = component ?? "div";

	elements.forEach((element, i) => {
		newElements.push(
			<Element
				{...styles.progressElement(
					element.color,
					currentOffset,
					element.value,
					transitionTime,
					i === elements.length - 1 && roundLastElement,
					element.textColor,
					element.fontSize
				)}
				key={i}
				className={element.className}
				element={element}
			>
				{element.showPercentage && `${element.value}%`}
			</Element>
		);
		currentOffset += element.value;
	});
	return newElements;
}

export default function MultiProgress<T = Record<string, never>>({
	backgroundColor = "#ffffff",
	border = "",
	elements,
	height = 10,
	round = true,
	roundLastElement = true,
	transitionTime = 0.6,
	className,
	component
}: IMultiProgressProps<T>) {
	return (
		<div
			{...styles.progressContainer(round, height, border)}
			className={className}
		>
			<div {...styles.progressBackground(backgroundColor)} />
			{createElementArray(elements, transitionTime, roundLastElement, component).map(
				(element, i) => (
					<div key={i}>{element}</div>
				)
			)}
		</div>
	);
}
