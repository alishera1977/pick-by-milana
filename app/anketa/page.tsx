import Link from 'next/link'
import type { Metadata } from 'next'
import { AnketaForm } from '@/components/anketa-form'

export const metadata: Metadata = {
  title: 'Заявка — pick by Milana',
  description:
    'Оставьте заявку — Милана свяжется с вами, чтобы обсудить детали занятий или подобрать преподавателя.',
}

export default async function AnketaPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams
  const variant = type === 'teacher' ? 'teacher' : 'milana'

  return (
    <main
      className="min-h-svh w-full overflow-x-hidden px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14"
      style={{ background: '#F7F1E5' }}
    >
      <div className="mx-auto w-full max-w-[560px]">
        <Link
          href="/#team"
          className="inline-flex font-sans text-[12px] text-black/45 transition-colors hover:text-black"
        >
          ← Назад
        </Link>

        <div className="mt-6 sm:mt-8">
          <AnketaForm variant={variant} />
        </div>
      </div>
    </main>
  )
}
