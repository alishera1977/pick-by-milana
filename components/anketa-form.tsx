'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

const olive = '#58683F'
const cream = '#F7F1E5'

const teacherOptions = [
  { value: 'masha-start', label: 'Маша' },
  { value: 'gleb', label: 'Глеб' },
  { value: 'fedya', label: 'Федя' },
  { value: 'masha-expert', label: 'Mary' },
  { value: 'help', label: 'Ещё не знаю, нужна помощь' },
] as const

type TeacherValue = (typeof teacherOptions)[number]['value']

const inputClass =
  'w-full border-0 border-b border-white/35 bg-transparent pb-2 font-sans text-[14px] text-white outline-none placeholder:text-white/55 focus:border-white/80 sm:text-[15px]'

function ConsentCheckboxes({
  offer,
  privacy,
  promo,
  onOfferChange,
  onPrivacyChange,
  onPromoChange,
}: {
  offer: boolean
  privacy: boolean
  promo: boolean
  onOfferChange: (value: boolean) => void
  onPrivacyChange: (value: boolean) => void
  onPromoChange: (value: boolean) => void
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <label className="flex items-start gap-3 font-sans text-[12px] leading-[1.4] text-white/75 sm:text-[13px]">
        <input
          type="checkbox"
          required
          checked={offer}
          onChange={(e) => onOfferChange(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-[var(--cream,#F7F1E5)]"
        />
        <span>
          Я даю согласие с условиями{' '}
          <Link
            href="/offer/"
            className="underline underline-offset-2 hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            Оферты
          </Link>
        </span>
      </label>

      <label className="flex items-start gap-3 font-sans text-[12px] leading-[1.4] text-white/75 sm:text-[13px]">
        <input
          type="checkbox"
          required
          checked={privacy}
          onChange={(e) => onPrivacyChange(e.target.checked)}
          className="mt-0.5 size-4 shrink-0"
        />
        <span>
          Я даю{' '}
          <span className="underline underline-offset-2">согласие</span> на
          обработку персональных данных в соответствии с{' '}
          <Link
            href="/privacy/"
            className="underline underline-offset-2 hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            Политикой в отношении обработки персональных данных
          </Link>
        </span>
      </label>

      <label className="flex items-start gap-3 font-sans text-[12px] leading-[1.4] text-white/75 sm:text-[13px]">
        <input
          type="checkbox"
          checked={promo}
          onChange={(e) => onPromoChange(e.target.checked)}
          className="mt-0.5 size-4 shrink-0"
        />
        <span>
          Я даю{' '}
          <span className="underline underline-offset-2">согласие</span> на
          получение рассылок и рекламных материалов
        </span>
      </label>
    </div>
  )
}

function SuccessState({ message }: { message: string }) {
  return (
    <div
      className="rounded-[20px] px-6 py-10 text-center sm:rounded-[28px] sm:px-10 sm:py-14"
      style={{ background: olive }}
    >
      <h1 className="font-[family-name:var(--font-prata)] text-[28px] uppercase leading-[1.1] text-white sm:text-[36px]">
        Заявка отправлена
      </h1>
      <p className="mx-auto mt-4 max-w-[36ch] font-sans text-[14px] leading-[1.45] text-white/75 sm:text-[15px]">
        {message}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center px-6 py-3 font-[family-name:var(--font-prata)] text-[13px] uppercase tracking-[0.06em] transition-opacity hover:opacity-90"
        style={{ background: cream, color: olive }}
      >
        На главную
      </Link>
    </div>
  )
}

export function AnketaForm({ variant = 'milana' }: { variant?: 'milana' | 'teacher' }) {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [telegram, setTelegram] = useState('')
  const [teacher, setTeacher] = useState<TeacherValue | ''>('')
  const [offer, setOffer] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [promo, setPromo] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const isTeacherForm = variant === 'teacher'

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!offer || !privacy || submitting) return

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/send-anketa.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variant,
          name: isTeacherForm ? name : undefined,
          phone: isTeacherForm ? phone : undefined,
          email: isTeacherForm ? email : undefined,
          teacher: isTeacherForm ? teacher : undefined,
          telegram,
          promo,
        }),
      })

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean
        error?: string
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Не удалось отправить заявку. Попробуйте ещё раз.')
      }

      setSent(true)
    } catch (err) {
      const message =
        err instanceof Error && err.message && err.message !== 'send_failed'
          ? err.message
          : 'Не удалось отправить заявку. Попробуйте ещё раз.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <SuccessState
        message={
          isTeacherForm
            ? 'Спасибо! Милана свяжется с тобой в ближайшее время, чтобы обсудить детали.'
            : 'Спасибо! Милана свяжется с тобой в Telegram в ближайшее время.'
        }
      />
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[20px] px-5 py-8 sm:rounded-[28px] sm:px-10 sm:py-12"
      style={{ background: olive, border: '1px solid rgba(247, 241, 229, 0.2)' }}
    >
      <h1 className="font-[family-name:var(--font-prata)] text-[28px] uppercase leading-[1.05] tracking-[-0.02em] text-white sm:text-[40px] sm:leading-[1]">
        {isTeacherForm ? 'Запишитесь на занятия' : 'Написать Милане'}
      </h1>
      <p className="mt-3 max-w-[42ch] font-sans text-[13px] leading-[1.45] text-white/70 sm:mt-4 sm:text-[15px]">
        {isTeacherForm
          ? 'Оставьте заявку, а я свяжусь с вами в ближайшее время, чтобы обсудить детали!'
          : 'Отправь свой ник в Telegram — Милана свяжется с тобой.'}
      </p>

      <div className={`flex flex-col gap-5 ${isTeacherForm ? 'mt-8 sm:mt-10' : 'mt-8 sm:mt-10'}`}>
        {isTeacherForm ? (
          <>
            <label className="block">
              <span className="sr-only">Ваше имя</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="sr-only">Телефон</span>
              <div className="flex items-center gap-2 border-b border-white/35 pb-2 focus-within:border-white/80">
                <span className="shrink-0 font-sans text-[14px] text-white/80 sm:text-[15px]">
                  🇷🇺 +7
                </span>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(000) 000-00-00"
                  className="min-w-0 flex-1 border-0 bg-transparent font-sans text-[14px] text-white outline-none placeholder:text-white/55 sm:text-[15px]"
                />
              </div>
            </label>

            <label className="block">
              <span className="sr-only">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className={inputClass}
              />
            </label>
          </>
        ) : null}

        <label className="block">
          <span className="sr-only">Ник в Telegram</span>
          <input
            required
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="Ник в Telegram, например @user1"
            className={inputClass}
          />
        </label>

        {isTeacherForm ? (
          <fieldset className="pt-1">
            <legend className="mb-3 font-sans text-[12px] uppercase tracking-[0.08em] text-white/65 sm:text-[13px]">
              Преподаватель
            </legend>
            <div className="flex flex-col gap-2.5">
              {teacherOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 font-sans text-[13px] text-white/85 sm:text-[14px]"
                >
                  <input
                    type="radio"
                    name="teacher"
                    required
                    value={option.value}
                    checked={teacher === option.value}
                    onChange={() => setTeacher(option.value)}
                    className="size-4 shrink-0 accent-[var(--cream,#F7F1E5)]"
                  />
                  <span>
                    {option.label}
                    {option.value === 'masha-start' ? (
                      <span className="ml-1 text-white/55">· START</span>
                    ) : null}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}
      </div>

      <div className="mt-8 sm:mt-10">
        <ConsentCheckboxes
          offer={offer}
          privacy={privacy}
          promo={promo}
          onOfferChange={setOffer}
          onPrivacyChange={setPrivacy}
          onPromoChange={setPromo}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 w-full px-6 py-3.5 font-[family-name:var(--font-prata)] text-[14px] uppercase tracking-[0.08em] transition-opacity hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-70 sm:mt-10 sm:py-4 sm:text-[15px]"
        style={{ background: cream, color: olive }}
      >
        {submitting ? 'Отправляем…' : 'Оставить заявку'}
      </button>

      {error ? (
        <p className="mt-3 text-center font-sans text-[12px] text-white/80 sm:text-[13px]">
          {error}
        </p>
      ) : null}
    </form>
  )
}
