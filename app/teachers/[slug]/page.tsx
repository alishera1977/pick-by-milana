import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getAllTeacherSlugs,
  getTeacherBySlug,
} from '@/lib/teachers'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllTeacherSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const teacher = getTeacherBySlug(slug)
  if (!teacher) {
    return { title: 'Преподаватель не найден' }
  }
  return {
    title: `${teacher.name} — pick by Milana`,
    description: teacher.tagline,
  }
}

function splitRecommendationLead(text: string) {
  const match = text.match(/^(.+? я бы выбрала,?)([\s\S]*)$/)
  if (!match) {
    return { lead: '', rest: text }
  }
  return { lead: match[1], rest: match[2].trimStart() }
}

function DesktopMilanaRecommendation({ text }: { text: string }) {
  const { lead, rest } = splitRecommendationLead(text)

  return (
    <div className="-mt-3 ml-8 flex w-[85%] max-w-[380px] items-center justify-end gap-8 overflow-visible xl:ml-10 xl:max-w-[420px]">
      <img
        src="/figma/milana-point.png"
        alt=""
        className="h-auto w-[250px] max-w-[250px] shrink-0 translate-x-16 translate-y-4 select-none"
      />
      <div className="w-[315px] shrink-0 overflow-visible">
        <p className="w-full overflow-visible break-words font-sans text-[12px] leading-[1.42] text-black/75 xl:text-[12.5px]">
          {lead ? (
            <>
              <span className="font-[family-name:var(--font-prata)] text-[14px] italic leading-[1.35] text-black/88 xl:text-[15px]">
                {lead}
              </span>{' '}
              <span className="leading-[1.42]">{rest}</span>
            </>
          ) : (
            text
          )}
        </p>
      </div>
    </div>
  )
}

export default async function TeacherPage({ params }: PageProps) {
  const { slug } = await params
  const teacher = getTeacherBySlug(slug)
  if (!teacher) notFound()

  return (
    <main
      className="min-h-svh w-full overflow-x-hidden px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5"
      style={{ background: '#E8E0D4' }}
    >
      <div
        className="relative mx-auto w-full max-w-[1100px] overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[44px]"
        style={{ background: '#F7F1E5' }}
      >
        {/* Header */}
        <header className="relative flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-6 lg:px-10 lg:pt-7">
          <Link
            href="/#team"
            className="font-sans text-[12px] text-black/40 transition-colors hover:text-black lg:invisible"
          >
            ← Назад
          </Link>

          <Link
            href="/anketa?type=teacher"
            className="rounded-full border border-black/30 px-3.5 py-1.5 font-sans text-[11px] text-black transition-colors hover:border-black/55 sm:px-4 sm:text-[12px] lg:text-[13px]"
          >
            Подобрать преподавателя
          </Link>
        </header>

        {/* Desktop — editorial layout */}
        <div className="relative hidden px-10 pb-8 pt-8 lg:block">
          <div className="grid grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] items-start gap-5 xl:gap-6">
            <div className="min-w-0 max-w-[580px]">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex rounded-[7px] bg-[#FFF3A6] px-2.5 py-[5px] font-sans text-[11px] font-semibold uppercase tracking-[0.02em] text-black">
                  {teacher.tag}
                </span>
                {teacher.price ? (
                  <span className="font-sans text-[13px] font-medium text-black">
                    {teacher.price}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-2.5 font-[family-name:var(--font-prata)] text-[72px] leading-[0.9] text-black xl:text-[79px]">
                {teacher.name}
              </h1>

              <p className="mt-2.5 max-w-[380px] font-sans text-[20px] font-medium leading-[1.2] text-black xl:text-[22px]">
                {teacher.tagline}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {teacher.pills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-black/20 px-3.5 py-[5px] font-sans text-[13px] text-black"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <ul className="mt-7 flex flex-col gap-[15px]">
                {teacher.bio.map((paragraph) => (
                  <li key={paragraph}>
                    <p className="font-sans text-[13px] leading-[1.45] text-black/75 xl:text-[13.5px]">
                      {paragraph}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 pt-1">
              <div className="ml-8 mr-auto w-[85%] max-w-[380px] overflow-hidden rounded-[30px] xl:ml-10 xl:max-w-[420px] xl:rounded-[34px]">
                <img
                  src={teacher.detailPhoto}
                  alt={teacher.name}
                  className="block aspect-[4/5] h-auto w-full object-cover object-[center_15%]"
                />
              </div>

              <DesktopMilanaRecommendation text={teacher.recommendation} />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="px-5 pb-8 pt-6 sm:px-8 lg:hidden">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex rounded-[7px] bg-[#FFF3A6] px-2.5 py-[5px] font-sans text-[11px] font-semibold uppercase tracking-[0.02em] text-black">
              {teacher.tag}
            </span>
            {teacher.price ? (
              <span className="font-sans text-[13px] font-medium text-black">
                {teacher.price}
              </span>
            ) : null}
          </div>

          <h1 className="mt-3 font-[family-name:var(--font-prata)] text-[48px] leading-[0.92] text-black sm:text-[58px]">
            {teacher.name}
          </h1>

          <p className="mt-3 max-w-[22ch] font-sans text-[17px] font-medium leading-[1.2] text-black sm:text-[19px]">
            {teacher.tagline}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {teacher.pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-black/20 px-3 py-1 font-sans text-[12px] text-black"
              >
                {pill}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-6 w-[72%] max-w-[300px] overflow-hidden rounded-[22px] sm:max-w-[320px]">
            <img
              src={teacher.detailPhoto}
              alt={teacher.name}
              className="block aspect-[4/5] w-full object-cover object-[center_15%]"
            />
          </div>

          <ul className="mt-6 flex flex-col gap-4">
            {teacher.bio.map((paragraph) => (
              <li key={paragraph}>
                <p className="font-sans text-[13px] leading-[1.45] text-black/68">
                  {paragraph}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-end gap-3">
            <img
              src="/figma/milana-point.png"
              alt=""
              className="-translate-y-8 w-[50%] max-w-[210px] shrink-0 select-none"
            />
            <p className="mb-2 min-w-0 font-sans text-[12px] leading-[1.4] text-black/68">
              {teacher.recommendation}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
