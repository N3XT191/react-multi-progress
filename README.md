# react-multi-progress

![alt text](docs/progressbar.png)

A simple, typed react progress bar that allowes multiple layers in different
colors. [Demo](http://progress.bitter.li)

## Installation

Install with npm:

- `npm install react-multi-progress --save`

You can now import `react-multi-progress` as a normal package installed from npm
like so:

```
import MultiProgress from 'react-multi-progress'
...
```

You can also import the type definitions if you're using TypeScript like so:

```
import MultiProgress, { IMultiProgressProps } from 'react-multi-progress'
...
```

## Available props

| Attribute                  |         Type          | Optional |         Default         | Description                                                                                                                                                                                                      |
| :------------------------- | :-------------------: | :------: | :---------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| backgroundColor            |       `string`        |   yes    |        `#ffffff`        | Background color of the progress bar                                                                                                                                                                             |
| border                     |       `string`        |   yes    |         `none`          | set a border around the progress bar, e.g. `1px solid red`                                                                                                                                                       |
| elements                   |  `ProgressElement[]`  |    no    |         `none`          | Set the color and size of each element, see "ProgressElement" below.                                                                                                                                             |
| height                     |       `number`        |   yes    |          `10`           | Height of the progress bar in `px`                                                                                                                                                                               |
| round                      |        `bool`         |   yes    |         `true`          | Wheter the ends of the progress bar container should be rounded                                                                                                                                                  |
| roundLastElement           |        `bool`         |   yes    |         `true`          | Wheter the last progress element should be rounded on the right end                                                                                                                                              |
| transitionTime             |       `number`        |   yes    |          `0.6`          | Transition time in seconds to animate when the value changes. Set to `0` for no animation.                                                                                                                       |
| className                  |       `string`        |   yes    |                         | CSS className passed onto the ProgressBar Container                                                                                                                                                              |
| component                  |     `ElementType`     |   yes    |          `div`          | Custom element used to render progress elements, either a HTML tag name or React component accepting `className`, `style`, `children`, and `element` props, with `element` being the `ProgressElement` passed in |
| type generic (see example) | `Record<string, any>` |   yes    | `Record<string, never>` | Additional props to add to the definition of `elements`, for use with custom components                                                                                                                          |

### ProgressElement

| Attribute      |   Type   | Optional | Description                                              |
| :------------- | :------: | :------: | :------------------------------------------------------- |
| value          | `number` |    no    | Length of the element in % (0-100)                       |
| color          | `string` |    no    | Color of the element (any css compatible format)         |
| showPercentage |  `bool`  |   yes    | Show the percentage as text in the ProgressElement       |
| textColor      | `string` |   yes    | Color of the percentage text (any css compatible format) |
| fontSize       | `number` |   yes    | font size of the percentage text (in px)                 |
| className      | `string` |   yes    | CSS className passed onto the ProgressElement            |

## Example

### Basic

```jsx
import MultiProgress from "react-multi-progress";

function Progress() {
	return (
		<MultiProgress
			elements={[
				{
					value: 35,
					color: "blue",
				},
			]}
		/>
	);
}
```

### Advanced

```tsx
import MultiProgress from "react-multi-progress";

// for non-TS projects, remove this and other types
type ExtraData = {isBold: boolean};

function CustomComponent(props: ProgressComponentProps<ExtraData>) {
	return (
		<div className={props.className} style={{
			...props.style,
			fontWeight: props.element.isBold ? "bolder" : undefined
		}}>
			{props.children}
		</div>
	);
}

function Progress() {
	return (
		<MultiProgress<ExtraData>
			transitionTime={1.2}
			elements={[
				{
					value: 15,
					color: "blue",
					isBold: false,
				},
				{
					value: 35,
					color: "rgb(100,0,0)",
					isBold: true,
				},
				{
					value: 25,
					color: "#acf",
					showPercentage: true,
					textColor: "black",
					fontSize: 12,
					className: "my-custom-css-class",
					isBold: false,
				},
			]}
			height={15}
			backgroundColor="gray"
			border="1px solid red"
			className="my-custom-css-class"
			component={CustomComponent}
		/>
	);
}
```
