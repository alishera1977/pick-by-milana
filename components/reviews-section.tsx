'use client'

import { useCallback, useState, type PointerEvent } from 'react'

const olive = '#58683F'
const cream = '#F7F1E5'

type TextReview = {
  id: string
  type: 'text'
  name: string
  age: string
  about: string
  text: string
}

type PhotoReview = {
  id: string
  type: 'photo'
  image: string
  alt: string
  caption: string
}

type Review = TextReview | PhotoReview

const reviews: Review[] = [
  {
    id: 'photo-masha',
    type: 'photo',
    image: '/figma/review-masha-student.png',
    alt: 'Отзыв ученицы Маши в Telegram',
    caption: 'отзыв ученицы о Маше',
  },
  {
    id: 'photo-nika',
    type: 'photo',
    image: '/figma/review-nika-student.png',
    alt: 'Отзыв ученицы Ники в Telegram',
    caption: 'отзыв ученицы о Милане',
  },
  {
    id: 'lera',
    type: 'text',
    name: 'Лера',
    age: '20 лет',
    about: 'о Феде',
    text: 'Я сразу сказала, что мне нужен молодой преподаватель, с которым можно много разговаривать и обсуждать нормальные современные темы. Милана подобрала Федю — попала идеально. Иногда вообще забываю, что мы на уроке, пока не понимаю, что уже минут 20 говорю на английском.',
  },
  {
    id: 'kirill',
    type: 'text',
    name: 'Кирилл',
    age: '22 года',
    about: 'о Глебе',
    text: 'Я сразу сказал Милане, что не хочу классического репетитора и уроков, где час делаешь упражнения. Она предложила Глеба — и попала идеально. Очень живые занятия, много разговоров и вообще нет страха сказать что-то неправильно.',
  },
  {
    id: 'alina',
    type: 'text',
    name: 'Алина',
    age: '24 года',
    about: 'о Mary',
    text: 'Я хотела именно живой современный английский и преподавателя с опытом жизни за границей. Милана подобрала мне Mary, которая много лет жила в Канаде. Мне очень нравится, что на уроках она объясняет не только “как правильно”, но и как люди реально говорят. Начала замечать кучу выражений в фильмах и видео, которые раньше вообще пропускала.',
  },
  {
    id: 'varya',
    type: 'text',
    name: 'Варя',
    age: '19 лет',
    about: 'о Маше',
    text: 'Я вообще не знала, какого преподавателя хочу, просто рассказала Милане, что мне важно много говорить и чтобы на уроках не было ощущения школы. Она подобрала мне Машу, и мы совпали буквально с первого занятия. Кажется, Милана поняла, кто мне нужен, лучше меня самой ахах.',
  },
]

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 5.5 15.5 12 9 18.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TextReviewCard({ review }: { review: TextReview }) {
  return (
    <div
      className="rounded-[22px] px-6 py-8 sm:rounded-[28px] sm:px-10 sm:py-11"
      style={{ background: olive }}
    >
      <p className="font-[family-name:var(--font-prata)] text-[22px] leading-none text-white sm:text-[28px]">
        {review.name}, {review.age}
      </p>
      <p className="mt-2 font-sans text-[13px] uppercase tracking-[0.08em] text-white/70 sm:text-[14px]">
        {review.about}
      </p>
      <p className="mt-6 font-sans text-[14px] leading-[1.55] text-white/90 sm:text-[16px] sm:leading-[1.6]">
        «{review.text}»
      </p>
    </div>
  )
}

function PhotoReviewCard({ review }: { review: PhotoReview }) {
  return (
    <div className="overflow-hidden rounded-[22px] sm:rounded-[28px]">
      <p className="mb-3 text-center font-sans text-[12px] uppercase tracking-[0.08em] text-black/45 sm:text-[13px]">
        {review.caption}
      </p>
      <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:max-w-[400px] sm:rounded-[22px]">
        <img
          src={review.image}
          alt={review.alt}
          className="block h-auto w-full"
          draggable={false}
        />
      </div>
    </div>
  )
}

export function ReviewsSection() {
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const [startX, setStartX] = useState<number | null>(null)

  const go = useCallback((next: number) => {
    const total = reviews.length
    setIndex(((next % total) + total) % total)
  }, [])

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    setStartX(e.clientX)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (startX === null) return
    setDrag(e.clientX - startX)
  }

  function onPointerUp() {
    if (startX === null) return
    if (drag < -50) go(index + 1)
    else if (drag > 50) go(index - 1)
    setStartX(null)
    setDrag(0)
  }

  return (
    <section
      id="reviews"
      className="w-full px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      style={{ background: cream }}
    >
      <div className="mx-auto w-full max-w-[820px]">
        <h2 className="text-center font-[family-name:var(--font-prata)] text-[32px] leading-[1.1] text-black sm:text-[42px] lg:text-[48px]">
          Отзывы
        </h2>
        <p className="mx-auto mt-3 max-w-[36ch] text-center font-sans text-[14px] leading-[1.4] text-black/65 sm:text-[16px]">
          Как это бывает, когда преподаватель подобран точно.
        </p>

        <div className="relative mt-8 sm:mt-10">
          <div
            className="overflow-hidden touch-pan-y"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(calc(${-index * 100}% + ${startX === null ? 0 : drag}px))`,
                transition: startX === null ? 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
              }}
            >
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="w-full shrink-0 px-0.5 select-none"
                >
                  {review.type === 'text' ? (
                    <TextReviewCard review={review} />
                  ) : (
                    <PhotoReviewCard review={review} />
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-4 sm:mt-7">
            <button
              type="button"
              aria-label="Предыдущий отзыв"
              onClick={() => go(index - 1)}
              className="flex size-10 items-center justify-center rounded-full border border-black/20 text-black transition-opacity hover:opacity-70 sm:size-11"
            >
              <Arrow className="size-5 rotate-180" />
            </button>

            <div className="flex items-center gap-2">
              {reviews.map((review, i) => (
                <button
                  key={review.id}
                  type="button"
                  aria-label={`Отзыв ${i + 1}`}
                  aria-current={i === index ? true : undefined}
                  onClick={() => go(i)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: i === index ? 22 : 8,
                    background: i === index ? olive : 'rgba(0,0,0,0.22)',
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Следующий отзыв"
              onClick={() => go(index + 1)}
              className="flex size-10 items-center justify-center rounded-full border border-black/20 text-black transition-opacity hover:opacity-70 sm:size-11"
            >
              <Arrow className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
