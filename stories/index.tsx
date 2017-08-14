import * as React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {App} from '../src/components/App/App';

declare let module: any;

storiesOf('Redux', module)
  .add('buttons', story => <App own='Redux'
                                hello={{sayText: 'Прив че дел', byeText: 'Пока'}}
                                dispatch={(event) => action(event.type)()} />
  );