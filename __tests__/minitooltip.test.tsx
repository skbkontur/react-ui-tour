import {mount, render} from "enzyme";
import React from "react";
import {MiniTooltip} from "../src/lib";

describe('miniTooltip', () => {
    let wrapper;
    let div;
    beforeAll(() => {
        wrapper = mount(
            <div ref={tag => div = tag}>
                <MiniTooltip targetGetter={() => div}>F</MiniTooltip>
            </div>
        )
    })
    it("renders correctly", () => {
            expect(wrapper).toBeDefined();
        }
    )
});