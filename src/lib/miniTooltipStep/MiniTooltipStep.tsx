import {MiniTooltip, PopupPosition} from "../components/miniTooltip/MiniTooltip";
import * as React from "react";
import {StepInternalProps} from "../tour/Tour";

export interface MiniTooltipStepProps extends Partial<StepInternalProps> {
    target: () => Element;
    positions: PopupPosition[];
    children?: any;
}

export class MiniTooltipStep extends React.Component<MiniTooltipStepProps> {
    render() {
        const {
            onNext,
            onClose,
            positions,
            target,
            children,
        } = this.props;

        return <MiniTooltip
            target={target}
            positions={positions}
            onClose={onClose}
            onTargetClicked={onNext}>
            {children}
        </MiniTooltip>
    }
}