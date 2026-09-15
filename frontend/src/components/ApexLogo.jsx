export default function ApexLogo({ variant = 'dark', className = 'h-9 w-auto', showSubtitle = true }) {
  const isLightText = variant === 'light'
  const textColor = isLightText ? '#FAF9F6' : '#0B1528'
  const subtextColor = isLightText ? '#94A3B8' : '#6B7280'

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 68"
        className="h-full w-auto shrink-0"
        fill="none"
      >
        {/* Outer Shield / Diamond Frame */}
        <path
          d="M32 4 L58 20 L58 48 L32 64 L6 48 L6 20 Z"
          stroke="#9A7B44"
          strokeWidth="2.2"
          fill="#0B1528"
        />
        {/* Inner Apex Triangle & Pillar */}
        <path
          d="M32 14 L48 44 L16 44 Z"
          stroke="#B39257"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M32 23 L32 44"
          stroke="#FAF9F6"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="32" cy="13" r="2.8" fill="#9A7B44" />
        {/* Subtle architectural chevron lines */}
        <line x1="24" y1="49" x2="40" y2="49" stroke="#9A7B44" strokeWidth="2" />
        <line x1="20" y1="54" x2="44" y2="54" stroke="#9A7B44" strokeWidth="1.6" strokeOpacity="0.6" />
      </svg>

      <div className="flex flex-col justify-center leading-none select-none">
        <span
          style={{ color: textColor }}
          className="font-serif text-[19px] sm:text-[21px] font-bold tracking-[0.14em] uppercase"
        >
          Apex Capital
        </span>
        {showSubtitle && (
          <span className="font-sans text-[9px] font-semibold text-[#9A7B44] tracking-[0.24em] uppercase mt-0.5">
            Advisory Group
          </span>
        )}
      </div>
    </div>
  )
}

