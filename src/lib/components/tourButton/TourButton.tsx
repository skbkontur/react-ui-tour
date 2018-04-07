import * as React from 'react';

const styles = require('./TourButton.less');

export interface TourButtonProps {
  color: string;
  arrow?: string;
  style?: Object;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactText;
}

export function TourButton(props: TourButtonProps) {
  let className = `${styles.tourButton} ${styles[props.color + 'TourButton']}`;
  if (props.arrow === 'right' || props.arrow === 'left') {
    className = `${className} ${styles.tourButtonArrow} ${
      styles[props.arrow + 'TourButtonArrow']
    }`;
  }
  
  return (
    <div style={{ display: 'inline-block' }}>
      <button style={props.style} className={className} onClick={props.onClick}>
        <div style={{ position: 'relative' }}>{props.children}</div>
      </button>
    </div>
  );
}
