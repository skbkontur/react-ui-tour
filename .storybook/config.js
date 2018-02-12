import { configure } from '@storybook/react'

function loadStories () {
  require('../stories/tourStory.tsx')
}

configure(loadStories, module)
