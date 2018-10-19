import React from 'react';
import Goals from '../Goals';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<Goals />).toJSON();
    expect(tree).toMatchSnapshot();
});