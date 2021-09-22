import {MiniTooltip} from "../components/miniTooltip/MiniTooltip";
import {Step} from "../../../build";
import * as React from "react";

interface MiniTooltipStepProps {
    targetGetter: () => Element;
    positions?: string[];
    children?: any;
}

export const MiniTooltipStep: React.FC<MiniTooltipStepProps> = React.memo(
    (props: MiniTooltipStepProps) =>
    <Step render={tourProps =>
        <MiniTooltip
            targetGetter={props.targetGetter}
            positions={props.positions}
            onClose={tourProps.onClose}
            onTargetClicked={tourProps.onNext}>
            {props.children}
        </MiniTooltip>}
    />);