import {mount} from "enzyme";
import React from "react";
import * as Adapter from "../src/lib/react-ui/Adapter";
import * as ReactUI2 from "@skbkontur/react-ui";

jest.mock("../src/lib/react-ui/Adapter", () => {
  return ReactUI2;
});
import {MiniTooltip} from "../src/lib";


describe('miniTooltip', () => {
    let wrapper;
    let div;
    beforeAll(() => {
        wrapper = mount(
            <div ref={tag => div = tag}>
                <MiniTooltip target={() => div}>F</MiniTooltip>
            </div>
        )
    })
    it("renders correctly", () => {
            expect(wrapper).toBeDefined();
        }
    )
});