import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationList } from './NotificationList'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import withMock from 'storybook-addon-mock'
export default {
  title: 'shared/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock]
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
};
Normal.decorators = [StoreDecorator({})]
Normal.parameters = {
  mockData: [{
    url: `${__API__}/notifications`,
    method: 'GET',
    status: 200,
    response: [
      {
        id: '1',
        title: 'Message',
        description: 'Your first message'
      }
    ]
  }]
}




