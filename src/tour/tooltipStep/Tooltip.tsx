import * as React from 'react';

const styles = require('./Tooltip.less');

interface Props {
  children?: React.ReactElement<any> | React.ReactElement<any>[];
}

export function Tooltip({header, content, footer, onClose}) {
  return (
    <div className={styles.tooltipContainer}>
      <span className={styles.tooltipClose} onClick={onClose}/>
      <div>
        <Header header={header}/>
        <Content>{content}</Content>
        {footer}
      </div>
    </div>
  );
}

export function Content({children}: Props) {
  return (
    <div className={styles.tooltipContent}>
      {children}
    </div>
  );
}

export function Header({header}: {header: string}) {
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