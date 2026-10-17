import HeroBackground from './HeroBackground'
import FontSwap from './FontSwap'

export default function Hero() {
  return (
    <section
      className="pt-xl pb-xl _homeHero_m4xpb_1 module-comp"
      id="section-home-hero"
      style={{ marginTop: '100px' }}
    >
      <HeroBackground />

      <p className="_eyebrow_m4xpb_37">Supercomputers for training and inference</p>

      {/* Reduced-motion fallback */}
      <h1 className="h1-large _reducedMotionTitle_m4xpb_75">
        <span>The Superintelligence <br /> Cloud</span>
      </h1>

      {/* Animated heading */}
      <h1 className="h1-large _heroTitle_m4xpb_78">
        <span className="sr-only">The Superintelligence Cloud</span>
        <span aria-hidden="true">
          The{' '}
          <span className="no-wrap">
            S<FontSwap delay={1000} loopDuration={11000}>u</FontSwap>perintellig
            <FontSwap delay={4000} loopDuration={11000}>e</FontSwap>nce
          </span>
          <br />
          Cl<FontSwap delay={7000} loopDuration={11000}>o</FontSwap>ud
        </span>
      </h1>

      <div className="container _titleContainer_m4xpb_58">
        <div className="buttonGroup _buttonGroup_m4xpb_63" data-align="center">
          <a href="/sign-up" className="button" aria-label="Launch GPU instance">
            Launch GPU instance
          </a>
          <a href="/talk-to-our-team" className="button button--secondary" aria-label="Talk to our team">
            Talk to our team
          </a>
        </div>
      </div>
    </section>
  )
}
