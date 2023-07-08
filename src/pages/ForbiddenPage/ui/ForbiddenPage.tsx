import Page from "@/widgets/Page/Page"
import { useTranslation } from "react-i18next"

const ForbiddenPage = () => {
  const { t, i18n } = useTranslation()
  return (
    <Page>
      {t('You have not right for that page')}
    </Page>
  )
}

export default ForbiddenPage