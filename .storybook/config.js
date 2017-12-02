import { configure } from '@storybook/react';

function loadStories() {
	require('../stories/exampleStory.tsx');
}

configure(loadStories, module);
