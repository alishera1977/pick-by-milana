import Link from 'next/link'

const olive = '#58683F'

const legalLinks = [
  { href: '/privacy/', label: 'Политика конфиденциальности', external: false },
  { href: '/offer.pdf', label: 'Договор / Оферта', external: true },
  { href: '/requisites/', label: 'Реквизиты', external: false },
] as const

export function SiteFooter() {
  return (
    <footer
      className="w-full border-t border-black/10 px-5 py-8 sm:px-8 sm:py-10 lg:px-12"
      style={{ background: '#F7F1E5' }}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 sm:gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-[family-name:var(--font-heading-sans)] text-[13px] font-bold uppercase tracking-[-0.02em] text-black sm:text-[14px]">
            PICK by Milana
          </p>
          <div className="mt-2.5 font-sans text-[11px] leading-[1.55] text-black/55 sm:mt-3 sm:text-[12px] sm:leading-[1.5]">
            <p>ИП Щербакова Милана Павловна</p>
            <p>ИНН 540200328101</p>
            <p>ОГРНИП 326547600165368</p>
          </div>
        </div>

        <nav
          aria-label="Юридическая информация"
          className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2"
        >
          {legalLinks.map(({ href, label, external }) =>
            external ? (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[11px] transition-colors hover:text-black sm:text-[12px]"
                style={{ color: olive }}
              >
                {label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className="font-sans text-[11px] transition-colors hover:text-black sm:text-[12px]"
                style={{ color: olive }}
              >
                {label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </footer>
  )
}
