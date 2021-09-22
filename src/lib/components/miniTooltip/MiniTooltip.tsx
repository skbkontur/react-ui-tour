import * as React from "react";
import {Popup, PopupPosition} from "@skbkontur/react-ui/internal/Popup";
import styles from "./MiniTooltip.less";
import {ThemeProvider} from "@skbkontur/react-ui/components/ThemeProvider";
import {ThemeFactory} from "@skbkontur/react-ui/lib/theming/ThemeFactory";

import {useEffect, useState} from "react";
import {RenderLayer} from "@skbkontur/react-ui/internal/RenderLayer";
import {CrossIcon} from "@skbkontur/react-ui/internal/icons/CrossIcon";
import {containsTargetOrRenderContainer} from "@skbkontur/react-ui/lib/listenFocusOutside";

interface TooltipProps {
    targetGetter: () => Element;
    positions?: string[];
    onClose?: () => void;
    onTargetClicked?: () => void;
    children: JSX.Element | string;
}

export const MiniTooltipTheme = ThemeFactory.create({
    bgDefault: "#0697FF",
    popupBorderRadius: "8px",
    popupTextColor: "white",
    popupDropShadow:
        "drop-shadow(rgba(6, 151, 255, 0.2) 2px 8px 16px) drop-shadow(rgba(6, 151, 255, 0.2) 0px -2px 4px)",
    tooltipCloseBtnColor: "rgba(255, 255, 255, 0.374)",
    tooltipCloseBtnHoverColor: "white",
});

export function MiniTooltip(componentProps: TooltipProps) {
    const props = {
        positions: ["bottom middle"],
        onClose: () => {
        },
        ...componentProps,
    };
    const positions: PopupPosition[] = props.positions as PopupPosition[];

    const [hasElem, setHasElem] = useState(true);
    if (!hasElem) return <span/>;

    const anchor = props.targetGetter();
    useEffect(() => {
        if (!props.targetGetter()) {
            setHasElem(false);
            props.onTargetClicked && props.onTargetClicked();
        }
    });

    function isClickOnTarget(event: Event) {
        return (
            event.target instanceof Element &&
            containsTargetOrRenderContainer(event.target)(anchor)
        );
    }

    function onCloseButtonClick(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        props.onClose();
    }

    return (
        <ThemeProvider value={MiniTooltipTheme}>
            <RenderLayer
                onClickOutside={e => isClickOnTarget(e) && props.onClose()}
                active
            >
                <Popup
                    anchorElement={anchor}
                    positions={positions}
                    opened
                    hasShadow
                    maxWidth={"400px"}
                    hasPin
                    pinSize={8}
                >
                    <div className={styles.body}>
                        {props.children}
                        <div className={styles.cross} onClick={onCloseButtonClick}>
                            <CrossIcon/>
                        </div>
                    </div>
                </Popup>
            </RenderLayer>
        </ThemeProvider>
    );
}
