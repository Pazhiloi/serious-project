import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Drawer } from './Drawer'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationList } from '@/entities/Notification';
export default {
  title: 'shared/Drawer',
  component: Drawer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: <NotificationList />,
  isOpen: true
}
Normal.decorators = [StoreDecorator({})]





