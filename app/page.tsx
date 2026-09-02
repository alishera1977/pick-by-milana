import Image from 'next/image'
import { GoalSection } from '@/components/goal-section'
import { TeamSection } from '@/components/team-section'
import { ChooseTeacherSection } from '@/components/choose-teacher-section'
import { FounderSection } from '@/components/founder-section'
import { ReviewsSection } from '@/components/reviews-section'

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-background">
      {/* Hero — full-bleed image, constrained content */}
      <section className="relative min-h-[100svh] w-full overflow-hidden bg-background lg:min-h-[92svh]">
        <Image
          src="/figma/hero.jpg"
          alt="Милана — преподаватель английского языка"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center]"
        />

        <div className="absolute inset-0 bg-black/[0.37]" aria-hidden="true" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(90deg, #000000b8 0%, #00000059 40%, #00000014 65%, #00000000 80%)',
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col justify-between overflow-x-hidden px-5 pt-8 pb-24 sm:px-10 sm:py-10 lg:min-h-[92svh] lg:overflow-visible lg:px-10 lg:pt-11 lg:pb-20">
          <header className="relative w-full max-w-[520px]">
            <img
              src="/figma/pick-logo.svg"
              alt="pick by Milana"
              className="relative z-10 ml-14 h-32 w-auto sm:ml-14 sm:h-40 lg:ml-20 lg:h-48 lg:object-contain"
            />
            {/* LOCKED: tagline position approved — do not move (see .cursor/rules/hero-tagline-lock.mdc) */}
            <p
              className="pointer-events-none absolute z-[1] whitespace-nowrap font-serif font-medium tracking-wide text-cream
                left-4 top-[6.35rem] text-[15px]
                sm:left-6 sm:top-[7.65rem] sm:text-[15px]
                lg:left-14 lg:top-[8.9rem] lg:text-lg"
            >
              <span>современный</span>
              <span
                className="inline-block w-[1.2rem] sm:w-[1.45rem] lg:w-[1.7rem]"
                aria-hidden="true"
              />
              <span>сервис преподавателей английского языка</span>
            </p>
          </header>

          <div className="flex flex-col gap-[30px] sm:gap-5 lg:gap-9 lg:pl-16">
            <p className="max-w-[520px] whitespace-pre-line font-sans text-[13px] font-medium uppercase leading-[1.55] tracking-[0.33px] text-cream sm:hidden">
              {
                'Подберем преподавателя\nпод твой уровень, цель,\nхарактер и бюджет.\nОт молодых преподавателей\nдо экспертов с\nмеждународным опытом.'
              }
            </p>
            <p className="hidden max-w-[520px] whitespace-pre-line font-sans font-medium uppercase leading-[1.55] tracking-[0.33px] text-cream sm:block sm:text-lg lg:max-w-[540px] lg:text-[20px] lg:leading-[1.55]">
              {
                'Подберем преподавателя\nпод твой уровень, цель,\nхарактер и бюджет.\nОт молодых преподавателей\nдо экспертов с международным\nопытом.'
              }
            </p>

            <div className="mx-auto flex w-[86%] flex-col gap-3 sm:mx-0 sm:w-auto sm:flex-row sm:items-center sm:gap-2.5">
              <a
                href="/anketa"
                className="w-full rounded-full border border-cream px-4 py-1 text-center font-display text-xs text-cream transition-colors hover:bg-cream/10 sm:w-auto sm:py-1.5"
              >
                Занятие с Миланой
              </a>
              <a
                href="#team"
                className="w-full rounded-full bg-cream px-4 py-1 text-center font-display text-xs text-background transition-opacity hover:opacity-90 sm:w-auto sm:py-1.5"
              >
                Подобрать преподавателя
              </a>
            </div>
          </div>
        </div>
      </section>

      <GoalSection />
      <TeamSection />
      <ChooseTeacherSection />
      <FounderSection />
      <ReviewsSection />
    </main>
  )
}
