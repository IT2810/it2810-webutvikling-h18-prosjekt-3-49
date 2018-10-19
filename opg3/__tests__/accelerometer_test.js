import React from 'react';
import Accelerometer from "../components/Accelerometer";

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<Accelerometer />).toJSON();
    expect(tree).toMatchSnapshot();
});