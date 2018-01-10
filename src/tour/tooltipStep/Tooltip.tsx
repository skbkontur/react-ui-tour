import * as React from 'react';

const styles = require('./Tooltip.less');

interface Props {
  children?: React.ReactElement<any> | React.ReactElement<any>[] | string;
}

export interface TooltipProps extends Props {
  header: React.ReactElement<any> | string;
  content: React.ReactElement<any> | string;
  footer: React.ReactElement<any> | ((props: any) => React.ReactElement<any>);
  width: number;
  onClose?: () => void;
}

export const Tooltip: React.StatelessComponent<TooltipProps> = (props: TooltipProps) => {
  return (
    <div className={styles.tooltipContainer} style={{width: props.width}}>
      <span className={styles.tooltipClose} onClick={props.onClose}/>
      <div>
        <Header header={props.header}/>
        <Content>{props.content}</Content>
        {props.footer}
      </div>
    </div>
  );
};

Tooltip.defaultProps = {
  width: 500
};

export function Content({children}: Props) {
  return (
    <div className={styles.tooltipContent}>
      {children}
    </div>
  );
}

export function Header({header}) {
  return (
    <div className={styles.tooltipHeader}>
      {header}
    </div>
  );
}

export function Footer({children}: Props) {
  return (
    <div className={styles.tooltipFooter}>
      {children}
    </div>
  );
}

export function FooterLeftPart({children}: Props) {
  return (
    <div className={styles.tooltipFooterLeftPart}>
      {children}
    </div>
  );
}

export function FooterCenterPart({children}: Props) {
  return (
    <div className={styles.tooltipFooterCenterPart}>
      {children}
    </div>
  );
}

export function FooterRightPart({children}: Props) {
  return (
    <div className={styles.tooltipFooterRightPart}>
      {children}
    </div>
  );
}