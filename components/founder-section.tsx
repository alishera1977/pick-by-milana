const olive = '#58683F'

export function FounderSection() {
  return (
    <section
      id="about"
      className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16"
      style={{ background: '#F7F1E5' }}
    >
      <div className="mx-auto w-full max-w-[1180px]">
        {/* Mobile */}
        <div className="lg:hidden">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-black">
            Основатель PICK
          </p>
          <div className="mt-2 h-px w-[88px] bg-black" />
          <h2 className="mt-8 relative z-10">
            <img
              src="/figma/milana-wordmark.png"
              alt="Milana"
              className="mx-auto block h-auto w-[90%] select-none"
            />
          </h2>

          <img
            src="/figma/milana-founder.jpg"
            alt="Милана — основатель PICK"
            className="mx-auto -mt-14 block aspect-[3/4] w-[84%] object-cover object-center"
          />

          <p className="mt-9 font-serif text-[18px] font-medium leading-[1.2] text-black">
            Я Милана,
            <br />
            основатель PICK.
          </p>

          <div className="mt-5 flex flex-col gap-4 font-sans text-[13px] font-[450] leading-[1.6] text-black">
            <p>
              Училась в Оксфорде, имею подтверждённый уровень C2 — Cambridge CPE
              (Certificate of Proficiency in English). В детстве жила в Испании и
              училась там в английской школе, а сейчас изучаю лингвистику.
            </p>
            <p>
              PICK появился из моего собственного опыта преподавания: мне хотелось
              собрать в одном месте людей с разным характером, опытом и подходом —
              тех, кого я сама готова рекомендовать.
            </p>
          </div>

          <div className="mt-6 h-px w-full bg-black/20" />
        </div>

        {/* Desktop — split with overlapping MILANA; mobile untouched above */}
        <div className="relative hidden min-h-[640px] overflow-visible lg:-mx-12 lg:grid lg:grid-cols-2 xl:min-h-[720px]">
          <div className="relative z-[1] flex flex-col justify-start px-12 pb-16 pt-5 xl:px-16 xl:pt-6">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-black">
              Основатель PICK
            </p>
            <div className="mt-2 h-px w-[88px] bg-black" />

            {/* Spacer so body text sits under the overlapping wordmark */}
            <div
              className="shrink-0"
              style={{ height: 'clamp(9rem, 14vw, 13rem)' }}
              aria-hidden="true"
            />

            <p className="font-serif text-[20px] font-medium leading-[1.25] text-black xl:text-[22px]">
              Я Милана, основатель PICK.
            </p>
            <div className="mt-6 flex max-w-[46ch] flex-col gap-4 font-sans text-[14px] font-normal leading-[1.55] text-black xl:text-[15px]">
              <p>
                Училась в Оксфорде, имею подтверждённый уровень C2 — Cambridge CPE
                (Certificate of Proficiency in English). В детстве жила в Испании и
                училась там в английской школе, а сейчас изучаю лингвистику.
              </p>
              <p>
                PICK появился из моего собственного опыта преподавания: мне хотелось
                собрать в одном месте людей с разным характером, опытом и подходом —
                тех, кого я сама готова рекомендовать.
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[640px] items-center justify-center p-8 pt-16 xl:min-h-[720px] xl:p-10 xl:pt-20">
            <img
              src="/figma/milana-founder.jpg"
              alt="Милана — основатель PICK"
              className="max-h-full w-auto max-w-[78%] object-contain"
            />
          </div>

          <h2 className="pointer-events-none absolute left-[50%] -top-3 z-10 w-[52%] xl:left-[52%] xl:-top-4 xl:w-[50%]">
            <img
              src="/figma/milana-wordmark.png"
              alt="Milana"
              className="block h-auto w-full select-none"
            />
          </h2>
        </div>

        <div className="mt-10 h-px w-full bg-black/20 lg:mt-14" />

        <div className="mt-8 grid items-start gap-8 sm:mt-10 lg:grid-cols-2 lg:items-center lg:gap-x-10 lg:pt-2 xl:gap-x-14">
          <div className="min-w-0">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-black">
              Со мной тоже
            </p>
            <h3
              className="mt-1 max-w-[60vw] font-display-condensed uppercase text-black lg:max-w-full"
              style={{
                fontWeight: 900,
                fontStretch: '25%',
                fontVariationSettings: '"wdth" 25, "wght" 900',
                fontSize: 'clamp(2.3rem, 5.2vw, 4.1rem)',
                lineHeight: 0.8,
                letterSpacing: '-0.03em',
              }}
            >
              Можно
              <br />
              заниматься.
            </h3>
          </div>

          <div className="flex flex-col items-start gap-7">
            <p className="max-w-[34ch] font-sans text-[14px] leading-[1.5] text-black sm:text-[15px]">
              Если хочешь узнать о формате, свободных местах и стоимости — напиши
              мне лично.
            </p>
            <a
              href="/anketa"
              className="inline-flex items-center px-6 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-88 sm:text-[13px]"
              style={{ background: olive }}
            >
              Написать Милане →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
