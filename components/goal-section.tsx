type GoalCard = {
  title: string
  text: string
  className?: string
}

function ContentCard({ title, text, className = '' }: GoalCard) {
  return (
    <button
      type="button"
      className={`group flex h-full flex-col overflow-hidden rounded-[20px] border p-[18px] text-left transition-colors duration-200 hover:bg-[#463420] ${className}`}
      style={{
        background: '#3A281A',
        borderColor: 'rgba(255,248,185,0.28)',
      }}
    >
      <span
        className="block rounded-full"
        style={{ width: 8, height: 8, background: '#FFF8B9' }}
        aria-hidden="true"
      />
      <h3
        className="mt-3 font-serif text-balance"
        style={{ fontSize: 32, lineHeight: 0.95, fontWeight: 500, color: '#FFF8B9' }}
      >
        {title}
      </h3>
      <p
        className="mt-2 font-sans"
        style={{ fontSize: 17, lineHeight: 1.2, color: 'rgba(255,248,185,0.6)' }}
      >
        {text}
      </p>
      <span
        className="mt-auto pt-3 inline-flex items-center font-serif italic uppercase transition-transform duration-200 group-hover:translate-x-1"
        style={{ fontSize: 20, color: '#FFF8B9' }}
      >
        Подробнее
      </span>
    </button>
  )
}

function PhotoCard({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`h-full w-full overflow-hidden rounded-[20px] ${className}`}>
      <img src={src || '/placeholder.svg'} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}

export function GoalSection() {
  return (
    <section
      id="goal"
      className="w-full p-3 text-cream sm:p-12 lg:py-24"
      style={{
        background:
          'linear-gradient(180deg, #241811 0%, #2a1f13 40%, #241811 100%)',
      }}
    >
      <div className="mx-auto w-full max-w-[820px]">
        {/* Heading */}
        <h2 className="font-condensed text-4xl font-bold uppercase leading-[0.95] text-balance sm:text-6xl lg:text-[68px]">
          Найдём преподавателя
          <br />
          под твою цель
        </h2>
        <p className="mt-4 font-sans text-base text-cream/60 sm:mt-6 sm:text-lg">
          Не подгоняем тебя под программу — подбираем человека под твой запрос.
        </p>

        {/* Editorial rows — 68/32 proportion, alternating card/photo, 8px gap */}
        <div className="mt-8 flex flex-col gap-2 sm:mt-12">
          {/* Row 1 — card 68% left, photo 32% right */}
          <div className="flex min-h-[230px] gap-2 sm:min-h-[320px]">
            <ContentCard
              className="basis-[68%]"
              title="Я начинаю с нуля"
              text="Хочу наконец разобраться в базе и постепенно начать говорить."
            />
            <PhotoCard
              className="basis-[32%]"
              src="/figma/photo-scratch.jpg"
              alt="Двое молодых людей вместе смотрят в ноутбук"
            />
          </div>

          {/* Row 2 — photo 32% left, card 68% right */}
          <div className="flex min-h-[230px] gap-2 sm:min-h-[320px]">
            <PhotoCard
              className="basis-[32%]"
              src="/figma/photo-barrier.jpg"
              alt="Девушка на набережной канала в солнечный день"
            />
            <ContentCard
              className="basis-[68%]"
              title="Я всё понимаю, но не могу сказать"
              text="Уберём языковой барьер и сделаем английский частью обычной жизни."
            />
          </div>

          {/* Row 3 — card 68% left, photo 32% right */}
          <div className="flex min-h-[230px] gap-2 sm:min-h-[320px]">
            <ContentCard
              className="basis-[68%]"
              title="Мне нужен английский для путешествий"
              text="Аэропорт, отели, новые знакомства — без страха заговорить."
            />
            <PhotoCard
              className="basis-[32%]"
              src="/figma/london-photo.jpg"
              alt="Студентка на фоне Биг-Бена в Лондоне"
            />
          </div>

          {/* Row 4 — photo 32% left, card 68% right */}
          <div className="flex min-h-[230px] gap-2 sm:min-h-[320px]">
            <PhotoCard
              className="basis-[32%]"
              src="/figma/photo-levelup.png"
              alt="Молодой человек гуляет по европейскому городу"
            />
            <ContentCard
              className="basis-[68%]"
              title="Хочу поднять свой уровень"
              text="База уже есть — теперь хочется двигаться дальше и звучать увереннее."
            />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-2 flex flex-col items-start justify-between gap-4 rounded-[20px] border border-dashed border-cream/25 px-5 py-5 sm:mt-3 sm:flex-row sm:items-center sm:px-8">
          <p className="font-sans text-base text-cream/80">
            Не нашла свой запрос? Напиши Милане — подберём преподавателя лично.
          </p>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cream px-6 py-3 font-condensed text-sm font-bold uppercase tracking-[0.1em] text-[#241811] transition-all duration-200 hover:-translate-y-0.5"
          >
            Написать Милане <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
