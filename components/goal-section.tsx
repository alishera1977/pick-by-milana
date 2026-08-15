type GoalCard = {
  title: string
  text: string
}

function ContentCard({ title, text }: GoalCard) {
  return (
    <button
      type="button"
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border p-[18px] text-left transition-colors duration-200 hover:bg-[#463420]"
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

function PhotoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[20px]">
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

        {/* Dense 2-column editorial grid, ~230px rows, alternating card/photo */}
        <div className="mt-8 grid grid-cols-2 gap-2 auto-rows-[minmax(230px,auto)] sm:mt-12 sm:gap-3 sm:auto-rows-[minmax(320px,auto)]">
          {/* Row 1 — card left, photo right */}
          <ContentCard
            title="Я начинаю с нуля"
            text="Хочу наконец разобраться в базе и постепенно начать говорить."
          />
          <PhotoCard
            src="/figma/photo-scratch.jpg"
            alt="Двое молодых людей вместе смотрят в ноутбук"
          />

          {/* Row 2 — photo left, card right */}
          <PhotoCard
            src="/figma/photo-barrier.jpg"
            alt="Девушка на набережной канала в солнечный день"
          />
          <ContentCard
            title="Я всё понимаю, но не могу сказать"
            text="Уберём языковой барьер и сделаем английский частью обычной жизни."
          />

          {/* Row 3 — card left, photo right */}
          <ContentCard
            title="Мне нужен английский для путешествий"
            text="Аэропорт, отели, новые знакомства — без страха заговорить."
          />
          <PhotoCard
            src="/figma/london-photo.jpg"
            alt="Студентка на фоне Биг-Бена в Лондоне"
          />

          {/* Row 4 — photo left, card right */}
          <PhotoCard
            src="/figma/photo-levelup.png"
            alt="Молодой человек гуляет по европейскому городу"
          />
          <ContentCard
            title="Хочу поднять свой уровень"
            text="База уже есть — теперь хочется двигаться дальше и звучать увереннее."
          />
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
