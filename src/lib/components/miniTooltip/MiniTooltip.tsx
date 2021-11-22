import * as React from "react"
import {Popup, RenderLayer, ThemeProvider, ThemeFactory} from "../../react-ui/Adapter";
import {containsTargetOrRenderContainer} from "@skbkontur/react-ui/lib/listenFocusOutside";
import styles from "./MiniTooltip.less"

export type PopupPosition =
    | 'top left'
    | 'top center'
    | 'top right'
    | 'right top'
    | 'right middle'
    | 'right bottom'
    | 'bottom left'
    | 'bottom center'
    | 'bottom right'
    | 'left top'
    | 'left middle'
    | 'left bottom';

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
    target: (() => Element) | (() => Element)[];
    positions: PopupPosition[];
    onClose?: () => void;
    width?: string,
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

function arrayOrItemToArray<T>(arrayOrItem: T | T[]): T[] {
    const asArray = arrayOrItem as T[];
    if (asArray)
        return asArray

    const asItem = arrayOrItem as T;
    if (asItem)
        return [asItem]

    return []
}

export class MiniTooltip extends React.Component<MiniTooltipProps> {
    state = {hasElem: true}
    static defaultProps = {
        positions: ["bottom middle"],
        onClose: () => {
        },
    }

    componentWillMount() {
        const getFirstElement = arrayOrItemToArray(this.props.target)[0];
        if (getFirstElement && !getFirstElement()) {
            this.setState({hasElem: false})
        }
    }

    componentDidMount() {
        if (!this.state.hasElem) {
            this.props.onTargetClicked && this.props.onTargetClicked();
        }
    }

    onCloseButtonClick(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        this.props.onClose();
    }

    render() {
        const elementGetters = arrayOrItemToArray(this.props.target);
        const getFirstElement = elementGetters[0];
        if (!getFirstElement) return <span/>;
        
        const anchor = getFirstElement();
        if (!anchor) return <span/>;
        
        const elements = elementGetters.map(g => g());
        function isClickOnTarget(event: Event) {
            if(!(event.target instanceof Element))
                return false;
            const elementClicked = containsTargetOrRenderContainer(event.target);
            return elements.some(e => elementClicked(e));
        }

        return (
            <ThemeProvider value={MiniTooltipTheme}>
                <RenderLayer
                    onClickOutside={e => isClickOnTarget(e) && this.props.onClose()}
                    active
                >
                    <Popup
                        anchorElement={anchor}
                        positions={this.props.positions}
                        disableAnimations={false}
                        opened
                        hasShadow
                        maxWidth={"400px"}
                        minWidth={"256px"}
                        useWrapper={false}
                        ignoreHover={false}
                        hasPin
                        pinSize={8}
                        pinOffset={16}
                        popupOffset={0}
                        margin={12}>
                        <div className={styles.body} style={{width: this.props.width}}>
                            {this.props.children}
                            <div className={styles.cross} onClick={e => this.onCloseButtonClick(e)}>
                                <CrossIcon/>
                            </div>
                        </div>
                    </Popup>
                </RenderLayer>
            </ThemeProvider>
        );
    }
}
