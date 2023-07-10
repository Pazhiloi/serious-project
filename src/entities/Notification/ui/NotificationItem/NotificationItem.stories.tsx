import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationItem } from './NotificationItem'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
export default {
  title: 'entities/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator({})]
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  item:
  {
    id: '1',
    title: 'Уведомление 1',
    description: 'Произошло какое-то событие'
  }
}
Normal.decorators = [ThemeDecorator(Theme.LIGHT)]

export const DARK = Template.bind({})
DARK.args = {
  item:
  {
    id: '1',
    title: 'Уведомление 1',
    description: 'Произошло какое-то событие'
  }
}
DARK.decorators = [ThemeDecorator(Theme.DARK)]





