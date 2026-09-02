'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { AnketaForm } from '@/components/anketa-form'

function AnketaPageInner() {
  const searchParams = useSearchParams()
  const variant = searchParams.get('type') === 'teacher' ? 'teacher' : 'milana'

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

export function AnketaPageContent() {
  return (
    <Suspense
      fallback={
        <main
          className="min-h-svh w-full px-5 py-8 sm:px-8 sm:py-10"
          style={{ background: '#F7F1E5' }}
        >
          <div className="mx-auto w-full max-w-[560px] font-sans text-[14px] text-black/45">
            Загрузка…
          </div>
        </main>
      }
    >
      <AnketaPageInner />
    </Suspense>
  )
}
