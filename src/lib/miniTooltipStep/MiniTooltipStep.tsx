import {MiniTooltip} from "../components/miniTooltip/MiniTooltip";
import * as React from "react";
import {Step} from "../step/step";
import {StepInternalProps} from "../tour/Tour";

export interface MiniTooltipStepProps extends Partial<StepInternalProps> {
    targetGetter: () => Element;
    positions?: string[];
    children?: any;
}

export class MiniTooltipStep extends React.Component<MiniTooltipStepProps> {
    render() {
        const {
            onNext,
            onClose,
            positions,
            targetGetter,
            children
        } = this.props;

        return <MiniTooltip
            targetGetter={targetGetter}
            positions={positions}
            onClose={onClose}
            onTargetClicked={onNext}>
            {children}
        </MiniTooltip>
    }
}