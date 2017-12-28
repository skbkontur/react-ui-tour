import * as React from 'react';

import './defaultTooltip.css';

export function Tooltip({header, content, footer, onClose}) {
  return (
    <div className='tutorial-tooltip-container'>
      <span className='tutorial-tooltip-close' onClick={onClose}/>
      <div>
        <Header header={header}/>
        <Content children={content}/>
        {footer}
      </div>
    </div>
  );
}

function Content({children}) {
  return (
    <div className='tutorial-tooltip-content'>
      {children}
    </div>
  );
}

function Header({header}) {
  return (
    <div className='tutorial-tooltip-header'>
      {header}
    </div>
  );
}
