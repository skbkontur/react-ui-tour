import * as React from 'react';
import ZIndex from "@skbkontur/react-ui/components/ZIndex/ZIndex";

const styles = require('./Highlight.less');

export interface HighlightProps {
  pos: ClientRect;
  highlight: React.ReactElement<any>;
  color?: string;
}

export function Highlight(props: HighlightProps) {
  const { pos, highlight, color } = props;

  const highlightRoot = React.cloneElement(highlight, {
    ...highlight.props,
    style: {
      ...highlight.props.style,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  });

  const width = pos.right - pos.left;
  const height = pos.bottom - pos.top;
  const borderTopWidth = pos.top + document.documentElement.scrollTop;
  const borderLeftWidth = pos.left + document.documentElement.scrollLeft;
  const computedStyles: React.CSSProperties = {
    borderColor: color,
    borderTopWidth,
    borderLeftWidth,
    borderRightWidth: document.documentElement.offsetWidth - (borderLeftWidth + width),
    borderBottomWidth: document.documentElement.offsetHeight - (borderTopWidth + height),
    width: width,
    height: height
  };

  return (
    <ZIndex delta={100} className={styles.wrapper} style={computedStyles}>
      {highlightRoot}
    </ZIndex>
  );
}
