# react-multi-progress

A simple, typed react progress bar that allowes multiple layers in different colors. [http://progress.bitter.li](Demo)

## Installation

Install with npm:

- `npm install react-multi-progress --save`

You can now import `react-multi-progress` as a normal package installed from npm like so:

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

| Attribute        |        Type         |  Default  | Description                                                                                              |
| :--------------- | :-----------------: | :-------: | :------------------------------------------------------------------------------------------------------- |
| backgroundColor  |      `string`       | `#ffffff` | Render a specific button type, styled by the .scss type list                                             |
| border           |      `string`       |    ``     | Render a specific button size, styled by the .scss size list                                             |
| elements         | `ProgressElement[]` |  `none`   | Overwrites the default container element renderer, useful for using it with react-router Link component. |
| height           |      `number`       |   `10`    | Should render a disabled button                                                                          |
| round            |       `bool`        |  `true`   | Should the button be visible                                                                             |
| roundLastElement |       `bool`        |  `true`   | Should render the animated ripple effect                                                                 |
| transitionTime   |      `number`       |   `0.6`   | Default click/press function                                                                             |
