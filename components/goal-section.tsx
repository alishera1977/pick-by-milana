type GoalCard = {
  number: string
  title: string
  text: string
}

function ContentCard({ number, title, text }: GoalCard) {
  return (
    <button
      type="button"
      className="group flex h-full min-h-[300px] flex-col overflow-hidden rounded-[26px] bg-[#3a2c1a] p-7 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#463623] sm:min-h-0 sm:p-8"
    >
      <span className="font-condensed text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
        {number}
      </span>
      <h3 className="mt-4 font-sans text-2xl font-semibold leading-[1.15] text-balance sm:text-[28px]">
        {title}
      </h3>
      <p className="mt-3 max-w-[42ch] font-sans text-[15px] leading-[1.5] text-cream/60">
        {text}
      </p>
      <span className="mt-auto pt-6 inline-flex items-center gap-2 font-condensed text-sm font-bold uppercase tracking-[0.15em] text-cream transition-transform duration-200 group-hover:translate-x-1">
        Подобрать <span aria-hidden="true">&rarr;</span>
      </span>
    </button>
  )
}

function PhotoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-full min-h-[300px] overflow-hidden rounded-[26px] bg-[#3a2c1a] sm:min-h-0">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}

export function GoalSection() {
  return (
    <section
      id="goal"
      className="w-full px-6 py-16 text-cream sm:px-12 lg:px-[6vw] lg:py-24"
      style={{
        background:
          'linear-gradient(180deg, #241811 0%, #2a1f13 40%, #241811 100%)',
      }}
    >
      <div className="mx-auto w-full max-w-[1120px]">
        {/* Heading */}
        <h2 className="font-condensed text-4xl font-bold uppercase leading-[0.95] text-balance sm:text-6xl lg:text-[68px]">
          Найдём преподавателя
          <br />
          под твою цель
        </h2>
        <p className="mt-6 font-sans text-base text-cream/60 sm:text-lg">
          Не подгоняем тебя под программу — подбираем человека под твой запрос.
        </p>

        {/* Alternating card + photo rows */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:auto-rows-[360px]">
          {/* Row 1 — text left, photo right */}
          <ContentCard
            number="01"
            title="Я начинаю с нуля"
            text="Хочу наконец разобраться в базе и постепенно начать говорить."
          />
          <PhotoCard
            src="/figma/photo-speaking.png"
            alt="Девушка уверенно общается с другом в кафе"
          />

          {/* Row 2 — photo left, text right */}
          <PhotoCard
            src="/figma/lesson-photo.png"
            alt="Двое студентов занимаются английским за ноутбуком"
          />
          <ContentCard
            number="02"
            title="Я всё понимаю, но не могу сказать"
            text="Уберём языковой барьер и сделаем английский частью обычной жизни."
          />

          {/* Row 3 — text left, photo right */}
          <ContentCard
            number="03"
            title="Мне нужен английский для путешествий"
            text="Аэропорт, отели, новые знакомства — без страха заговорить."
          />
          <PhotoCard
            src="/figma/london-photo.jpg"
            alt="Студентка на фоне Биг-Бена в Лондоне"
          />

          {/* Row 4 — photo left, text right */}
          <PhotoCard
            src="/figma/photo-levelup.png"
            alt="Молодой человек гуляет по европейскому городу"
          />
          <ContentCard
            number="04"
            title="Хочу поднять свой уровень"
            text="База уже есть — теперь хочется двигаться дальше и звучать увереннее."
          />
        </div>

        {/* Footer CTA */}
        <div className="mt-5 flex flex-col items-start justify-between gap-5 rounded-[26px] border border-dashed border-cream/25 px-7 py-6 sm:flex-row sm:items-center sm:px-8">
          <p className="font-sans text-base text-cream/80">
            Не нашла свой запрос? Напиши Милане — подберём преподавателя лично.
          </p>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cream px-6 py-3 font-condensed text-sm font-bold uppercase tracking-[0.1em] text-[#241811] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
          >
            Написать Милане <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
