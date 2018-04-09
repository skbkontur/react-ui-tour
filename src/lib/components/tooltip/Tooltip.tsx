import * as React from 'react';
import RenderLayer from '@skbkontur/react-ui/components/RenderLayer';
import Popup from '@skbkontur/react-ui/components/Popup';

import { TooltipContainer, Header, Content } from './TooltipParts';

export interface PinOptions {
  hasPin?: boolean;
  pinSize?: number;
  pinOffset?: number;
}

export type TooltipPartElement = React.ReactElement<any> | React.ReactText;

export interface TooltipProps {
  targetGetter: () => Element;
  positions?: string[];
  offset?: number;
  width?: number;
  onClose?: () => void;
  pinOptions?: PinOptions;
  content?: TooltipPartElement;
  header?: TooltipPartElement;
  footer?: TooltipPartElement;
  render?: () => TooltipPartElement;
}

export const Tooltip: React.SFC<TooltipProps> = props => {
  return (
    <RenderLayer
      onClickOutside={props.onClose}
      onFocusOutside={() => {}}
      active
    >
      <Popup
        anchorElement={props.targetGetter()}
        positions={props.positions}
        margin={props.offset}
        {...props.pinOptions}
        opened
        hasShadow
      >
        {props.render ? (
          props.render()
        ) : (
          <TooltipContainer width={props.width} onClose={props.onClose}>
            <Header>{props.header}</Header>
            <Content>{props.content}</Content>
            {props.footer}
          </TooltipContainer>
        )}
      </Popup>
    </RenderLayer>
  );
};

Tooltip.defaultProps = {
  positions: ['bottom middle'],
  pinOptions: {
    hasPin: true,
    pinSize: 16,
    pinOffset: 32
  },
  onClose: () => {}
};
