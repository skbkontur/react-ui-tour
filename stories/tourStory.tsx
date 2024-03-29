import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {TooltipStep, ModalStep, MiniTooltipStep} from '../src/lib';

storiesOf('Tour', module)
  .add('tooltip step', () => (
    <TooltipStep
      header='hi there'
      target={() => document.documentElement}
      positions={['bottom left']}
      onNext={action('next')}
      onPrev={action('prev')}
      onClose={action('close')}
      stepIndex={1}
      stepsCount={3}
    />
  ))
  .add('minitooltip step', () => (
    <MiniTooltipStep
      target={() => document.documentElement}
      positions={['bottom left']}
      onNext={action('next')}
      onPrev={action('prev')}
      onClose={action('close')}
      stepIndex={1}
      stepsCount={3}>
        hi there ffffffffffffffffffffffffffffffffffffffffff fffffffffffffffffffffffffffffffffffff
  </MiniTooltipStep>
  ))
  .add('minitooltip step with width', () => (
    <MiniTooltipStep
      target={() => document.documentElement}
      positions={['bottom left']}
      onNext={action('next')}
      onPrev={action('prev')}
      onClose={action('close')}
      width={"327px"}>
        hi there ffffffffffffffffffffffffffffffffffffffffff fffffffffffffffffffffffffffffffffffff
  </MiniTooltipStep>
  ))
  .add('modal step', () => (
    <ModalStep header='hi there' onNext={action('next')} onClose={action('onclose')}/>
  ));
