﻿import * as React from "react"
import {Popup, RenderLayer, ThemeProvider, ThemeFactory} from "../../react-ui/Adapter";
import {PopupPosition} from "@skbkontur/react-ui/internal/Popup";
import {containsTargetOrRenderContainer} from "@skbkontur/react-ui/lib/listenFocusOutside";

const styles = require("./MiniTooltip.less");

const CrossIcon = () => (
    <svg
        fill="currentColor"
        fillRule="evenodd"
        strokeLinejoin="round"
        clipRule="evenodd"
        viewBox="0 0 10 10"
    >
        <polygon
            id="Path"
            points="6 5 10 9 9 10 5 6 1 10 0 9 4 5 0 1 1 0 5 4 9 0 10 1"
        />
    </svg>
);

export interface MiniTooltipProps {
    targetGetter: () => Element;
    positions?: string[];
    onClose?: () => void;
    onTargetClicked?: () => void;
    children: JSX.Element | string;
}

const MiniTooltipTheme = ThemeFactory.create({
    bgDefault: "#0697FF",
    popupBorderRadius: "8px",
    popupTextColor: "white",
    popupDropShadow:
        "drop-shadow(rgba(6, 151, 255, 0.2) 2px 8px 16px) drop-shadow(rgba(6, 151, 255, 0.2) 0px -2px 4px)",
    tooltipCloseBtnColor: "rgba(255, 255, 255, 0.374)",
    tooltipCloseBtnHoverColor: "white",
});

export class MiniTooltip extends React.Component<MiniTooltipProps> {
    state = {hasElem: false}
    static defaultProps = {
        positions: ["bottom middle"],
        onClose: () => {
        },
    }

    componentWillMount() {
        if (!this.props.targetGetter()) {
            this.setState({hasElem: false})
        }
    }

    componentDidMount() {
        if (!this.state.hasElem) {
            this.props.onTargetClicked && this.props.onTargetClicked();
        }
    }


    render() {
        const positions: PopupPosition[] = this.props.positions as PopupPosition[];

        const anchor = this.props.targetGetter();
        if (!anchor) return <span/>;

        function isClickOnTarget(event: Event) {
            return (
                event.target instanceof Element &&
                containsTargetOrRenderContainer(event.target)(anchor)
            );
        }

        function onCloseButtonClick(e: React.MouseEvent<HTMLElement>) {
            e.stopPropagation();
            this.props.onClose();
        }

        return (
            <ThemeProvider value={MiniTooltipTheme}>
                <RenderLayer
                    onClickOutside={e => isClickOnTarget(e) && this.props.onClose()}
                    active
                >
                    <Popup
                        anchorElement={anchor}
                        positions={positions}
                        disableAnimations={false}
                        opened
                        hasShadow
                        maxWidth={"400px"}
                        hasPin
                        pinSize={8}
                        pinOffset={0}
                        popupOffset={0}
                        useWrapper={false}
                        margin={0}
                        ignoreHover={false}
                    >
                        <div className={styles.body}>
                            {this.props.children}
                            <div className={styles.cross} onClick={onCloseButtonClick}>
                                <CrossIcon/>
                            </div>
                        </div>
                    </Popup>
                </RenderLayer>
            </ThemeProvider>
        );
    }
}
