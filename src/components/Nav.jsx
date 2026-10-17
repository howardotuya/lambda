import { useState } from 'react'

const NAV_ITEMS = [
  { text: 'AI factories', href: 'https://lambda.ai/ai-infrastructure' },
  {
    text: 'Products',
    dropdown: {
      columns: [
        {
          heading: 'Supercomputers',
          links: [
            { text: 'Superclusters', href: 'https://lambda.ai/superclusters' },
            { text: '1-Click Clusters™', href: 'https://lambda.ai/1-click-clusters' },
            { text: 'Instances', href: 'https://lambda.ai/instances' },
          ],
          footer: { text: 'Compare', href: 'https://lambda.ai/cloud' },
        },
        {
          heading: 'For every mission',
          links: [
            { text: 'Superintelligence', href: 'https://lambda.ai/superintelligence' },
            { text: 'Enterprise', href: 'https://lambda.ai/enterprise' },
            { text: 'Government', href: 'https://lambda.ai/government' },
            { text: 'Startups and Researchers', href: 'https://lambda.ai/instances' },
          ],
        },
        {
          heading: 'Foundations',
          links: [
            { text: 'AI factories', href: 'https://lambda.ai/ai-infrastructure' },
            { text: 'Orchestration', href: 'https://lambda.ai/orchestration' },
            { text: 'Lambda Stack', href: 'https://lambda.ai/lambda-stack-deep-learning-software' },
            { text: 'Trust and security', href: 'https://lambda.ai/trust' },
          ],
        },
        {
          heading: 'Docs',
          links: [
            { text: 'Customer stories', href: 'https://lambda.ai/customer-stories' },
            { text: 'Documentation', href: 'https://docs.lambda.ai/', external: true },
            { text: 'Blog', href: 'https://lambda.ai/blog' },
            { text: 'Research', href: 'https://lambda.ai/research' },
          ],
        },
      ],
    },
  },
  { text: 'Pricing', href: 'https://lambda.ai/pricing' },
  {
    text: 'Company',
    dropdown: {
      columns: [
        {
          heading: 'Inside Lambda',
          links: [
            { text: 'About', href: 'https://lambda.ai/about' },
            { text: 'Careers', href: 'https://lambda.ai/careers' },
            { text: 'Leadership', href: 'https://lambda.ai/leadership' },
            { text: 'Investors', href: 'https://lambda.ai/investors' },
          ],
        },
        {
          heading: 'Resources',
          links: [
            { text: 'Research', href: 'https://lambda.ai/research' },
            { text: 'LLM index', href: 'https://lambda.ai/inference-models' },
            { text: 'GPU benchmarks', href: 'https://lambda.ai/gpu-benchmarks' },
            { text: 'Customer stories', href: 'https://lambda.ai/customer-stories' },
            { text: 'Support', href: 'https://lambda.ai/support' },
            { text: 'Blog', href: 'https://lambda.ai/blog' },
            { text: 'Partners', href: 'https://lambda.ai/partners' },
          ],
        },
      ],
    },
  },
]

const UTILITY_ITEMS = [
  { text: 'Log in', href: 'https://lambda.ai/login' },
  {
    text: 'Get started',
    isCta: true,
    dropdown: {
      columns: [
        {
          links: [{ text: 'Create account', href: 'https://lambda.ai/sign-up' }],
          footer: { text: 'Talk to our team', href: 'https://lambda.ai/talk-to-our-team' },
        },
      ],
    },
  },
]

