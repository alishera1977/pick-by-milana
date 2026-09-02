import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — pick by Milana',
  description: 'Политика в отношении обработки персональных данных сервиса PICK by Milana.',
}

const olive = '#58683F'

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-black/10 pt-6 first:border-t-0 first:pt-0 sm:pt-7">
      <h2
        className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] sm:text-[12px]"
        style={{ color: olive }}
      >
        {title}
      </h2>
      <div className="mt-3 flex flex-col gap-3 font-sans text-[13px] leading-[1.55] text-black/80 sm:text-[14px] sm:leading-[1.6]">
        {children}
      </div>
    </section>
  )
}

export default function PrivacyPage() {
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
          Политика конфиденциальности
        </h1>

        <p className="mt-4 font-sans text-[13px] leading-[1.5] text-black/55 sm:text-[14px]">
          Политика в отношении обработки персональных данных сервиса PICK by
          Milana
        </p>

        <div className="mt-8 h-px w-full bg-black/10 sm:mt-10" />

        <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:gap-7">
          <Section title="1. Общие положения">
            <p>
              Настоящая Политика определяет порядок обработки и защиты
              персональных данных пользователей сайта PICK by Milana (далее —
              «Сайт»), а также условия их использования оператором.
            </p>
            <p>
              Оператор персональных данных: индивидуальный предприниматель
              Щербакова Милана Павловна, ИНН 540200328101, ОГРНИП
              326547600165368 (далее — «Оператор»).
            </p>
            <p>
              Используя Сайт и отправляя заявку через формы обратной связи,
              пользователь подтверждает, что ознакомился с настоящей Политикой.
            </p>
          </Section>

          <Section title="2. Какие данные мы обрабатываем">
            <p>Оператор может обрабатывать следующие персональные данные:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>имя;</li>
              <li>номер телефона;</li>
              <li>адрес электронной почты;</li>
              <li>ник или идентификатор в Telegram;</li>
              <li>иные сведения, которые пользователь добровольно указывает в заявке.</li>
            </ul>
          </Section>

          <Section title="3. Цели обработки">
            <p>Персональные данные обрабатываются в целях:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>обработки заявок и обратной связи с пользователем;</li>
              <li>подбора преподавателя и организации занятий;</li>
              <li>направления информационных и рекламных материалов — только при наличии отдельного согласия пользователя;</li>
              <li>исполнения требований законодательства Российской Федерации.</li>
            </ul>
          </Section>

          <Section title="4. Правовые основания">
            <p>
              Обработка персональных данных осуществляется на основании согласия
              субъекта персональных данных, а также в случаях, когда обработка
              необходима для заключения и исполнения договора, стороной которого
              является пользователь.
            </p>
          </Section>

          <Section title="5. Передача и хранение данных">
            <p>
              Оператор не передаёт персональные данные третьим лицам, за
              исключением случаев, предусмотренных законом, либо когда передача
              необходима для исполнения заявки пользователя и работы сервиса.
            </p>
            <p>
              Данные хранятся не дольше, чем это необходимо для достижения целей
              обработки, если иной срок не установлен законодательством.
            </p>
          </Section>

          <Section title="6. Права пользователя">
            <p>Пользователь вправе:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>получать сведения об обработке своих персональных данных;</li>
              <li>требовать уточнения, блокирования или уничтожения данных;</li>
              <li>отозвать согласие на обработку персональных данных;</li>
              <li>обжаловать действия Оператора в уполномоченный орган или в суд.</li>
            </ul>
            <p>
              Для реализации прав пользователь может обратиться к Оператору через
              контактные данные, указанные на Сайте.
            </p>
          </Section>

          <Section title="7. Меры защиты">
            <p>
              Оператор принимает необходимые организационные и технические меры
              для защиты персональных данных от неправомерного доступа,
              уничтожения, изменения, блокирования, копирования и распространения.
            </p>
          </Section>

          <Section title="8. Изменение политики">
            <p>
              Оператор вправе обновлять настоящую Политику. Актуальная версия
              всегда доступна на данной странице Сайта.
            </p>
            <p>Дата публикации: 3 сентября 2026 г.</p>
          </Section>
        </div>
      </div>
    </main>
  )
}
