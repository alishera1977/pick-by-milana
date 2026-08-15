type GoalCard = {
  title: string
  text: string
  className?: string
}

function ContentCard({ title, text, className = '' }: GoalCard) {
  return (
    <button
      type="button"
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] border p-3 text-left transition-colors duration-200 hover:bg-[#463420] sm:rounded-[20px] sm:p-[18px] ${className}`}
      style={{
        background: '#3A281A',
        borderColor: 'rgba(255,248,185,0.28)',
      }}
    >
      <span
        className="block rounded-full"
        style={{ width: 6, height: 6, background: '#FFF8B9' }}
        aria-hidden="true"
      />
      <h3
        className="mt-2 font-serif text-balance text-[21px] leading-none font-medium sm:mt-3 sm:text-[28px] sm:leading-[0.98]"
        style={{ color: '#FFF8B9' }}
      >
        {title}
      </h3>
      <p
        className="mt-1.5 font-sans text-[12px] leading-[1.2] sm:mt-2 sm:text-base sm:leading-[1.25]"
        style={{ color: 'rgba(255,248,185,0.6)' }}
      >
        {text}
      </p>
      <span
        className="mt-auto inline-flex items-center font-serif text-[14px] italic uppercase transition-transform duration-200 group-hover:translate-x-1 sm:pt-3 sm:text-xl"
        style={{ color: '#FFF8B9' }}
      >
        Подробнее
      </span>
    </button>
  )
}

function PhotoCard({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`h-full min-w-0 overflow-hidden rounded-[16px] sm:rounded-[20px] ${className}`}>
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        className="block h-full w-full object-cover object-center"
      />
    </div>
  )
}

export function GoalSection() {
  return (
    <section
      id="goal"
      className="w-full px-2.5 py-3 text-cream sm:p-12 lg:py-24"
      style={{
        background:
          'linear-gradient(180deg, #241811 0%, #2a1f13 40%, #241811 100%)',
      }}
    >
      <div className="mx-auto w-full max-w-[820px]">
        {/* Heading */}
        <h2 className="font-[family-name:var(--font-brand)] text-[30px] font-normal normal-case leading-[1.15] text-balance sm:text-[52px] sm:leading-[1.1] lg:text-[60px]">
          Найдём преподавателя
          <br />
          под твою цель
        </h2>
        <p className="mt-3 font-sans text-[13px] leading-[1.25] text-cream/60 sm:mt-6 sm:text-lg sm:leading-normal">
          Не подгоняем тебя под программу — подбираем человека под твой запрос.
        </p>

        {/* Editorial rows — 66/34 mobile, 68/32 desktop, alternating card/photo, 8px gap */}
        <div className="mt-4 flex flex-col gap-1.5 sm:mt-12 sm:gap-2">
          {/* Row 1 — card left, photo right */}
          <div className="flex h-[175px] gap-1.5 sm:h-[300px] sm:gap-2">
            <ContentCard
              className="basis-[66%] sm:basis-[68%]"
              title="Я начинаю с нуля"
              text="Хочу наконец разобраться в базе и постепенно начать говорить."
            />
            <PhotoCard
              className="basis-[34%] sm:basis-[32%]"
              src="/figma/photo-scratch.jpg"
              alt="Двое молодых людей вместе смотрят в ноутбук"
            />
          </div>

          {/* Row 2 — photo left, card right */}
          <div className="flex h-[175px] gap-1.5 sm:h-[300px] sm:gap-2">
            <PhotoCard
              className="basis-[34%] sm:basis-[32%]"
              src="/figma/photo-barrier.jpg"
              alt="Девушка на набережной канала в солнечный день"
            />
            <ContentCard
              className="basis-[66%] sm:basis-[68%]"
              title="Я всё понимаю, но не могу сказать"
              text="Уберём языковой барьер и сделаем английский частью обычной жизни."
            />
          </div>

          {/* Row 3 — card left, photo right */}
          <div className="flex h-[175px] gap-1.5 sm:h-[300px] sm:gap-2">
            <ContentCard
              className="basis-[66%] sm:basis-[68%]"
              title="Мне нужен английский для путешествий"
              text="Аэропорт, отели, новые знакомства — без страха заговорить."
            />
            <PhotoCard
              className="basis-[34%] sm:basis-[32%]"
              src="/figma/london-photo.jpg"
              alt="Студентка на фоне Биг-Бена в Лондоне"
            />
          </div>

          {/* Row 4 — photo left, card right */}
          <div className="flex h-[175px] gap-1.5 sm:h-[300px] sm:gap-2">
            <PhotoCard
              className="basis-[34%] sm:basis-[32%]"
              src="/figma/photo-levelup.png"
              alt="Молодой человек гуляет по европейскому городу"
            />
            <ContentCard
              className="basis-[66%] sm:basis-[68%]"
              title="Хочу поднять свой уровень"
              text="База уже есть — теперь хочется двигаться дальше и звучать увереннее."
            />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-1.5 flex flex-col items-start justify-between gap-1.5 rounded-lg border border-dashed border-cream/25 px-2.5 py-2 sm:mt-3 sm:gap-4 sm:rounded-[20px] sm:border-solid sm:px-8 sm:py-5 sm:flex-row sm:items-center">
          <p className="font-sans text-[10px] leading-[1.25] text-cream/80 sm:text-base sm:leading-normal">
            Не нашла свой запрос? Напиши Милане — подберём преподавателя лично.
          </p>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cream px-2.5 py-1 font-condensed text-[8px] font-bold uppercase tracking-[0.06em] text-[#241811] transition-all duration-200 hover:-translate-y-0.5 sm:gap-2 sm:px-6 sm:py-3 sm:text-sm sm:tracking-[0.1em]"
          >
            Написать Милане <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
