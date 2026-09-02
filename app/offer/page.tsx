import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Договор / Оферта — pick by Milana',
  description: 'Договор оферты сервиса PICK by Milana.',
}

export default function OfferPage() {
  return (
    <main
      className="min-h-svh w-full overflow-x-hidden px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14"
      style={{ background: '#F7F1E5' }}
    >
      <div className="mx-auto w-full max-w-[720px]">
        <Link
          href="/"
          className="inline-flex font-sans text-[12px] text-black/45 transition-colors hover:text-black"
        >
          ← Назад
        </Link>

        <h1 className="mt-8 font-[family-name:var(--font-heading-sans)] text-[28px] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-black sm:mt-10 sm:text-[36px] lg:text-[42px] lg:leading-[0.95]">
          Договор / Оферта
        </h1>

        <div className="mt-8 h-px w-full bg-black/10 sm:mt-10" />

        <p className="mt-8 font-sans text-[14px] leading-[1.55] text-black/55 sm:text-[15px]">
          Документ готовится к публикации.
        </p>
      </div>
    </main>
  )
}
