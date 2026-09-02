type GoalRowProps = {
  title: string
  text: string
  photo: string
  photoAlt: string
  photoFirst?: boolean
  desktopObjectPositionClass?: string
}

function PhotoCard({
  src,
  alt,
  className = '',
  desktopObjectPositionClass,
}: {
  src: string
  alt: string
  className?: string
  desktopObjectPositionClass?: string
}) {
  return (
    <div
      className={`h-full min-h-0 min-w-0 overflow-hidden rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] ${className}`}
    >
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        className={`block h-full w-full object-cover max-md:object-center md:object-cover ${desktopObjectPositionClass ?? ''}`}
      />
    </div>
  )
}

function GoalRow({
  title,
  text,
  photo,
  photoAlt,
  photoFirst = false,
  desktopObjectPositionClass,
}: GoalRowProps) {
  const gridCols = photoFirst
    ? 'md:grid-cols-[clamp(260px,28%,360px)_minmax(0,1fr)]'
    : 'md:grid-cols-[minmax(0,1fr)_clamp(260px,28%,360px)]'

  const textBlock = (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col p-4 sm:p-5 md:min-h-0 md:p-6 lg:p-8">
      <span
        className="block shrink-0 rounded-full bg-black"
        style={{ width: 5, height: 5 }}
        aria-hidden="true"
      />
      <h3 className="mt-2 shrink-0 font-[family-name:var(--font-prata)] text-[18px] leading-[1.1] font-normal text-black sm:mt-2.5 lg:mt-3 lg:text-[30px] lg:leading-[1.08]">
        {title}
      </h3>
      <p className="mt-1.5 min-h-0 max-w-[42ch] font-sans text-[12px] font-normal leading-[1.3] text-black/50 sm:mt-2 lg:mt-3 lg:max-w-[520px] lg:text-[18px] lg:leading-[1.4]">
        {text}
      </p>
      <span className="mt-auto inline-flex shrink-0 items-center pt-2 font-[family-name:var(--font-heading-serif)] text-[12px] italic uppercase tracking-[0.02em] text-black transition-transform duration-200 group-hover:translate-x-1 sm:pt-3 sm:text-[13px] lg:pt-4 lg:text-[13px]">
        Подробнее
      </span>
    </div>
  )

  const photoBlock = (
    <div
      className={`flex min-h-0 w-[34%] shrink-0 items-stretch sm:w-[32%] md:h-full md:min-h-0 md:w-full md:max-w-none md:shrink-0 ${
        photoFirst
          ? 'p-2 pl-2.5 sm:p-2.5 sm:pl-3 md:p-3'
          : 'p-2 pr-2.5 sm:p-2.5 sm:pr-3 md:p-3'
      }`}
    >
      <PhotoCard
        src={photo}
        alt={photoAlt}
        className="h-full min-h-0 w-full"
        desktopObjectPositionClass={desktopObjectPositionClass}
      />
    </div>
  )

  return (
    <button
      type="button"
      className={`group flex h-[168px] w-full min-h-0 overflow-hidden rounded-[28px] text-left transition-[background,border-color] duration-200 sm:h-[220px] sm:rounded-[32px] md:grid md:h-[220px] md:min-h-0 lg:h-[248px] lg:rounded-[36px] ${gridCols}`}
      style={{
        background: 'rgba(255, 255, 255, 0.22)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.45)',
      }}
    >
      {photoFirst ? (
        <>
          {photoBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {photoBlock}
        </>
      )}
    </button>
  )
}

const goals = [
  {
    title: 'Я начинаю с нуля',
    text: 'Хочу наконец разобраться в базе и постепенно начать говорить.',
    photo: '/figma/photo-scratch.jpg',
    photoAlt: 'Двое молодых людей вместе смотрят в ноутбук',
    photoFirst: false,
    desktopObjectPositionClass: 'md:[object-position:center_55%]',
  },
  {
    title: 'Я всё понимаю, но не могу сказать',
    text: 'Уберём языковой барьер и сделаем английский частью обычной жизни.',
    photo: '/figma/photo-barrier.jpg',
    photoAlt: 'Девушка на набережной канала в солнечный день',
    photoFirst: true,
    desktopObjectPositionClass: 'md:[object-position:center_75%]',
  },
  {
    title: 'Мне нужен английский для путешествий',
    text: 'Научим общаться уверенно в любой точке мира.',
    photo: '/figma/london-photo.jpg',
    photoAlt: 'Студентка на фоне Биг-Бена в Лондоне',
    photoFirst: false,
    desktopObjectPositionClass: 'md:[object-position:center_82%]',
  },
  {
    title: 'Хочу поднять свой уровень',
    text: 'Поможем перейти с текущего уровня на следующий.',
    photo: '/figma/photo-levelup.jpg',
    photoAlt: 'Девушка с длинными волосами в тёмном пиджаке',
    photoFirst: true,
    desktopObjectPositionClass: 'md:[object-position:center_62%]',
  },
] as const

export function GoalSection() {
  return (
    <section
      id="goal"
      className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16"
      style={{ background: '#F7F1E5' }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className="max-w-[18ch] font-[family-name:var(--font-heading-sans)] text-[28px] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-black sm:text-[40px] sm:leading-[1.02] lg:text-[46px] lg:leading-[0.95]">
          Начнём с твоей цели
        </h2>
        <p className="mt-4 max-w-[640px] font-sans text-[14px] leading-[1.4] text-black/55 sm:mt-5 sm:text-[16px] sm:leading-[1.45] lg:mt-5 lg:max-w-[620px] lg:text-[17px] lg:leading-[1.45]">
          Не подгоняем тебя под программу — подбираем человека под твой запрос.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:gap-3 lg:mt-10 lg:gap-3.5">
          {goals.map((goal) => (
            <GoalRow key={goal.title} {...goal} />
          ))}
        </div>

        <div className="mt-3 flex flex-col items-start justify-between gap-3 rounded-[20px] border border-black/10 bg-white/40 px-4 py-3 sm:mt-4 sm:flex-row sm:items-center sm:gap-4 sm:rounded-[24px] sm:px-6 sm:py-4">
          <p className="max-w-[640px] font-sans text-[12px] leading-[1.35] text-black/65 sm:text-[14px] sm:leading-[1.4]">
            Не нашла свой запрос? Напиши Милане — подберём преподавателя лично.
          </p>
          <a
            href="/anketa"
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-black px-3 py-1.5 font-condensed text-[10px] font-bold uppercase tracking-[0.06em] text-[#F7F1E5] transition-all duration-200 hover:-translate-y-0.5 sm:px-3.5 sm:text-[11px]"
          >
            Написать Милане <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
