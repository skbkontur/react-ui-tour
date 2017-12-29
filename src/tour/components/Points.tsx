import * as React from 'react';

export interface Props {
  count: number;
  activePointIndex: number;
}

export function Points(props: Props) {
  const points = [];
  for (let i = 1; i <= props.count; i++) {
    if (i === props.activePointIndex) {
      points.push(<span key={i} className='tutorial-tooltip-point tutorial-tooltip-point-active'/>);
    } else {
      points.push(<span key={i} className='tutorial-tooltip-point'/>);
    }
  }
  return (
    <div className='tutorial-tooltip-selector'>
      {points}
    </div>
  );
}
