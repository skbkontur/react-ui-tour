import * as React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {TooltipStep} from '../src/tour/tooltipStep/tooltipStep';
import {ModalStep} from '../src/tour/modalStep/modalStep';

declare let module: any;

storiesOf('Tour', module)
  .add('tooltip step', () => (
    <TooltipStep
      header='hi there'
      tooltipTarget={document.documentElement}
      popupPositions={['bottom left']}
      onNext={action('next')}
      onPrev={action('prev')}
      onClose={action('close')}
    />
  ))
  .add('modal step', () => (
    <ModalStep header='hi there' onNext={action('next')} onClose={action('onclose')}/>
  ));
