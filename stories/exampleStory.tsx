import * as React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {ExampleComponent} from '../src/exampleFeature/exampleComponent';

declare let module: any;

storiesOf('Example', module)
  .add('default', story =>
    <ExampleComponent number={1} sayText='' byeText='' asyncMessage={action('say')}/>
  );
