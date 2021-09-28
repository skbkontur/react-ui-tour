import {MiniTooltip} from "../components/miniTooltip/MiniTooltip";
import * as React from "react";
import {Step} from "../step/step";

export interface MiniTooltipStepProps {
    targetGetter: () => Element;
    positions?: string[];
    children?: any;
}

export class MiniTooltipStep extends React.Component<MiniTooltipStepProps> {
    render() {
        return <Step render={tourProps =>
            <MiniTooltip
                targetGetter={this.props.targetGetter}
                positions={this.props.positions}
                onClose={tourProps.onClose}
                onTargetClicked={tourProps.onNext}>
                {this.props.children}
            </MiniTooltip>}
        />;
    }
}