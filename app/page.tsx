import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background image */}
      <Image
        src="/figma/hero.jpg"
        alt="Милана — преподаватель английского языка"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      {/* Left gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-between px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        {/* Top: brand + subtitle */}
        <header className="flex flex-col">
          <div className="flex items-end justify-center gap-2 sm:justify-start">
            <h1 className="font-script text-7xl leading-none text-cream sm:text-8xl lg:text-[10rem]">
              pick
            </h1>
            <span className="mb-3 font-serif text-2xl font-medium text-cream sm:mb-4 sm:text-3xl lg:mb-6 lg:text-4xl">
              by Milana
            </span>
          </div>

          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 text-balance font-serif text-lg font-bold uppercase tracking-wide text-cream drop-shadow-md sm:justify-start sm:text-2xl lg:text-[2rem]">
            <span>современный</span>
            <span aria-hidden="true" className="text-cream/70">
              /
            </span>
            <span>сервис преподавателей английского языка</span>
          </p>
        </header>

        {/* Middle: main copy */}
        <p className="max-w-lg text-pretty font-sans text-sm font-medium uppercase leading-relaxed tracking-wide text-cream sm:text-base lg:text-lg">
          Подберём преподавателя под твой уровень, цель, характер и бюджет. От
          молодых преподавателей до экспертов с международным опытом.
        </p>

        {/* Bottom: CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            className="rounded-full border-[1.5px] border-cream px-8 py-4 font-display text-lg text-cream transition-colors hover:bg-cream/10 lg:text-xl"
          >
            Занятие с Миланой
          </button>
          <button
            type="button"
            className="rounded-full bg-cream px-10 py-4 font-display text-lg text-background transition-opacity hover:opacity-90 lg:text-xl"
          >
            Подобрать преподавателя
          </button>
        </div>
      </div>
    </main>
  )
}
