import {MiniTooltip, PopupPosition} from "../components/miniTooltip/MiniTooltip";
import * as React from "react";
import {StepInternalProps} from "../tour/Tour";

export interface MiniTooltipStepProps extends Partial<StepInternalProps> {
    target: () => Element;
    positions: PopupPosition[];
    children?: any;
    hasPin?: boolean;
    pinSize?: number;
    pinOffset?: number;
    popupOffset?: number;
    margin?: number;
}

export class MiniTooltipStep extends React.Component<MiniTooltipStepProps> {
    render() {
        const {
            onNext,
            onClose,
            positions,
            target,
            children,
            hasPin,
            pinOffset,
            pinSize,
            popupOffset,
            margin
        } = this.props;

        return <MiniTooltip
            target={target}
            positions={positions}
            onClose={onClose}
            onTargetClicked={onNext}
            hasPin={hasPin}
            pinOffset={pinOffset}
            pinSize={pinSize}
            popupOffset={popupOffset}
            margin={margin}>
            {children}
        </MiniTooltip>
    }
}