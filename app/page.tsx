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
        {/* Top: large left-positioned logo with subtitle crossing beneath it */}
        <header className="relative flex flex-col items-start text-left">
          <img
            src="/figma/pick-logo.svg"
            alt="pick by Milana"
            className="ml-4 h-40 w-auto sm:ml-8 lg:ml-12 lg:h-64"
          />
          <p className="-ml-6 -mt-6 whitespace-nowrap font-serif text-lg font-medium tracking-wide text-cream sm:-ml-10 sm:-mt-8 sm:text-xl lg:-ml-14 lg:-mt-12 lg:text-xl">
            {'                современный     сервис преподавателей английского языка'}
          </p>
        </header>

        {/* Bottom: main copy on the left + buttons below */}
        <div className="flex flex-col gap-8">
          <p className="max-w-[520px] whitespace-pre-line font-sans text-base font-medium uppercase leading-[1.65] tracking-[0.33px] text-cream sm:text-lg lg:text-[22px] lg:leading-[36px]">
            {
              '    Подберем преподавателя\n    под твой уровень, цель,\n    характер и бюджет.\n    От молодых преподавателей\n    до экспертов с международным\nопытом.'
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
