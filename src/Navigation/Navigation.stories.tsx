import { Story, Meta } from "@storybook/react";

import { Props4Navigation, Navigation } from "./Navigation";

export default {
  component: Navigation,
  title: "Navigation",
};

const Template: Story<Props4Navigation> = (args) => <Navigation {...args} />;

export const Default = Template.bind({});
Default.args = {
  targetYear: 2021,
  targetMonth: 8,
};
