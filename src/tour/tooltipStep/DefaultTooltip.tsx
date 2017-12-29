import * as React from 'react';

import './DefaultTooltip.css';

interface Props {
  children?: React.ReactElement<any> | React.ReactElement<any>[];
}

export function Tooltip({header, content, footer, onClose}) {
  return (
    <div className='tutorial-tooltip-container'>
      <span className='tutorial-tooltip-close' onClick={onClose}/>
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
    <div className='tutorial-tooltip-content'>
      {children}
    </div>
  );
}

export function Header({header}) {
  return (
    <div className='tutorial-tooltip-header'>
      {header}
    </div>
  );
}

export function Footer({children}: Props) {
  return (
    <div className='tutorial-tooltip-footer'>
      {children}
    </div>
  );
}

export function FooterLeftPart({children}: Props) {
  return (
    <div className='tutorial-tooltip-footer-leftpart'>
      {children}
    </div>
  );
}


export function FooterCenterPart({children}: Props) {
  return (
    <div className='tutorial-tooltip-footer-centerpart'>
      {children}
    </div>
  );
}

export function FooterRightPart({children}: Props) {
  return (
    <div className='tutorial-tooltip-footer-rightpart'>
      {children}
    </div>
  );
}