function DropdownColumn({ col }) {
  return (
    <li>
      {col.heading && (
        <div className="dropdownColumnHeading">{col.heading}</div>
      )}
      <ul className="dropdownLinks">
        {col.links.map((link) => (
          <li key={link.text}>
            <a
              href={link.href}
              aria-label={link.text}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
      {col.footer && (
        <div className="dropdownFooter">
          <a href={col.footer.href} aria-label={col.footer.text}>
            {col.footer.text}
          </a>
        </div>
      )}
    </li>
  )
}

function MobileNavItem({ item, openId, onToggle }) {
  const isOpen = openId === item.text

  if (!item.dropdown) {
    return (
      <li className="mobileNavItem">
        <a href={item.href} className="mobileNavLink" aria-label={item.text}>
          {item.text}
        </a>
      </li>
    )
  }

  return (
    <li className="mobileNavItem">
      <button
        type="button"
        className="mobileNavToggle"
        aria-expanded={isOpen}
        aria-controls={`mobile-dropdown-${item.text.toLowerCase()}`}
        onClick={() => onToggle(item.text)}
      >
        {item.text}
        <span className="toggleIcon">
          <span className="toggleIconBar" />
          <span className="toggleIconBar" />
        </span>
      </button>
      <div
        id={`mobile-dropdown-${item.text.toLowerCase()}`}
        className={`mobileDropdown${isOpen ? ' open' : ''}`}
      >
        <div className="mobileDropdownContent">
          {item.dropdown.columns.map((col, i) => (
            <div className="mobileDropdownColumn" key={i}>
              {col.heading && (
                <div className="mobileDropdownColumnHeading">{col.heading}</div>
              )}
              <ul className="mobileDropdownLinks">
                {col.links.map((link) => (
                  <li key={link.text}>
                    <a href={link.href} aria-label={link.text}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
              {col.footer && (
                <div className="mobileDropdownFooter">
                  <a href={col.footer.href} aria-label={col.footer.text}>
                    {col.footer.text}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </li>
  )
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null)

  const toggleMobile = () => setMobileOpen((v) => !v)
  const toggleMobileDropdown = (id) =>
    setOpenMobileDropdown((cur) => (cur === id ? null : id))

  const mainNavItems = NAV_ITEMS
  const utilityNavItems = UTILITY_ITEMS
  const mobileMainItems = NAV_ITEMS
  const mobileUtilityItems = UTILITY_ITEMS

  return (
    <header className="siteHeader" style={{ '--total-header-height': 'var(--header-nav-height)' }}>
      <div className="container">
        <div className="headerContentWrapper">
          {/* Logo */}
          <div className="headerLogoWrapper">
            <a href="https://lambda.ai/" className="headerLogo" aria-label="Lambda homepage">
              <svg width="171" height="40" viewBox="0 0 171 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M54.5472 27.5003H64.1365V32.1322H49.0749V7.745H54.5472V27.5003ZM1.46484 1.70898H38.1092V38.2959H1.46484V1.70898ZM4.70436 35.0712H34.8607V4.93062H4.70436V35.0712ZM11.1443 7.79363L17.5182 19.0937L10.4261 32.1808H14.9939L19.7209 23.2484L24.7545 32.1808H29.4064L15.7962 7.79059L11.1443 7.79363ZM104.823 14.0424C103.656 14.0154 102.504 14.3163 101.496 14.9116C100.612 15.4613 99.8454 16.1847 99.2422 17.0391H99.1701C98.4188 15.1943 96.6308 14.0363 94.377 14.0363C91.3718 14.0363 89.8332 15.6988 89.0819 16.8233H88.9738L88.7243 14.4345H84.2888V32.1261H89.5838V21.8199C89.5665 21.3524 89.6389 20.8858 89.7972 20.4462C90.1187 19.5344 90.9421 18.4554 92.3365 18.4554C94.0554 18.4554 94.8428 19.9751 94.8428 22.2181V32.1322H100.138V21.7986C100.135 21.3192 100.207 20.8423 100.351 20.3854C100.513 19.8386 100.843 19.3582 101.293 19.0135C101.743 18.6688 102.29 18.4776 102.854 18.4676C104.609 18.4676 105.433 19.9508 105.433 22.522V32.1444H110.725V21.7135C110.725 16.4313 108.185 14.0424 104.823 14.0424ZM145.879 7.05204H151.318V32.117H146.63L146.38 29.5123H146.308C145.199 31.5031 143.087 32.5152 140.833 32.5152C136.683 32.5152 133.356 28.9349 133.356 23.4338C133.32 17.4646 137.004 14.0272 141.191 14.0272C143.339 14.0272 145.019 14.787 145.806 16.0179H145.879V7.05204ZM145.879 21.9141C145.872 21.5878 145.848 21.2621 145.806 20.9385C145.485 19.4554 144.304 18.2244 142.624 18.2244C140.154 18.2244 138.868 20.4674 138.868 23.2545C138.868 26.2573 140.334 28.1386 142.588 28.1386C143.336 28.1471 144.063 27.8885 144.642 27.4081C145.22 26.9278 145.612 26.2566 145.749 25.5126C145.855 25.0989 145.903 24.6724 145.894 24.2453L145.879 21.9141ZM169.343 21.6588V32.117H164.655L164.333 30.3451H164.225C163.077 31.7553 161.28 32.5152 159.197 32.5152C155.642 32.5152 153.524 29.9105 153.524 27.087C153.524 22.4916 158.148 21.1422 163.828 21.1422V20.0814C163.828 19.1423 163.326 17.802 160.634 17.802C159.215 17.8218 157.815 18.1417 156.526 18.7411L154.783 15.5955C156.003 14.9086 158.407 14.0394 161.604 14.0394C167.455 14.0394 169.343 17.5133 169.343 21.674V21.6588ZM164.008 24.3942C161.003 24.3942 158.566 24.6009 158.554 26.8256C158.554 28.245 159.843 28.6279 161.063 28.6279C161.687 28.6326 162.295 28.4396 162.804 28.0759C163.313 27.7123 163.697 27.1963 163.9 26.6007C163.974 26.2933 164.01 25.9779 164.008 25.6616V24.3942ZM131.253 22.9475C131.253 29.3117 127.298 32.4908 123.343 32.4908C121.33 32.4908 119.389 31.731 118.153 29.637H118.102L117.892 32.0927H113.474V7.06724H118.836V16.5285H118.905C119.929 15.0089 121.729 14.0363 124.131 14.0363C128.263 14.0363 131.298 17.5406 131.265 22.9627L131.253 22.9475ZM125.777 23.1663C125.777 20.431 124.575 18.2488 122.072 18.2488C120.624 18.2488 119.283 19.3703 118.929 20.9598C118.858 21.2923 118.822 21.6317 118.824 21.9719V24.5765C118.821 24.9048 118.856 25.2323 118.929 25.5522C119.084 26.2815 119.48 26.9359 120.051 27.4085C120.622 27.881 121.334 28.1438 122.072 28.1538C124.38 28.169 125.789 26.3606 125.789 23.1815L125.777 23.1663ZM81.9027 21.6467V32.1048H77.2328L76.9112 30.3329H76.8031C75.6521 31.7432 73.858 32.503 71.7755 32.503C68.2174 32.5212 66.1139 29.9257 66.1139 27.1022C66.1139 22.5068 70.7387 21.1574 76.4184 21.1574V20.0814C76.4184 19.1423 75.9165 17.802 73.224 17.802C71.8058 17.8215 70.4074 18.1414 69.119 18.7411L67.373 15.5955C68.5961 14.9086 71.0002 14.0394 74.1976 14.0394C80.0366 14.0394 81.9238 17.5133 81.9238 21.674L81.9027 21.6467ZM76.5686 24.382C73.5635 24.382 71.1264 24.5887 71.1144 26.8135C71.1144 28.2328 72.4036 28.6158 73.6236 28.6158C74.2469 28.6209 74.8559 28.4281 75.365 28.0643C75.8739 27.7006 76.2571 27.1844 76.4605 26.5886C76.5341 26.2811 76.5704 25.9657 76.5686 25.6494V24.382Z"
                  fill="#e7e6d9"
                />
              </svg>
            </a>
          </div>

          {/* Desktop Main Nav */}
          <nav aria-label="Primary" className="mainNav">
            <ul>
              {mainNavItems.map((item) =>
                item.dropdown ? (
                  <li key={item.text} className="hasDropdown">
                    <button
                      type="button"
                      className="noLink"
                      aria-label={item.text}
                      aria-haspopup="true"
                      aria-expanded="false"
                      tabIndex={0}
                    >
                      {item.text}
                    </button>
                    <div className="dropdownWrapper">
                      <div className="dropdownContent">
                        <ul className="dropdownColumns">
                          {item.dropdown.columns.map((col, i) => (
                            <DropdownColumn key={i} col={col} />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.text}>
                    <a href={item.href} className="directLink" aria-label={item.text} tabIndex={0}>
                      {item.text}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Desktop Utility Nav */}
          <div className="utilityNav">
            <ul>
              {utilityNavItems.map((item) =>
                item.dropdown ? (
                  <li key={item.text} className="hasDropdown">
                    <button
                      type="button"
                      className="noLink"
                      aria-label={item.text}
                      aria-haspopup="true"
                      aria-expanded="false"
                      tabIndex={0}
                    >
                      {item.text}
                    </button>
                    <div className="dropdownWrapper">
                      <div className="dropdownContent">
                        <ul className="dropdownColumns">
                          {item.dropdown.columns.map((col, i) => (
                            <DropdownColumn key={i} col={col} />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.text}>
                    <a href={item.href} className="directLink" aria-label={item.text} tabIndex={0}>
                      {item.text}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="mobileMenuToggle"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            onClick={toggleMobile}
          >
            <span className={`hamburger${mobileOpen ? ' active' : ''}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        {/* Mobile overlay */}
        <div
          className={`mobileMenuOverlay${mobileOpen ? ' active' : ''}`}
          aria-hidden="true"
          onClick={toggleMobile}
        />

        {/* Mobile drawer */}
        <nav
          className={`mobileMenu${mobileOpen ? ' active' : ''}`}
          aria-label="Mobile navigation"
        >
          <div className="mobileMenuContent">
            <div className="mobileNavSection">
              <ul className="mobileNavList">
                {mobileMainItems.map((item) => (
                  <MobileNavItem
                    key={item.text}
                    item={item}
                    openId={openMobileDropdown}
                    onToggle={toggleMobileDropdown}
                  />
                ))}
              </ul>
            </div>
            <div className="mobileUtilitySection">
              <ul className="mobileNavList">
                {mobileUtilityItems.map((item) => (
                  <MobileNavItem
                    key={item.text}
                    item={item}
                    openId={openMobileDropdown}
                    onToggle={toggleMobileDropdown}
                  />
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
