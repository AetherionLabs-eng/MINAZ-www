import Button from "@/components/ui/Button";

const services = ["Road", "Air", "Ocean", "Express", "Warehousing", "Customs"];

export default function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[720px] h-screen overflow-hidden bg-background" aria-labelledby="hero-heading">
      <div className="hero-backdrop absolute inset-[-3%] -z-20" aria-hidden="true" />
      <div className="hero-visual absolute -z-10" aria-hidden="true" />
      <div className="hero-grid absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
      <div className="absolute bottom-0 left-[11%] top-0 hidden w-px bg-white/[0.08] lg:block" aria-hidden="true" />
      <div className="absolute bottom-0 right-[15%] top-0 hidden w-px bg-white/[0.06] xl:block" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between px-5 pb-7 pt-36 sm:px-8 sm:pb-9 lg:px-12 lg:pt-40">
        <div className="max-w-4xl">
          <p className="hero-reveal flex items-center gap-3 text-[10px] font-medium tracking-[0.22em] text-muted uppercase">
            <span className="h-px w-8 bg-red" />
            Edinburgh · United Kingdom / Europe &amp; Worldwide
          </p>
          <h1 id="hero-heading" className="hero-reveal hero-reveal-delay mt-7 max-w-4xl text-[clamp(3.4rem,8.3vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white uppercase">
            <span className="hero-line">Moving <span>business</span></span>{" "}
            <span className="hero-line relative inline-block">forward<span className="absolute -bottom-2 left-1 h-1 w-[42%] bg-red sm:-bottom-3 sm:h-1.5" />.</span>
          </h1>
          <p className="hero-reveal hero-reveal-delay mt-8 max-w-lg text-base leading-7 text-[#bcc8d1] sm:text-lg sm:leading-8">
            Integrated freight and logistics solutions connecting the United Kingdom with Europe and global markets.
          </p>
          <div className="hero-reveal hero-reveal-delay mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button href="#contact">Get a quote <span aria-hidden="true" className="text-base leading-none">→</span></Button>
            <Button href="#services" variant="outline">Explore services <span aria-hidden="true" className="text-base leading-none">→</span></Button>
          </div>
        </div>

        <div className="mt-20 border-t border-white/20 pt-5 sm:mt-12 sm:pt-6">
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-[10px] font-medium tracking-[0.2em] text-[#a7b4be] uppercase sm:justify-between sm:gap-4">
            {services.map((service, index) => (
              <a key={service} href={`#${service.toLowerCase()}`} className="group flex items-center gap-2 transition-colors hover:text-white">
                <span className={`h-1 w-1 ${index === 0 ? "bg-red" : "bg-white/35"}`} />
                {service}
              </a>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between text-[9px] tracking-[0.17em] text-white/35 uppercase">
            <span>Freight forwarding / 01</span>
            <span className="hidden sm:block">Global movement, precisely managed</span>
            <span>Est. Edinburgh</span>
          </div>
        </div>
      </div>
    </section>
  );
}