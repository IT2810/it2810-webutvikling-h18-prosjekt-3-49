import React from 'react';
import ContactManager from "../components/Contacts";

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<ContactManager />).toJSON();
    expect(tree).toMatchSnapshot();
});