import { configure } from '@kadira/storybook';

function loadStories() {
  require('../storybook/stories/nav');
  // require as many stories as you need.
}

configure(loadStories, module);
