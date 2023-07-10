import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import {Popover} from './Popover'
import { Button } from '@/shared/ui/Button'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

export default {
  title: 'shared/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Popover>

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />

export const Normal = Template.bind({})
Normal.args = {
  trigger: <Button>Open</ Button>
}
Normal.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Dark = Template.bind({})
Dark.args = {
  trigger: <Button>Open</ Button>
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]