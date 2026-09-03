function SketchArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 8c18 1 34 3 50 12"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M46 8.5c4.5 6 8 10.5 12 14.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ChooseCard({
  num,
  title,
  text,
  href,
  cta,
  external = false,
}: {
  num: string
  title: string
  text: string
  href: string
  cta: string
  external?: boolean
}) {
  return (
    <article
      className="flex min-w-0 flex-col rounded-[18px] border border-black/12 p-4 sm:rounded-[22px] sm:p-5"
      style={{ background: 'rgba(255, 255, 255, 0.28)' }}
    >
      <span className="font-[family-name:var(--font-prata)] text-[34px] leading-none text-[#58683F] sm:text-[40px]">
        {num}
      </span>

      <h3 className="mt-4 font-sans text-[15px] font-semibold leading-[1.25] text-black sm:text-[16px]">
        {title}
      </h3>
      <p className="mt-2.5 font-sans text-[12px] leading-[1.45] text-black/62 sm:text-[13px]">
        {text}
      </p>

      <div className="relative mt-auto pt-5">
        <a
          href={href}
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          className="inline-flex items-center rounded-full bg-[#58683F] px-3.5 py-1.5 font-sans text-[12px] text-[#F7F1E5] transition-opacity hover:opacity-85 sm:text-[13px]"
        >
          {cta}
        </a>
        <SketchArrow className="pointer-events-none absolute right-1 top-7 w-14 text-black/55 sm:right-2 sm:w-16" />
      </div>
    </article>
  )
}

export function ChooseTeacherSection() {
  return (
    <section
      id="choose"
      className="w-full px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      style={{ background: '#F7F1E5' }}
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-14">
        <div className="min-w-0">
          <h2 className="font-[family-name:var(--font-prata)] text-[32px] leading-[1.1] text-black sm:text-[40px] lg:text-[48px]">
            Как выбрать преподавателя
          </h2>

          <p className="mt-3 max-w-[34ch] font-sans text-[14px] leading-[1.4] text-black/70 sm:mt-4 sm:text-[16px] lg:text-[17px]">
            Два простых способа — ты решаешь, что подходит{' '}
            <span className="relative inline-block">
              именно тебе
              <svg
                className="pointer-events-none absolute -bottom-1 left-0 w-full"
                viewBox="0 0 120 8"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 5.2c18-2.4 48-3.2 78 0 12 .9 26 1.6 38 1"
                  stroke="#58683F"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-10">
            <ChooseCard
              num="01"
              title="Хочешь выбрать сам?"
              text="Посмотри анкеты преподавателей: опыт, специализацию, стиль занятий, стоимость и кому особенно подойдёт каждый из них."
              href="#team"
              cta="Смотреть преподавателей →"
            />
            <ChooseCard
              num="02"
              title="Не знаешь, кто нужен именно тебе?"
              text="Напиши мне. Расскажи свой уровень, цель, прошлый опыт и какой формат занятий тебе комфортен. Я посмотрю на запрос и скажу, к кому из команды я бы пошла на твоём месте."
              href="/anketa"
              cta="Спросить Милану →"
            />
          </div>

          <div className="relative mt-8 w-fit sm:mt-10">
            <p
              className="rounded-[100%] border-[1.5px] border-[#58683F] px-6 py-4 text-center font-[family-name:var(--font-heading-serif)] text-[18px] italic leading-[1.15] text-black sm:px-8 sm:py-5 sm:text-[22px]"
              style={{ transform: 'rotate(-4deg)' }}
            >
              Can’t pick?
              <br />
              Ask Milana.
            </p>
          </div>
        </div>

        <div className="hidden min-w-0 lg:sticky lg:top-6 lg:block">
          <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[42px]">
            <img
              src="/figma/milana-choose.jpg"
              alt="Милана"
              className="block aspect-[3/4] w-full object-cover object-[center_18%] lg:aspect-[4/5]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
