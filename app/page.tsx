import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background image — person stays on the right */}
      <Image
        src="/figma/hero.jpg"
        alt="Милана — преподаватель английского языка"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[75%_center]"
      />

      {/* Dark overlay — 37% */}
      <div className="absolute inset-0 bg-black/[0.37]" aria-hidden="true" />
      {/* Left gradient overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, #000000b8 0%, #00000059 40%, #00000014 65%, #00000000 80%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-between px-6 py-10 sm:px-12 lg:px-16 lg:py-14">
        {/* Top: logo + subtitle, centered */}
        <header className="relative flex flex-col items-center text-center">
          <img
            src="/figma/pick-logo.svg"
            alt="pick by Milana"
            className="h-32 w-auto rounded-2xl sm:h-36 lg:h-44"
          />
          <p className="absolute inset-x-0 bottom-3 z-10 px-4 font-serif text-sm font-medium uppercase tracking-wide text-cream sm:text-base lg:text-2xl">
            современный сервис преподавателей английского языка
          </p>
        </header>

        {/* Bottom: main copy on the left + buttons below */}
        <div className="flex flex-col gap-8">
          <p className="max-w-[408px] whitespace-pre-line font-sans text-base font-medium uppercase leading-[1.65] tracking-[0.33px] text-cream sm:text-lg lg:text-[22px] lg:leading-[36px]">
            {
              'Подберем преподавателя\nпод твой уровень, цель,\nхарактер и бюджет.\nОт молодых преподавателей\nдо экспертов с международным\nопытом.'
            }
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="rounded-full border border-cream px-6 py-3 font-display text-sm text-cream transition-colors hover:bg-cream/10"
            >
              Занятие с Миланой
            </button>
            <button
              type="button"
              className="rounded-full bg-cream px-7 py-3 font-display text-sm text-background transition-opacity hover:opacity-90"
            >
              Подобрать преподавателя
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
