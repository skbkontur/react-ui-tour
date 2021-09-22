import {MiniTooltip} from "../components/miniTooltip/MiniTooltip";
import * as React from "react";
import {Step} from "../step/step";

interface MiniTooltipStepProps {
    targetGetter: () => Element;
    positions?: string[];
    children?: any;
}

export const MiniTooltipStep: React.FC<MiniTooltipStepProps> = (props: MiniTooltipStepProps) =>
    <Step render={tourProps =>
        <MiniTooltip
            targetGetter={props.targetGetter}
            positions={props.positions}
            onClose={tourProps.onClose}
            onTargetClicked={tourProps.onNext}>
            {props.children}
        </MiniTooltip>}
    />;