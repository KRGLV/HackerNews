import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Hello from "./../src/public/components/Hello";

Enzyme.configure({ adapter: new Adapter() });

describe("<Hello />", () => {
    it("renders <Hello />", () => {
        const wrapper = shallow(<Hello page="0" />);

        const actual = wrapper.find("h1").text();

        const expected = "Page Number, 0";

        expect(actual).to.be.equal(expected);
    });
});
