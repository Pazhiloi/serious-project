import {Page} from '@/widgets/Page'
import React from 'react'
import { useTranslation } from 'react-i18next'

const AdminPanelPage = () => {
  const { t, i18n } = useTranslation('about')
  return (
    <Page>
      {t('Admin panel')}
    </Page>
  )
}

export default AdminPanelPage