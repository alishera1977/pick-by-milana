import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Реквизиты — pick by Milana',
  description: 'Реквизиты ИП Щербакова Милана Павловна — сервис PICK by Milana.',
}

const olive = '#58683F'

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-black/10 py-3 first:border-t-0 first:pt-0 sm:py-3.5">
      <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-black/45 sm:text-[12px]">
        {label}
      </dt>
      <dd className="mt-1 font-sans text-[13px] leading-[1.45] text-black sm:text-[14px] sm:leading-[1.5]">
        {value}
      </dd>
    </div>
  )
}

function DetailBlock({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <h2
        className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] sm:text-[12px]"
        style={{ color: olive }}
      >
        {title}
      </h2>
      <div className="mt-4 border-b border-black/10">
        <dl>{children}</dl>
      </div>
    </section>
  )
}

export default function RequisitesPage() {
  return (
    <main
      className="min-h-svh w-full overflow-x-hidden px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14"
      style={{ background: '#F7F1E5' }}
    >
      <div className="mx-auto w-full max-w-[960px]">
        <Link
          href="/"
          className="inline-flex font-sans text-[12px] text-black/45 transition-colors hover:text-black"
        >
          ← Назад
        </Link>

        <h1 className="mt-8 font-[family-name:var(--font-heading-sans)] text-[28px] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-black sm:mt-10 sm:text-[36px] lg:text-[42px] lg:leading-[0.95]">
          Реквизиты
        </h1>

        <div className="mt-8 h-px w-full bg-black/10 sm:mt-10" />

        <div className="mt-8 grid grid-cols-1 gap-10 sm:mt-10 lg:grid-cols-2 lg:gap-16">
          <DetailBlock title="Предприниматель">
            <DetailRow
              label="Наименование"
              value="Индивидуальный предприниматель Щербакова Милана Павловна"
            />
            <DetailRow label="ИНН" value="540200328101" />
            <DetailRow label="ОГРНИП" value="326547600165368" />
            <DetailRow
              label="Юридический адрес"
              value="630040, Россия, Новосибирская область, г. Новосибирск"
            />
          </DetailBlock>

          <DetailBlock title="Банковские реквизиты">
            <DetailRow
              label="Расчётный счёт"
              value="40802810800010033396"
            />
            <DetailRow label="Банк" value="АО «ТБанк»" />
            <DetailRow label="ИНН банка" value="7710140679" />
            <DetailRow label="БИК" value="044525974" />
            <DetailRow
              label="Корреспондентский счёт"
              value="30101810145250000974"
            />
            <DetailRow
              label="Юридический адрес банка"
              value="127287, г. Москва, ул. Хуторская 2-я, д. 38А, стр. 26"
            />
          </DetailBlock>
        </div>
      </div>
    </main>
  )
}
