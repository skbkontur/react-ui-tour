import * as React from 'react';

import {Content, Header} from "./TooltipParts";

const styles = require('./Tooltip.less');

export interface TooltipProps {
  children?: React.ReactNode;
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode | ((props: any) => React.ReactNode);
  width?: number;
  onClose?: () => void;
}

export const Tooltip: React.StatelessComponent<TooltipProps> = props => {
  return (
    <div className={styles.tooltipContainer} style={{width: props.width}}>
      <span className={styles.tooltipClose} onClick={props.onClose}/>
      <div>
        <Header>{props.header}</Header>
        <Content>{props.content}</Content>
        {props.footer}
      </div>
    </div>
  );
};

Tooltip.defaultProps = {
  width: 500
};
