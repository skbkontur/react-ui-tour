import * as React from 'react';

const styles = require('./Footer.less');

export interface FooterProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export class Footer extends React.Component<FooterProps> {
  static LeftPart = FooterLeftPart;
  static CenterPart = FooterCenterPart;
  static RightPart = FooterRightPart;
  static Image = FooterImage;
  
  render () {
    return (
      <div className={styles.footer} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export interface FooterPartProps {
  children?: React.ReactNode;
}

export function FooterLeftPart({ children }: FooterPartProps) {
  return <div className={styles.footerLeftPart}>{children}</div>;
}

export function FooterCenterPart({ children }: FooterPartProps) {
  return <div className={styles.footerCenterPart}>{children}</div>;
}

export function FooterRightPart({ children }: FooterPartProps) {
  return <div className={styles.footerRightPart}>{children}</div>;
}

export interface FooterImageProps {
  url: string;
  style?: React.CSSProperties;
}

export function FooterImage({ url, style }: FooterImageProps) {
  return (
    <div className={styles.footerImage} style={style}>
      <img src={url} />
    </div>
  );
}
