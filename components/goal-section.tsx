import Image from 'next/image'

const goals = [
  {
    tag: 'Я начинаю с нуля',
    title: 'С нуля',
    text: 'Хочу наконец разобраться в базе и постепенно начать говорить.',
  },
  {
    tag: 'Мне нужен английский для путешествий',
    title: 'Для путешествий',
    text: 'Аэропорт, отель, рестораны, новые знакомства и обычные жизненные ситуации.',
  },
  {
    tag: 'Мне английский просто для себя',
    title: 'Для себя',
    text: 'Смотреть фильмы, понимать контент, общаться и учить язык без конкретного дедлайна.',
  },
  {
    tag: 'Нужно поднять уровень',
    title: 'Поднять уровень',
    text: 'Хочу наконец двигаться дальше.',
  },
]

export function GoalSection() {
  return (
    <section
      id="goal"
      className="w-full scroll-mt-0 px-6 py-16 text-cream sm:px-12 lg:px-[8vw] lg:py-24"
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0 2px, transparent 2px 140px), linear-gradient(160deg, #3a2717 0%, #241811 55%, #170f0a 100%)',
      }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Top: heading + tucked-in photo */}
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="font-condensed text-[13px] font-medium uppercase tracking-[0.28em] text-cream/70">
              Начнём с твоей цели
            </div>
            <h2 className="mt-1.5 max-w-[14ch] font-serif text-4xl font-semibold italic leading-[1.12] text-balance sm:text-5xl lg:text-[56px]">
              Какой английский тебе нужен?
            </h2>
          </div>

          <div className="w-full shrink-0 md:w-[200px]">
            <Image
              src="/figma/lesson-photo.png"
              alt="Ученики занимаются английским вместе за ноутбуком"
              width={200}
              height={260}
              className="h-auto w-[200px] rounded-2xl object-cover shadow-[0_24px_48px_rgba(0,0,0,0.45),0_4px_10px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>

        {/* Goal cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {goals.map((goal) => (
            <button
              key={goal.title}
              type="button"
              className="group relative rounded-[22px] border border-cream/15 bg-cream/[0.06] p-7 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-cream/30 hover:bg-cream/[0.12]"
            >
              <span
                aria-hidden="true"
                className="absolute right-6 top-6 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-cream/15 text-[15px] opacity-55 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              >
                &rarr;
              </span>
              <span className="mb-3.5 block font-serif text-[15px] italic text-cream/45">
                {goal.tag}
              </span>
              <h3 className="mb-2.5 font-condensed text-xl font-bold uppercase">
                {goal.title}
              </h3>
              <p className="max-w-[34ch] font-condensed text-[15px] leading-[1.5] text-cream/70">
                {goal.text}
              </p>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-cream/15 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-[42ch] font-condensed text-[15px] text-cream/70">
            У тебя другой запрос? Напиши Милане — посмотрим, есть ли в команде преподаватель, который с ним работает.
          </p>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cream px-7 py-3.5 font-condensed text-sm font-bold text-[#241811] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
          >
            Написать Милане
          </a>
        </div>
      </div>
    </section>
  )
}
