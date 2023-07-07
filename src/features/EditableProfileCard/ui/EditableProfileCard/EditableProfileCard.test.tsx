import { Country } from "@/entities/Country"
import { Currency } from "@/entities/Currency"
import { Profile } from "@/entities/Profile"
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender"
import EditableProfileCard from "./EditableProfileCard"
import { profileReducer } from "../../model/slice/profileSlice"
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { $api } from '@/shared/api/api'

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  age: 55,
  currency: Currency.USD,
  country: Country.Ukraine,
  city: 'Kiev',
  username: 'admin213'
}

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile
    },
    user: {
      authData: { id: '1', username: 'admin' }
    }
  },
  asyncReducers: {
    profile: profileReducer
  }
}

describe('features/EditableProfileCard', () => {
  test('switch readonly regime', async () => {
    componentRender(<EditableProfileCard id={'1'} />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
  })

  test('when we are cancelled the data is reset', async () => {
    componentRender(<EditableProfileCard id={'1'} />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'))

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin')
  })

  test('test validation', async () => {
    componentRender(<EditableProfileCard id={'1'} />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()
  })

  test('if there are not a test validation', async () => {
    const mockPutReq = jest.spyOn($api, 'put')
    componentRender(<EditableProfileCard id={'1'} />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

    expect(mockPutReq).toHaveBeenCalled()
  })
})