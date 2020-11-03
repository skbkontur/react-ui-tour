# ReactUI tours library

[Demo](http://tech.skbkontur.ru/react-ui-tour)

`react-ui-tour@1` works only with `react-ui >= 2`. If you use lower version of `react-ui` in your project, use `react-ui-tour@0`

## Documentation

Basic usage:

Place `TourProvider` at the root of your app:
```tsx
<TourProvider predicate={id => true}
              onTourShown={id => makeSmt()}>
  <YourApp />
</TourProvider>
```

Then, anywhere inside the `TourProvider` add a `Tour` with some [steps](#steps):
```tsx
<Tour id='My Tour' >
  <TooltipStep
    target={() => document.getElementById('id-1')}
    positions={['bottom right', 'right bottom']}
    header='Step 1'
    content={(
     <div>Hi, there!</div>
    )}
    onOpen={() => console.log('Step was opened!')}
  />
  <TooltipStep
    target={() => document.getElementById('id-2')}
    positions={['top left', 'top-right']}
    header='Step 2'
    content={(
     <div>Hi, there again!</div>
    )}
  />
</Tour>
```

Use [group](#steps) feature to invoke common callbacks (onAfter, onBefore) for all group, just pass group property as unique identifier for group:
```tsx
<Tour id='My Tour' >
  <TooltipStep
    group="group1"
    target={() => document.getElementById('id-1')}
    positions={['bottom right', 'right bottom']}
    header='Step 1'
    content={(
     <div>Hi, there!</div>
    )}
    onBefore={() => /*some code*/}
  />
  <TooltipStep
    group="group1"
    target={() => document.getElementById('id-2')}
    positions={['top left', 'top-right']}
    header='Step 2'
    content={(
     <div>Hi, there again!</div>
    )}
    onAfter={() => /*some code*/}
  />
</Tour>
```

Also you can use `Tour` and `Tooltip` as separate components without provider
```tsx
<TourComponent onClose={() => console.log('Tour was closed!')}>
  <TooltipStep
    target={() => document.getElementById('id-1')}
    positions={['bottom right', 'right bottom']}
    header='Step 1'
    content={(
     <div>Hi, there!</div>
    )}
  />     
</TourComponent>
```

```tsx
<Tooltip
  targetGetter={() => document.getElementById('id-3')}
  positions={['right middle']}
  pinOptions={{ hasPin: false }}
  onClose={() => this.setState({ tooltipOpened: false })}
>
  <Tooltip.Container>
    <Tooltip.Header>Tooltip</Tooltip.Header>
    <Tooltip.Body>
      <div>Simple tooltip</div>
    </Tooltip.Body>
  </Tooltip.Container>
</Tooltip>
```

## Api

### TourProvider
A wrapper component with the following props:
```ts
interface TourProviderProps {
  predicate: (id: string) => boolean; // whether to show a tour with given id
  onTourShown: (id: string) => void; // will be called when a tour is closed
}
```

### Tour
A sequence of steps to be shown wit connection to provider Should be provided with an unique identifier. Has the following props:
```ts
interface TourProps {
  id: string; // a string to identify a tour
              // will be passed to `predicate` and `onTourShown` callbacks of `TourProvider`
}
```

### TourComponent
A sequence of steps to be shown without connection to provider.
Has the following props:
```ts
interface TourComponentProps {
  children: React.ReactNode;
  onClose?: () => void;
}
```

### Steps
There are some types of steps: `Step`, `ModalStep`, `TooltipStep`
All of these take the following props:
```ts
  isFallback?: boolean; // that step to be showing if only tour was closed
  onBefore?: () => Promise<void>;
  onAfter?: () => Promise<void>;
  onOpen?: () => void;
  group?: string;
  render?: (props: StepInternalProps) => React.ReactElement<any>
```
Prop `render` provides ability to customize whole Step.
It's a function of the following props:
```ts
interface StepInternalProps {
  stepIndex: number;
  stepsCount: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}
```

**Step**
It's clear component and hasn't any view

**TooltipStep**
It provides step with tooltip view. Method `render` affects only to content of tooltip
```ts
interface TooltipStepOuterProps {
  target: () => Element; // element to be pointed to
  positions: string[];
  highlightTarget?: () => Element; // element to be highlighted to
  highlight?: React.ReactElement<any>; // highlight for pointed element
  offset?: number;
  width?: number;
  pinOptions?: PinOptions;
  content?: React.ReactElement<any> | string;
  header?: React.ReactElement<any> | string;
  footer?: (props: StepInternalProps) => React.ReactElement<any>;
  render?: (props: StepInternalProps) => React.ReactElement<any>; // that ovveride usage of content, header and footer props
}
```
**ModalStep**
It provides step with modal view. Method `render` affects only to content of modal
```ts
interface ModalStepOuterProps {
  width?: number;
  content?: React.ReactElement<any> | string;
  header?: React.ReactElement<any> | string;
  footer?: (props: StepInternalProps) => React.ReactElement<any>;
  render?: (props: StepInternalProps) => React.ReactElement<any>; // that ovveride usage of content, header and footer props
}
```

### Tooltip
A component provides tooltip view with the following props:
```ts
interface TooltipProps {
  targetGetter: () => Element;
  positions?: string[];
  offset?: number;
  onClose?: () => void;
  pinOptions?: PinOptions;
  width?: number;
}
```

## Maintain

### How to build it on your local machine
* `npm i`
* `npm start`
* `=> localhost:8080`

### How to build it in production environment
* `npm i --production`
* `npm run build`

### How can I write some tests
* go to folder `__tests__`
* create test file with name `*.test.ts` (`tsx`)
* create your test suites with `describe` and `expect` syntax
* run `npm test`
* enjoy :)

### How can I write some stories for storybook
* create your story file in folder `stories`
* go to folder `.storybook/config.js`
* add your file
* `npm run storybook`

### How can I contribute
* create PR or MR
* [write me](https://staff.skbkontur.ru/profile/vtolstikov)
