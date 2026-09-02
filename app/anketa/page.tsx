import type { Metadata } from 'next'
import { AnketaPageContent } from './anketa-page-content'

export const metadata: Metadata = {
  title: 'Заявка — pick by Milana',
  description:
    'Оставьте заявку — Милана свяжется с вами, чтобы обсудить детали занятий или подобрать преподавателя.',
}

export default function AnketaPage() {
  return <AnketaPageContent />
}
