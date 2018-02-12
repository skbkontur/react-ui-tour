import * as React from 'react';

const styles = require('./Tooltip.less');

export interface WrapperProps {
  children?: React.ReactNode;
}

export interface TooltipProps extends WrapperProps {
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

export function Content({children}: WrapperProps) {
  return <div className={styles.tooltipContent}>{children}</div>;
}

export function Header({children}: WrapperProps) {
  return <div className={styles.tooltipHeader}>{children}</div>;
}

export function Footer({children}: WrapperProps) {
  return <div className={styles.tooltipFooter}>{children}</div>;
}

export function FooterLeftPart({children}: WrapperProps) {
  return <div className={styles.tooltipFooterLeftPart}>{children}</div>;
}

export function FooterCenterPart({children}: WrapperProps) {
  return <div className={styles.tooltipFooterCenterPart}>{children}</div>;
}

export function FooterRightPart({children}: WrapperProps) {
  return <div className={styles.tooltipFooterRightPart}>{children}</div>;
}