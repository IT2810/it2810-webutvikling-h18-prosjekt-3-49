import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from '../App';

const renderer = new ShallowRenderer();
renderer.render(<App/>);
const result = renderer.getRenderOutput();

it('renders correctly', () => {
    expect(result.type).toBe('div');
});
