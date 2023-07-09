import {memo, useCallback, useEffect, useState} from 'react'
import cls from './RatingCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import Card from '@/shared/ui/Card/Card';
import StarRating from '@/shared/ui/StarRating/StarRating';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useMobile } from '@/shared/lib/hooks/useMobile/useMobile';
interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    feedbackTitle,
    hasFeedback,
    onAccept,
    onCancel,
    title
  } = props;

  const { t, i18n } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [starsCount, setStarsCount] = useState(0)
  const [feedback, setFeedback] = useState('')

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount)
    if (hasFeedback) {
      setIsModalOpen(true)
    } else {
      onAccept?.(selectedStarsCount)
    }
    setIsModalOpen(true)
  }, [onAccept, hasFeedback])

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false)
    onAccept?.(starsCount, feedback)
  }, [feedback, starsCount, onAccept])

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false)
    onCancel?.(starsCount)
  }, [onCancel, starsCount])

  const modalContent = (
    <VStack max gap={'32'}>
      <Text title={feedbackTitle} />
      <Input value={feedback} onChange={setFeedback} placeholder={t('Your comment')} />
      <HStack max gap={'16'} justify={'end'}>
        <Button onClick={cancelHandle} theme={ButtonTheme.OUTLINE_RED}>
          {t('Close')}
        </Button>
        <Button onClick={acceptHandle}>
          {t('Send')}
        </Button>
      </HStack>
    </VStack>
  )

  // for mobile or pc
  const {width} = useMobile()

  const isMobile = width <= 768
  return (
    <Card className={classNames(cls.RatingCard, {}, [className])}>
      <VStack align={'center'} gap={'8'}>
        <Text title={title} />
        <StarRating size={40} onSelect={onSelectStars} />
      </VStack>

      {isMobile
        ? (
          <Drawer isOpen={isModalOpen} lazy>
            {modalContent}
          </Drawer>
        )
        : (
          <Modal isOpen={isModalOpen} lazy>
            {modalContent}
          </Modal>
        )
      }
    </Card>
  );
});

export default RatingCard