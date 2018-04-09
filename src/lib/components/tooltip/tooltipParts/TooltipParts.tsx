import * as React from 'react';

const styles = require('./TooltipParts.less');

export interface PartProps {
  children?: React.ReactNode;
}

export function TooltipContainer({ children }: PartProps) {
  return <div className={styles.container}>{children}</div>;
}

export function Content({ children }: PartProps) {
  return <div className={styles.content}>{children}</div>;
}

export function Header({ children }: PartProps) {
  return <div className={styles.header}>{children}</div>;
}

export type FooterProps = PartProps & { style?: React.CSSProperties };

export function Footer({ children, style }: FooterProps) {
  return (
    <div className={styles.footer} style={style}>
      {children}
    </div>
  );
}

export function FooterLeftPart({ children }: PartProps) {
  return <div className={styles.footerLeftPart}>{children}</div>;
}

export function FooterCenterPart({ children }: PartProps) {
  return <div className={styles.footerCenterPart}>{children}</div>;
}

export function FooterRightPart({ children }: PartProps) {
  return <div className={styles.footerRightPart}>{children}</div>;
}

export interface ImageProps {
  url: string;
  style?: React.CSSProperties;
}

export function FooterImage({ url, style }: ImageProps) {
  return (
    <div className={styles.footerImage} style={style}>
      <img src={url} />
    </div>
  );
}
