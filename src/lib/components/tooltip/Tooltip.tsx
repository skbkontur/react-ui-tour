import * as React from 'react';
import RenderLayer from '@skbkontur/react-ui/components/RenderLayer';
import Popup from '@skbkontur/react-ui/components/Popup';

const styles = require('./Tooltip.less');

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
  onClose?: () => void;
  pinOptions?: PinOptions;
  width?: number;
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
        <div className={styles.tooltip} style={{ width: props.width }}>
          <span className={styles.closeBtn} onClick={props.onClose} />
          {props.children}
        </div>
      </Popup>
    </RenderLayer>
  );
};

Tooltip.defaultProps = {
  positions: ['bottom middle'],
  width: 500,
  pinOptions: {
    hasPin: true,
    pinSize: 16,
    pinOffset: 32
  },
  onClose: () => {}
};
