import * as React from 'react';

const styles = require('./Tooltip.less');

export interface PartProps {
  children?: React.ReactNode;
}

export function Content({children}: PartProps) {
  return <div className={styles.tooltipContent}>{children}</div>;
}

export function Header({children}: PartProps) {
  return <div className={styles.tooltipHeader}>{children}</div>;
}

export type FooterProps = PartProps & {style?: React.CSSProperties};

export function Footer({children, style}: FooterProps) {
  return <div className={styles.tooltipFooter} style={style}>{children}</div>;
}

export function FooterLeftPart({children}: PartProps) {
  return <div className={styles.tooltipFooterLeftPart}>{children}</div>;
}

export function FooterCenterPart({children}: PartProps) {
  return <div className={styles.tooltipFooterCenterPart}>{children}</div>;
}

export function FooterRightPart({children}: PartProps) {
  return <div className={styles.tooltipFooterRightPart}>{children}</div>;
}

export interface ImageProps {
  url: string;
  style?: React.CSSProperties;
}

export function FooterImage({url, style}: ImageProps) {
  return (
    <div className={styles.tooltipImage} style={style}>
      <img src={url} />
    </div>
  );
}