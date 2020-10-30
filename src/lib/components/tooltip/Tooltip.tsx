import * as React from "react";
import {RenderLayer} from "@skbkontur/react-ui/internal/RenderLayer";
import {Popup, PopupPosition} from "@skbkontur/react-ui/internal/Popup";
import styles from "./Tooltip.less";

export interface PinOptions {
  hasPin?: boolean;
  pinSize?: number;
  pinOffset?: number;
}

export type TooltipPartElement = React.ReactElement<any> | React.ReactText;

export interface TooltipProps {
  targetGetter: () => Element;
  positions?: string[];
  offset?: number;
  onClose?: () => void;
  onSkip?: () => void;
  pinOptions?: PinOptions;
  width?: number;
}

export class Tooltip extends React.Component<TooltipProps> {
  static defaultProps = {
    positions: ["bottom middle"],
    width: 500,
    pinOptions: {
      hasPin: true,
      pinSize: 16,
      pinOffset: 32
    },
    onClose: () => {}
  };
  static Container = Container;
  static Header = Header;
  static Body = Content;
  static Footer = Footer;
  state = {hasElem: true}

  componentWillMount() {
    if (!this.props.targetGetter()) {
      this.setState({hasElem: false})
    }
  }

  render() {
    if (!this.state.hasElem) return <span />;
    const positions: PopupPosition[] = this.props.positions as PopupPosition[];
    return (
      <RenderLayer
        onClickOutside={this.props.onClose}
        onFocusOutside={() => {}}
        active
      >
        <Popup
          anchorElement={this.props.targetGetter()}
          positions={positions}
          margin={this.props.offset}
          {...this.props.pinOptions}
          opened
          hasShadow
          maxWidth={this.props.width}
        >
          <div className={styles.tooltip} style={{ width: this.props.width }}>
            <span className={styles.closeBtn} onClick={this.props.onClose} />
            {this.props.children}
          </div>
        </Popup>
      </RenderLayer>
    );
  }
  componentDidMount() {
    if (!this.state.hasElem) {
      this.props.onSkip && this.props.onSkip();
    }
  }
}

export interface TooltipPartProps {
  children?: React.ReactNode;
}

export function Container({ children }: TooltipPartProps) {
  return <div className={styles.container}>{children}</div>;
}

export function Header({ children }: TooltipPartProps) {
  return <div className={styles.header}>{children}</div>;
}

export function Content({ children }: TooltipPartProps) {
  return <div className={styles.body}>{children}</div>;
}

function Footer({ children }: TooltipPartProps) {
  return <div className={styles.footer}>{children}</div>;
}
