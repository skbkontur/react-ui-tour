import * as React from 'react';

import './TourButton.css';

export interface Props {
  color: string;
  arrow?: string;
  style?: Object;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactText;
}

export function TourButton(props: Props) {
  let className = `tour-button tour-button-${props.color}`;
  if (props.arrow === 'right' || props.arrow === 'left') {
    className = `${className} tour-button-arrow tour-button-arrow-${props.arrow}`;
  }
  return <div style={{display: 'inline-block'}}>
    <button style={props.style} className={className} onClick={props.onClick}>
      <div style={{position: 'relative'}}>
        {props.children}
      </div>
    </button>
  </div>;
}
