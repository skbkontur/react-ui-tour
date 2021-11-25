import {MiniTooltip, PopupPosition} from "../components/miniTooltip/MiniTooltip";
import * as React from "react";
import {StepInternalProps} from "../tour/Tour";

export interface MiniTooltipStepProps extends Partial<StepInternalProps> {
    target: () => Element;
    triggers?: (() => Element)[];
    positions: PopupPosition[];
    children?: any;
    width?: string,
}

export class MiniTooltipStep extends React.Component<MiniTooltipStepProps> {
    render() {
        const {
            onNext,
            onClose,
            positions,
            target,
            triggers,
            children,
            width
        } = this.props;

        return <MiniTooltip
            target={target}
            triggers={triggers}
            positions={positions}
            onClose={onClose}
            onTargetClicked={onNext}
            width={width}>
            {children}
        </MiniTooltip>
    }
}