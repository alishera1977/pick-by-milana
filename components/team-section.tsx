import Link from 'next/link'
import { teachers, type Teacher } from '@/lib/teachers'

function TeacherCard({
  slug,
  photo,
  photoClass,
  tag,
  name,
  tagline,
  points,
  price,
}: Teacher) {
  return (
    <article
      className="flex min-w-0 flex-col rounded-[14px] p-2 sm:rounded-[24px] sm:p-3.5"
      style={{
        background: 'rgba(92, 58, 36, 0.07)',
        border: '1px solid rgba(92, 58, 36, 0.10)',
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] sm:rounded-[16px]">
        <img
          src={photo}
          alt={name}
          className={`absolute inset-0 h-full w-full object-cover ${photoClass}`}
        />
      </div>

      <span className="mt-2 inline-flex w-fit max-w-full truncate rounded-full bg-[#FFF3A6] px-1.5 py-0.5 font-sans text-[8px] font-medium uppercase tracking-[0.04em] text-black sm:mt-3.5 sm:px-2.5 sm:py-1 sm:text-[11px]">
        {tag}
      </span>

      <h3 className="mt-1.5 font-[family-name:var(--font-prata)] text-[18px] leading-none text-black sm:mt-2.5 sm:text-[28px] lg:text-[30px]">
        {name}
      </h3>
      <p className="mt-1 font-sans text-[10px] leading-[1.3] text-black/55 sm:mt-1.5 sm:text-[14px] sm:leading-[1.35]">
        {tagline}
      </p>
      {price ? (
        <p className="mt-1 font-sans text-[11px] font-medium text-black sm:mt-1.5 sm:text-[15px]">
          {price}
        </p>
      ) : null}

      <div className="my-2 h-px w-full bg-black/10 sm:my-3" />

      <ul className="flex flex-col gap-1 sm:gap-1.5">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-1.5 font-sans text-[10px] leading-[1.3] text-black/60 sm:gap-2 sm:text-[14px] sm:leading-[1.35] lg:text-[15px]"
          >
            <span
              className="mt-[5px] block shrink-0 rounded-full bg-black sm:mt-[7px]"
              style={{ width: 3, height: 3 }}
              aria-hidden="true"
            />
            {point}
          </li>
        ))}
      </ul>

      <Link
        href={`/teachers/${slug}`}
        className="mt-auto inline-flex items-center gap-0.5 pt-3 font-sans text-[11px] text-black transition-opacity hover:opacity-70 sm:gap-1 sm:pt-6 sm:text-[14px]"
      >
        Подробнее <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}

export function TeamSection() {
  return (
    <section
      id="team"
      className="w-full px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-20"
      style={{ background: '#F7F1E5' }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="max-w-[560px]">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-black/50 sm:text-xs">
              Моя команда
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-prata)] text-[28px] leading-[1.15] text-black sm:text-[36px] lg:text-[44px]">
              Преподаватели,
              <br />
              <span className="italic">которых я выбрала для тебя</span>
            </h2>
          </div>

          <div className="flex max-w-[360px] flex-col items-start gap-4 lg:pt-6">
            <p className="font-sans text-[14px] leading-[1.45] text-black/60 sm:text-[15px] lg:text-base">
              У каждого свой подход, характер и опыт. Мы подберём того, с кем тебе
              будет комфортно расти.
            </p>
            <Link
              href="/anketa?type=teacher"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/25 px-4 py-2 font-sans text-[12px] text-black transition-colors hover:border-black/50 sm:text-[13px]"
            >
              Подобрать мне преподавателя <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Teachers grid — mobile: 2 cols so 2 cards per row */}
        <div className="mt-10 grid grid-cols-2 gap-2 sm:mt-12 sm:grid-cols-2 sm:gap-3.5 lg:mt-14 lg:grid-cols-4 lg:gap-4">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.slug} {...teacher} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col gap-5 rounded-[16px] bg-[#FFF3A6] px-5 py-5 sm:mt-10 sm:gap-6 sm:rounded-[20px] sm:px-7 sm:py-6 lg:mt-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8 lg:py-5">
          <p className="font-[family-name:var(--font-prata)] text-[26px] leading-[1.15] text-black sm:text-[32px] lg:max-w-[300px] lg:text-[36px]">
            не знаешь, кого<span className="uppercase">PICK</span>нуть?
          </p>

          <div className="hidden h-12 w-px shrink-0 bg-black/20 lg:block" />

          <p className="max-w-[320px] font-sans text-[14px] leading-[1.4] text-black/75 sm:text-[15px] lg:text-base">
            Расскажи мне о своей цели — я подберу преподавателя сама.
          </p>

          <Link
            href="/anketa?type=teacher"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-full bg-black px-5 py-2.5 font-sans text-[13px] text-white transition-opacity hover:opacity-85 sm:px-6 sm:py-3 sm:text-[14px] lg:self-center"
          >
            Подобрать преподавателя <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
