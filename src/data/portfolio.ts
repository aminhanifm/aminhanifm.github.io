export type LinkKind = 'play' | 'appstore' | 'itch' | 'drive' | 'github' | 'web';

export interface ProjectMedia {
  src: string;
  alt: string;
  kind?: 'image' | 'video';
  poster?: string;
}

export interface Project {
  title: string;
  year: string;
  genre: string;
  platforms: string[];
  imageUrl: string;
  link?: string;
  linkKind: LinkKind;
  linkLabel?: string;
  sourceLink?: string;
  description: string;
  role: string;
  tags: string[];
  gallery?: ProjectMedia[];
  portfolioType?: 'game' | 'app' | 'publishing';
  featured?: boolean;
  note?: string;
}

export interface Experience {
  company: string;
  title: string;
  period: string;
  location: string;
  focus: string;
  bullets: string[];
}

export const profile = {
  name: 'Amin Hanif',
  title: 'Game Developer / Unity Programmer / Technical Initiative Lead',
  location: 'New Cairo, Egypt | Remote-friendly',
  email: 'aminhanifm@gmail.com',
  github: 'https://github.com/aminhanifm',
  linkedin: 'https://www.linkedin.com/in/aminhanifm',
  resume: '/docs/Amin-Hanif-Resume.pdf',
  portfolio: '/docs/Amin-Hanif-Portfolio.pdf',
  source: 'https://github.com/aminhanifm/aminhanifm.github.io',
};

export const stats = [
  { value: '7+', label: 'Years building games and apps' },
  { value: '30+', label: 'Games, apps, and interactive projects' },
  { value: '10+', label: 'Awards and recognitions' },
  { value: '6', label: 'Android, PC, web, iOS, AR, and Wear OS' },
];

export const projects: Project[] = [
  {
    title: 'TillTally: Cash Counter',
    year: '2026',
    genre: 'Business Utility',
    platforms: ['Android'],
    imageUrl: '/images/projects/tilltally.webp',
    link: 'https://play.google.com/store/apps/details?id=com.aminhanifm.tilltally',
    linkKind: 'play',
    portfolioType: 'app',
    description:
      'An offline-first cash-drawer counter for counting denominations, reconciling expected cash, and calculating deposits.',
    role:
      'Designed and built the native Android app end to end, including exact money calculations, Room history, CSV/PDF export, backup and restore, localization, and Play Billing.',
    tags: ['Kotlin', 'Jetpack Compose', 'Room', 'Offline-first', 'PDF / CSV'],
    gallery: [
      { src: '/images/projects/gallery/tilltally-01.webp', alt: 'TillTally cash denomination counting screen' },
      { src: '/images/projects/gallery/tilltally-02.webp', alt: 'TillTally cash drawer reconciliation review' },
      { src: '/images/projects/gallery/tilltally-03.webp', alt: 'TillTally closing history and variance records' },
    ],
  },
  {
    title: 'LaterPin: Remind Me Later',
    year: '2026',
    genre: 'Productivity App',
    platforms: ['Android'],
    imageUrl: '/images/projects/laterpin.webp',
    link: 'https://play.google.com/store/apps/details?id=com.aminhanifm.laterpin',
    linkKind: 'play',
    portfolioType: 'app',
    description:
      'A privacy-focused reminder app for saving shared links and text, then resurfacing them through local notifications.',
    role:
      'Designed and built the native Android product end to end, including scheduling, local persistence, RTL localization, and Play Billing.',
    tags: ['Kotlin', 'Jetpack Compose', 'Room', 'Material 3', 'Play Billing'],
    gallery: [
      { src: '/images/projects/gallery/laterpin-01.webp', alt: 'LaterPin upcoming reminders grouped by schedule' },
      { src: '/images/projects/gallery/laterpin-02.webp', alt: 'LaterPin share capture and reminder scheduling flow' },
      { src: '/images/projects/gallery/laterpin-03.webp', alt: 'LaterPin recurring reminder configuration' },
    ],
  },
  {
    title: 'CSV Health',
    year: '2026',
    genre: 'Data Quality Tool',
    platforms: ['Web'],
    imageUrl: '/images/projects/csv-health-overview.jpg',
    link: 'https://aminhanifm.github.io/projects/csv-health/',
    linkKind: 'web',
    linkLabel: 'Live demo',
    sourceLink: 'https://github.com/aminhanifm/CSV-Health',
    portfolioType: 'app',
    description:
      'Privacy-first CSV profiling that detects missing values, duplicates, type inconsistencies, invalid dates, and unusual numerical values without uploading the file.',
    role:
      'Built the static React and strict TypeScript application, deterministic profiling pipeline, privacy-conscious exports, responsive interface, and automated quality gates.',
    tags: ['React', 'TypeScript', 'Data quality', 'Privacy', 'Open source'],
    gallery: [
      {
        src: '/images/projects/csv-health-overview.jpg',
        alt: 'CSV Health sample dataset overview with statistics and quality indicators',
      },
    ],
  },
  {
    title: 'RepoReady',
    year: '2026',
    genre: 'Developer Tool',
    platforms: ['Web'],
    imageUrl: '/images/projects/repo-ready-social.png',
    link: 'https://aminhanifm.github.io/projects/repo-ready/',
    linkKind: 'web',
    linkLabel: 'Live app',
    sourceLink: 'https://github.com/aminhanifm/RepoReady',
    portfolioType: 'app',
    description:
      'Evidence-based public repository auditing with readiness scores, scan coverage, check-level evidence, and prioritized improvements.',
    role:
      'Built the static React and strict TypeScript application, deterministic 24-rule scoring engine, resilient GitHub API collection, accessible report interface, and Markdown/JSON exports.',
    tags: ['React', 'TypeScript', 'GitHub API', 'Accessibility', 'Open source'],
    gallery: [
      {
        src: '/images/projects/repo-ready-social.png',
        alt: 'RepoReady evidence-based repository readiness report preview',
      },
    ],
  },
  {
    title: 'EnvParity',
    year: '2026',
    genre: 'Developer Tool',
    platforms: ['Web', 'CLI', 'GitHub Actions'],
    imageUrl: '/images/projects/envparity-preview.svg',
    link: 'https://aminhanifm.github.io/projects/EnvParity/',
    linkKind: 'web',
    linkLabel: 'Live demo',
    sourceLink: 'https://github.com/aminhanifm/EnvParity',
    portfolioType: 'app',
    description:
      'Static analysis for environment-variable parity across source code and .env.example, with actionable findings and machine-readable reports.',
    role:
      'Built the strict TypeScript CLI, Node 24 GitHub Action, AST-based JavaScript and TypeScript analysis, Python extraction, browser demo, and automated quality gates.',
    tags: ['TypeScript', 'CLI', 'GitHub Actions', 'Static analysis', 'Open source'],
    gallery: [
      {
        src: '/images/projects/envparity-preview.svg',
        alt: 'EnvParity environment-variable analysis report preview',
      },
    ],
  },
  {
    title: 'Arrow Flow',
    year: '2026',
    genre: 'Puzzle',
    platforms: ['Android'],
    imageUrl: '/images/projects/arrow-flow.webp',
    link: 'https://play.google.com/store/apps/details?id=com.aminhanifm.arrowflow',
    linkKind: 'play',
    description:
      'A clean one-tap puzzle game about reading blocked paths and clearing every arrow from an evolving board.',
    role:
      'Built the complete Unity release, including a guaranteed-solvable procedural generator, special tiles, scoring, ads, and Play Games leaderboard support.',
    tags: ['Unity', 'Procedural', 'Puzzle', 'AdMob', 'Play Games'],
    gallery: [
      { src: '/images/projects/gallery/arrow-flow-01.webp', alt: 'Arrow Flow board-clearing puzzle gameplay' },
      { src: '/images/projects/gallery/arrow-flow-02.webp', alt: 'Arrow Flow directional path puzzle' },
      { src: '/images/projects/gallery/arrow-flow-03.webp', alt: 'Arrow Flow special tile mechanics' },
    ],
  },
  {
    title: 'Ding!',
    year: '2026',
    genre: 'Casual Timing',
    platforms: ['Android'],
    imageUrl: '/images/projects/ding.webp',
    link: 'https://play.google.com/store/apps/details?id=com.aminhanifm.ding',
    linkKind: 'play',
    description:
      'A portrait one-tap elevator timing game where precise stops build combos while misses cost hearts.',
    role:
      'Designed and built the full Unity game, including deterministic stop evaluation, progression, feedback, ads, and leaderboard integration.',
    tags: ['Unity', 'Casual', 'Game Feel', 'AdMob', 'Play Games'],
    gallery: [
      { src: '/images/projects/gallery/ding-01.webp', alt: 'Ding one-tap elevator timing gameplay' },
      { src: '/images/projects/gallery/ding-02.webp', alt: 'Ding perfect stop result and scoring' },
      { src: '/images/projects/gallery/ding-03.webp', alt: 'Ding combo and progression gameplay' },
    ],
  },
  {
    title: 'Block Garden',
    year: '2026',
    genre: 'Cozy Puzzle',
    platforms: ['Android'],
    imageUrl: '/images/projects/block-garden.webp',
    link: 'https://play.google.com/store/apps/details?id=com.aminhanifm.blockgarden',
    linkKind: 'play',
    description:
      'A calm portrait block-placement puzzle with row and column clearing, combos, and a cozy garden presentation.',
    role:
      'Built and published the complete Unity game, including drag-and-drop play, scoring, generated visuals, ads, and Play Games leaderboards.',
    tags: ['Unity', 'Puzzle', 'Mobile UI', 'AdMob', 'Play Games'],
    gallery: [
      { src: '/images/projects/gallery/block-garden-01.webp', alt: 'Block Garden cozy block puzzle board' },
      { src: '/images/projects/gallery/block-garden-02.webp', alt: 'Block Garden row and column clearing' },
      { src: '/images/projects/gallery/block-garden-03.webp', alt: 'Block Garden combo scoring' },
    ],
  },
  {
    title: 'Watch Fidget',
    year: '2026',
    genre: 'Publishing Support',
    platforms: ['Wear OS'],
    imageUrl: '/images/projects/watch-fidget.webp',
    link: 'https://play.google.com/store/apps/details?id=com.sherensaber.watchfidget',
    linkKind: 'play',
    portfolioType: 'publishing',
    description:
      'A smartwatch collection of tactile mini fidgets for quick, playful Wear OS interactions.',
    role:
      'Managed Google Play release preparation and publication for the project.',
    tags: ['Google Play', 'Wear OS', 'Release', 'Publishing'],
    note: 'Included specifically for my Google Play publishing contribution.',
    gallery: [
      { src: '/images/projects/gallery/watch-fidget-01.webp', alt: 'Watch Fidget spinner interaction on Wear OS' },
      { src: '/images/projects/gallery/watch-fidget-02.webp', alt: 'Watch Fidget pop-it interaction on Wear OS' },
      { src: '/images/projects/gallery/watch-fidget-03.webp', alt: 'Watch Fidget slime interaction on Wear OS' },
    ],
  },
  {
    title: 'Heisters',
    year: '2022',
    genre: 'Tactical Shooter',
    platforms: ['Android'],
    imageUrl: '/images/projects/heisters.webp',
    link: 'https://play.google.com/store/apps/details?id=com.uniXcorp.Heisters',
    linkKind: 'play',
    featured: true,
    description:
      'A squad-based heist shooter about raiding rival bases, collecting loot, and building a stronger crew.',
    role:
      'Built core gameplay and third-party services, then managed delivery across programming, art, and design tasks.',
    tags: ['Unity', 'Gameplay', 'IAP', 'Analytics'],
    gallery: [
      { src: '/images/projects/gallery/heisters-01.webp', alt: 'Heisters combat gameplay during a base raid' },
      { src: '/images/projects/gallery/heisters-02.webp', alt: 'Heisters enemy selection screen before a raid' },
      { src: '/images/projects/gallery/heisters-03.webp', alt: 'Heisters crew and weapon management screen' },
    ],
  },
  {
    title: 'Ojol Life: Food Delivery Game',
    year: '2025',
    genre: 'Life Simulation',
    platforms: ['Android'],
    imageUrl: '/images/projects/ojol-life-food-delivery-game.webp',
    link: 'https://play.google.com/store/apps/details?id=com.maleo.ojollife',
    linkKind: 'play',
    featured: true,
    description:
      'A city-life delivery simulation with quests, traffic, pedestrians, fuel, stamina, and rider progression.',
    role:
      'Developed main gameplay systems including orders, customization, fuel, stamina, and the first game design.',
    tags: ['Unity', 'Simulation', 'Systems', 'Mobile'],
    gallery: [
      { src: '/images/projects/gallery/ojol-life-01.webp', alt: 'Ojol Life riders exploring the city together' },
      { src: '/images/projects/gallery/ojol-life-02.webp', alt: 'Ojol Life passenger interaction and city traffic gameplay' },
      { src: '/images/projects/gallery/ojol-life-03.webp', alt: 'Ojol Life delivery and vehicle variety' },
    ],
  },
  {
    title: 'Dragon Ranch',
    year: '2023',
    genre: 'Farming Simulation',
    platforms: ['Android'],
    imageUrl:
      '/images/projects/dragon-ranch.webp',
    link: 'https://play.google.com/store/apps/details?id=com.unixcorp.dragonranch',
    linkKind: 'play',
    featured: true,
    description:
      'A relaxed dragon ranch game about raising dragons, growing crops, expanding the farm, and breeding species.',
    role:
      'Created core gameplay and third-party services while managing tasks for the small team.',
    tags: ['Unity', 'Management', 'Ads', 'IAP'],
    gallery: [
      { src: '/images/projects/gallery/dragon-ranch-01.webp', alt: 'Dragon Ranch farm overview and character progression' },
      { src: '/images/projects/gallery/dragon-ranch-02.webp', alt: 'Dragon Ranch crop fields and dragon collection objective' },
      { src: '/images/projects/gallery/dragon-ranch-03.webp', alt: 'Dragon Ranch crop building and dragon care gameplay' },
    ],
  },
  {
    title: 'Animal Chase',
    year: '2023',
    genre: 'Hyper Casual',
    platforms: ['Android'],
    imageUrl: '/images/projects/animal-chase.webp',
    link: 'https://play.google.com/store/apps/details?id=com.unixcorp.animalchase',
    linkKind: 'play',
    description:
      'A compact forest chase game about avoiding hunters and traps while collecting coins to unlock animal skins.',
    role: 'Created level design, core gameplay, analytics, ads, and in-app purchase systems.',
    tags: ['Unity', 'Casual', 'Mobile', 'Ads', 'IAP'],
  },
  {
    title: 'Catmelon: Kitty Merge Fever',
    year: '2024',
    genre: 'Casual Puzzle',
    platforms: ['Android'],
    imageUrl: '/images/projects/catmelon-kitty-merge-fever.webp',
    link: 'https://drive.google.com/file/d/153Zfy7d8Ltkg2QTY1tBVhmjJkbO0VHes/view?usp=drive_link',
    linkKind: 'drive',
    featured: true,
    description:
      'A cute merge puzzle inspired by Suika-style play, using cat-themed fruits and escalating score pressure.',
    role: 'Handled most development work, especially programming and gameplay mechanics.',
    tags: ['Unity', 'Puzzle', 'Casual', 'Mobile'],
    gallery: [
      { src: '/images/projects/gallery/catmelon-01.webp', alt: 'Catmelon home screen with the cat collection artwork' },
      { src: '/images/projects/gallery/catmelon-02.webp', alt: 'Catmelon merge board at the start of a game' },
      { src: '/images/projects/gallery/catmelon-03.webp', alt: 'Catmelon active merge puzzle with several cats in the container' },
    ],
  },
  {
    title: 'Taxland',
    year: '2024',
    genre: 'Educational Simulation',
    platforms: ['Web'],
    imageUrl: '/images/projects/taxland.webp',
    link: 'https://drive.google.com/file/d/1ySA0Bt6hdgTqGVZXnn4VMBDXJfqzMsut/view?usp=sharing',
    linkKind: 'drive',
    description:
      'A 3D tax education simulation where players explore quests and interact with NPCs to learn tax concepts.',
    role: 'Owned dialogue design, programming, gameplay systems, and final implementation flow.',
    tags: ['Unity', '3D', 'Education', 'Dialogue'],
  },
  {
    title: 'Krispy Kreme AR Game',
    year: '2023',
    genre: 'Augmented Reality',
    platforms: ['Mobile', 'PC'],
    imageUrl: '/images/projects/krispy-kreme-ar-game.webp',
    link: 'https://drive.google.com/file/d/1SQ7MBLer7ONgzqdSg1ai3xg4kafvAWE2/view?usp=drive_link',
    linkKind: 'drive',
    description:
      'An AR obstacle-avoidance game where players use the front camera and head tilt to control a donut.',
    role: 'Handled game design, programming, controls, and gameplay mechanics.',
    tags: ['Unity', 'AR', 'Camera', 'Prototype'],
  },
  {
    title: 'Swoosh Ball',
    year: '2023',
    genre: 'Arcade Sports',
    platforms: ['iOS', 'Android'],
    imageUrl:
      '/images/projects/swoosh-ball.webp',
    link: 'https://drive.google.com/file/d/12AnUnk0E0sVkpy_pYqXzGmHfvsIBmDna/view?usp=sharing',
    linkKind: 'drive',
    description:
      'A 3D basketball arcade game with difficulty modes, swipe controls, wind physics, and special balls.',
    role: 'Handled game design, programming, tuning, and gameplay mechanics.',
    tags: ['Unity', 'iOS', 'Android', 'Physics', 'Arcade'],
    note: 'Formerly released on iOS; an archived Android build is available for download.',
    gallery: [
      { src: '/images/projects/gallery/swoosh-ball-01.webp', alt: 'Swoosh Ball home screen on the outdoor basketball court' },
      { src: '/images/projects/gallery/swoosh-ball-02.webp', alt: 'Swoosh Ball avatar customization screen' },
      { src: '/images/projects/gallery/swoosh-ball-03.webp', alt: 'Swoosh Ball swipe-shot gameplay at the hoop' },
    ],
  },
  {
    title: 'Jump and Boom',
    year: '2023',
    genre: '3D Platformer',
    platforms: ['iOS', 'Android'],
    imageUrl:
      '/images/projects/jump-and-boom.webp',
    link: 'https://drive.google.com/file/d/1DR0jqRqbr_dOK1pPK2cLE3FvOR0jxp6l/view?usp=sharing',
    linkKind: 'drive',
    description:
      'A vertical platformer with difficulty modes, power-ups, moving platforms, and obstacle pressure.',
    role: 'Handled all core development including gameplay mechanics, tuning, and game design.',
    tags: ['Unity', '3D', 'Platformer', 'iOS', 'Android'],
    note: 'Formerly released on iOS; an archived Android build is available for download.',
    gallery: [
      { src: '/images/projects/gallery/jump-and-boom-01.webp', alt: 'Jump and Boom game setup with difficulty and environment options' },
      { src: '/images/projects/gallery/jump-and-boom-02.webp', alt: 'Jump and Boom avatar customization screen' },
      { src: '/images/projects/gallery/jump-and-boom-03.webp', alt: 'Jump and Boom third-person gameplay in the space arena' },
    ],
  },
  {
    title: 'Puzzling Polygons',
    year: '2023',
    genre: 'Puzzle',
    platforms: ['iOS', 'Android'],
    imageUrl:
      '/images/projects/puzzling-polygons.webp',
    link: 'https://drive.google.com/file/d/1Vjyy7mIxhzJdPkYG9VLj4i46iWQ6dnT7/view?usp=sharing',
    linkKind: 'drive',
    description:
      'A hexagon-based puzzle game with timed challenges, global leaderboard competition, and compact levels.',
    role: 'Handled full development across programming, design, and puzzle mechanics.',
    tags: ['Unity', 'Puzzle', 'Leaderboard', 'iOS', 'Android'],
    note: 'Formerly released on iOS; an archived Android build is available for download.',
    gallery: [
      { src: '/images/projects/gallery/puzzling-polygons-01.webp', alt: 'Puzzling Polygons title and player profile screen' },
      { src: '/images/projects/gallery/puzzling-polygons-02.webp', alt: 'Puzzling Polygons beginner level selection grid' },
      { src: '/images/projects/gallery/puzzling-polygons-03.webp', alt: 'Puzzling Polygons timed hexagon puzzle gameplay' },
    ],
  },
  {
    title: 'Downtown Rush',
    year: '2024',
    genre: 'Casual Runner',
    platforms: ['Android'],
    imageUrl: '/images/projects/downtown-rush.webp',
    link: 'https://drive.google.com/file/d/1urNKIZpdSL-N0IwHgRUDV0RcRLXKxPBW/view?usp=sharing',
    linkKind: 'drive',
    description:
      'An endless city runner with character cosmetics, collectible coins, power-ups, and obstacle timing.',
    role: 'Handled design, programming, gameplay mechanics, and implementation polish.',
    tags: ['Unity', 'Runner', 'Mobile', 'Casual'],
    gallery: [
      { src: '/images/projects/gallery/downtown-rush-01.webp', alt: 'Downtown Rush home screen on a city street' },
      { src: '/images/projects/gallery/downtown-rush-02.webp', alt: 'Downtown Rush character running along the center lane' },
      { src: '/images/projects/gallery/downtown-rush-03.webp', alt: 'Downtown Rush score screen with city obstacles in view' },
    ],
  },
  {
    title: 'Collecto Frenzy 3D',
    year: '2024',
    genre: 'Casual 3D',
    platforms: ['Android'],
    imageUrl: '/images/projects/collecto-frenzy-3d.webp',
    link: 'https://drive.google.com/file/d/1uwHRye2zn1skRkvnuB63mj4IHYvobxzN/view?usp=drive_link',
    linkKind: 'drive',
    featured: true,
    description:
      'A 3D object-matching game where players rotate the board, collect sets, and manage limited tray space.',
    role: 'Handled game design, programming, and gameplay mechanics from prototype through delivery.',
    tags: ['Unity', '3D', 'Casual', 'Systems'],
    gallery: [
      { src: '/images/projects/gallery/collecto-frenzy-3d-01.webp', alt: 'Collecto Frenzy 3D home screen' },
      { src: '/images/projects/gallery/collecto-frenzy-3d-02.webp', alt: 'Collecto Frenzy 3D level with target objects and power-ups' },
      { src: '/images/projects/gallery/collecto-frenzy-3d-03.webp', alt: 'Collecto Frenzy 3D level result screen' },
    ],
  },
  {
    title: 'Brickball Mania',
    year: '2024',
    genre: 'Casual Arcade',
    platforms: ['Android'],
    imageUrl: '/images/projects/brickball-mania.webp',
    link: 'https://drive.google.com/file/d/1S4ZOBXIomyNhVQOpoFm5W4yPCZiFJdeF/view?usp=sharing',
    linkKind: 'drive',
    description:
      'A compact arcade game focused on collecting balls, clearing levels, and handling escalating obstacle patterns.',
    role: 'Handled all aspects of development, including gameplay design, programming, and mechanics.',
    tags: ['Unity', 'Arcade', 'Mobile', 'Casual'],
    gallery: [
      { src: '/images/projects/gallery/brickball-mania-01.webp', alt: 'Brickball Mania illustrated level map' },
      { src: '/images/projects/gallery/brickball-mania-02.webp', alt: 'Brickball Mania level one block layout' },
      { src: '/images/projects/gallery/brickball-mania-03.webp', alt: 'Brickball Mania balls ricocheting between numbered blocks' },
    ],
  },
  {
    title: 'Goya Universe',
    year: '2023',
    genre: 'Web3 Virtual World',
    platforms: ['Web'],
    imageUrl: '/images/projects/goya-universe.webp',
    link: 'https://drive.google.com/file/d/1QaVAEBM0Lh84UhaIfu1FDI5vGrKkkuRG/view?usp=drive_link',
    linkKind: 'drive',
    featured: true,
    description:
      'A discontinued Web3 virtual world prototype with characters, places, events, and multiplayer interaction.',
    role: 'Handled most core gameplay work and Photon synchronization.',
    tags: ['Unity', 'Photon', 'Web3', 'Prototype'],
    note: 'Discontinued project.',
  },
  {
    title: 'KFC AR Game',
    year: '2023',
    genre: 'Augmented Reality',
    platforms: ['Mobile', 'PC'],
    imageUrl: '/images/projects/kfc-ar-game.webp',
    link: 'https://drive.google.com/file/d/1l4veG-OZHedKNyJSdiLnZlvUmr1-Bgy5/view?usp=sharing',
    linkKind: 'drive',
    description:
      'An AR brand game where players scan a logo and collect falling virtual chicken into a bucket.',
    role: 'Handled game design, programming, AR flow, and gameplay mechanics.',
    tags: ['Unity', 'AR', 'Brand', 'Prototype'],
  },
  {
    title: 'Furniture AR',
    year: '2023',
    genre: 'AR Utility',
    platforms: ['Mobile'],
    imageUrl: '/images/projects/furniture-ar.webp',
    link: 'https://drive.google.com/file/d/1kIDeO71JEw7gvmI9KHu0GCjX1aUBHuD3/view?usp=sharing',
    linkKind: 'drive',
    portfolioType: 'app',
    description:
      'An AR app for placing, rotating, and scaling virtual furniture in real-world spaces.',
    role: 'Handled development and interaction implementation.',
    tags: ['Unity', 'AR', 'Utility', 'Mobile'],
  },
  {
    title: 'TaxSim',
    year: '2021',
    genre: 'Educational Simulation',
    platforms: ['PC', 'Web'],
    imageUrl: '/images/projects/taxsim.webp',
    link: 'https://amin-hanif.itch.io/taxsim',
    linkKind: 'itch',
    description:
      'A pixel-art tax education game that teaches Indonesian tax concepts through simulation and mini games.',
    role: 'Created game design, art, story, core gameplay, and dialogue database.',
    tags: ['Education', 'Pixel Art', 'Simulation', 'Award'],
    gallery: [
      {
        src: '/videos/projects/taxsim-gameplay.mp4',
        poster: '/videos/projects/taxsim-gameplay.jpg',
        kind: 'video',
        alt: 'TaxSim animated gameplay showing the tax office simulation',
      },
      { src: '/images/projects/gallery/taxsim-01.webp', alt: 'TaxSim dialogue with a visitor at the tax service counter' },
      { src: '/images/projects/gallery/taxsim-02.webp', alt: 'TaxSim word-arrangement learning mini game' },
      { src: '/images/projects/gallery/taxsim-03.webp', alt: 'TaxSim tax payment completion at the service desk' },
    ],
  },
  {
    title: 'Javanese Cuisine',
    year: '2021',
    genre: 'Cultural Simulation',
    platforms: ['PC'],
    imageUrl: '/images/projects/javanese-cuisine.webp',
    link: 'https://drive.google.com/file/d/1KjzrO6ocj1siLeuNpgQLRMburaqBmjfZ/view?usp=share_link',
    linkKind: 'drive',
    description:
      'A cultural management game about running a Javanese food stall, managing ingredients, and paying rent within 30 days.',
    role: 'Created the game design, storyline, economy loop, and core gameplay.',
    tags: ['Simulation', 'Culture', 'Economy', 'Management'],
    gallery: [
      {
        src: '/videos/projects/javanese-cuisine-gameplay.mp4',
        poster: '/videos/projects/javanese-cuisine-gameplay.jpg',
        kind: 'video',
        alt: 'Javanese Cuisine animated food-stall management gameplay',
      },
    ],
  },
  {
    title: 'Kompleks Lalu Lintas',
    year: '2021',
    genre: 'Educational Simulation',
    platforms: ['Android', 'PC'],
    imageUrl: '/images/projects/kompleks-lalu-lintas.webp',
    link: 'https://drive.google.com/drive/folders/1AMHhhM1Q3oBhgp78PJohZQLzJc7wIAPO?usp=share_link',
    linkKind: 'drive',
    description:
      'A traffic-rule learning simulation that combines guided exploration with puzzles, trivia, and educational mini games.',
    role: 'Created game design, art, story, core gameplay, and the dialogue database.',
    tags: ['Simulation', 'Education', 'Traffic', 'Mini Games'],
    gallery: [
      {
        src: '/videos/projects/kompleks-lalu-lintas-gameplay.mp4',
        poster: '/videos/projects/kompleks-lalu-lintas-gameplay.jpg',
        kind: 'video',
        alt: 'Kompleks Lalu Lintas animated exploration and traffic education gameplay',
      },
    ],
  },
  {
    title: 'Adventure of Hanacaraka',
    year: '2021',
    genre: 'Adventure RPG',
    platforms: ['PC', 'Web'],
    imageUrl: '/images/projects/adventure-of-hanacaraka.webp',
    link: 'https://amin-hanif.itch.io/aoh',
    linkKind: 'itch',
    description:
      'A cultural adventure RPG about controlling two characters, solving puzzles, and collecting Hanacaraka letters.',
    role: 'Created level design, story, art, UI/UX, and core gameplay.',
    tags: ['RPG', 'Culture', 'Puzzle', 'Award'],
    gallery: [
      {
        src: '/videos/projects/adventure-of-hanacaraka-gameplay.mp4',
        poster: '/videos/projects/adventure-of-hanacaraka-gameplay.jpg',
        kind: 'video',
        alt: 'Adventure of Hanacaraka animated combat gameplay',
      },
      { src: '/images/projects/gallery/adventure-of-hanacaraka-01.webp', alt: 'Adventure of Hanacaraka title screen' },
      { src: '/images/projects/gallery/adventure-of-hanacaraka-02.webp', alt: 'Hanacaraka letter-learning interface and character attributes' },
      { src: '/images/projects/gallery/adventure-of-hanacaraka-03.webp', alt: 'Adventure of Hanacaraka world map and character preparation screen' },
    ],
  },
  {
    title: 'Yudi si Anak Magang Housekeeping',
    year: '2022',
    genre: 'Simulation',
    platforms: ['PC'],
    imageUrl: '/images/projects/yudi-si-anak-magang-housekeeping.webp',
    link: 'https://drive.google.com/file/d/1d1KUP7KZ8Qd6PSE8ExllBzg7LhZ3IUEn/view?usp=share_link',
    linkKind: 'drive',
    description:
      'An interactive hotel housekeeping internship simulation built around guided narrative tasks.',
    role: 'Created game design, art, story, gameplay, and dialogue database.',
    tags: ['Simulation', 'Education', 'Narrative', 'Award'],
    gallery: [
      { src: '/images/projects/gallery/yudi-housekeeping-01.webp', alt: 'Yudi si Anak Magang Housekeeping title screen' },
      { src: '/images/projects/gallery/yudi-housekeeping-02.webp', alt: 'Hotel housekeeping tutorial dialogue with the manager' },
      { src: '/images/projects/gallery/yudi-housekeeping-03.webp', alt: 'Yudi navigating the hotel during a Day 2 housekeeping objective' },
    ],
  },
  {
    title: 'Sleep Gravity',
    year: '2022',
    genre: 'Multiplayer Platformer',
    platforms: ['Android', 'PC', 'Web'],
    imageUrl: '/images/projects/sleep-gravity.webp',
    link: 'https://unixcorp.itch.io/sleep-gravity',
    linkKind: 'itch',
    description:
      'A multiplayer side-scroller where players race toward dreams while disrupting opponents with card actions.',
    role: 'Created game design, art, core gameplay, and Photon networking.',
    tags: ['Multiplayer', 'Photon', 'Platformer', 'Cards'],
    gallery: [
      { src: '/images/projects/gallery/sleep-gravity-01.webp', alt: 'Sleep Gravity card selection screen' },
      { src: '/images/projects/gallery/sleep-gravity-02.webp', alt: 'Sleep Gravity match setup and map selection screen' },
      { src: '/images/projects/gallery/sleep-gravity-03.webp', alt: 'Sleep Gravity side-scrolling multiplayer gameplay' },
    ],
  },
  {
    title: 'Life of a Dropshipper',
    year: '2020',
    genre: 'Simulation',
    platforms: ['PC'],
    imageUrl: '/images/projects/life-of-a-dropshipper.webp',
    link: 'https://drive.google.com/drive/folders/1dbIn3c8PiSNC_FVIzIU-zGDvRcEW0z38?usp=sharing',
    linkKind: 'drive',
    description:
      'A business simulation about managing orders, income, upgrades, and day-to-day dropshipping pressure.',
    role: 'Created game design, core gameplay, and item database systems.',
    tags: ['Simulation', 'JavaScript', 'Python', 'Award'],
    gallery: [
      {
        src: '/videos/projects/life-of-a-dropshipper-gameplay.mp4',
        poster: '/videos/projects/life-of-a-dropshipper-gameplay.jpg',
        kind: 'video',
        alt: 'Life of a Dropshipper animated business simulation gameplay',
      },
    ],
  },
  {
    title: 'Mysticalipse Dungeon',
    year: '2020',
    genre: 'Roguelite',
    platforms: ['Android', 'PC'],
    imageUrl: '/images/projects/mysticalipse-dungeon.webp',
    link: 'https://drive.google.com/drive/folders/1XDNVrY3BjNq0WMhC1UcTEqSd3ARiN7aV?usp=share_link',
    linkKind: 'drive',
    description:
      'A dungeon adventure about collecting Mystic Crystals, fighting monsters, looting, and solving stage puzzles.',
    role: 'Created game and level design, gameplay systems, and item databases.',
    tags: ['Roguelite', 'Dungeon', 'Puzzle', 'Award'],
    gallery: [
      {
        src: '/videos/projects/mysticalipse-dungeon-gameplay.mp4',
        poster: '/videos/projects/mysticalipse-dungeon-gameplay.jpg',
        kind: 'video',
        alt: 'Mysticalipse Dungeon animated boss combat gameplay',
      },
    ],
  },
  {
    title: 'Isolated Forest',
    year: '2020',
    genre: 'Survival Horror',
    platforms: ['PC', 'Web'],
    imageUrl: '/images/projects/isolated-forest.webp',
    link: 'https://amin-hanif.itch.io/isolated-forest',
    linkKind: 'itch',
    description:
      'A survival game with gathering, crafting, farming, and night danger in a haunted forest setting.',
    role: 'Created game design, core gameplay, item systems, and crafting database.',
    tags: ['Survival', 'Crafting', 'Horror', 'Award'],
    gallery: [
      {
        src: '/videos/projects/isolated-forest-gameplay.mp4',
        poster: '/videos/projects/isolated-forest-gameplay.jpg',
        kind: 'video',
        alt: 'Isolated Forest animated crafting and survival gameplay',
      },
      { src: '/images/projects/gallery/isolated-forest-01.webp', alt: 'Isolated Forest top-down exploration with the survival HUD' },
    ],
  },
  {
    title: 'Tag Runner',
    year: '2020',
    genre: 'Multiplayer Platformer',
    platforms: ['Android', 'PC', 'Web'],
    imageUrl: '/images/projects/tag-runner.webp',
    link: 'https://play.google.com/store/apps/details?id=com.unixcorp.tagrunner',
    linkKind: 'play',
    description:
      'A multiplayer platformer where players chase, escape, collect power-ups, and compete across compact arenas.',
    role: 'Created design, gameplay, and Photon multiplayer backend services.',
    tags: ['Multiplayer', 'Photon', 'Platformer', 'Mobile'],
    note: 'Legacy Play Store link restored; APK update pending if the listing is unavailable.',
    gallery: [
      { src: '/images/projects/gallery/tag-runner-01.webp', alt: 'Tag Runner multiplayer lobby' },
      { src: '/images/projects/gallery/tag-runner-02.webp', alt: 'Tag Runner matchmaking and room settings' },
      { src: '/images/projects/gallery/tag-runner-03.webp', alt: 'Tag Runner platforming arena with mobile controls' },
    ],
  },
  {
    title: 'The Covid Hero',
    year: '2020',
    genre: 'Educational Casual',
    platforms: ['PC', 'Web'],
    imageUrl: '/images/projects/the-covid-hero.webp',
    link: 'https://amin-hanif.itch.io/the-covid-hero',
    linkKind: 'itch',
    description:
      'A one-hand casual game made as entertainment and education during the coronavirus outbreak.',
    role: 'Created design, art, gameplay, and Firebase leaderboard services.',
    tags: ['Education', 'Casual', 'Firebase', 'Web'],
    gallery: [
      {
        src: '/videos/projects/the-covid-hero-gameplay.mp4',
        poster: '/videos/projects/the-covid-hero-gameplay.jpg',
        kind: 'video',
        alt: 'The Covid Hero animated one-touch mobile gameplay',
      },
      { src: '/images/projects/gallery/the-covid-hero-01.webp', alt: 'The Covid Hero title screen in a mobile phone frame' },
      { src: '/images/projects/gallery/the-covid-hero-02.webp', alt: 'The Covid Hero one-touch gameplay screen' },
      { src: '/images/projects/gallery/the-covid-hero-03.webp', alt: 'The Covid Hero leaderboard screen' },
    ],
  },
  {
    title: 'Hide N Seek Nusantara',
    year: '2018',
    genre: 'Cultural Simulation',
    platforms: ['Android'],
    imageUrl: '/images/projects/hide-n-seek-nusantara.webp',
    link: 'https://play.google.com/store/apps/details?id=com.unixcorp.hidenseeknusantara',
    linkKind: 'play',
    description:
      'A hide-and-seek game set in Indonesian landmarks with coins, perks, and timed crate drops.',
    role: 'Created design, art, core gameplay, IAP, Firebase, and Facebook SDK integration.',
    tags: ['Culture', 'Mobile', 'Firebase', 'Award'],
    note: 'Legacy Play Store link restored; APK update pending if the listing is unavailable.',
    gallery: [
      {
        src: '/videos/projects/hide-n-seek-nusantara-gameplay.mp4',
        poster: '/videos/projects/hide-n-seek-nusantara-gameplay.jpg',
        kind: 'video',
        alt: 'Hide N Seek Nusantara animated gameplay at Museum Angkut',
      },
    ],
  },
];

export const experiences: Experience[] = [
  {
    company: 'Freemotion Studio',
    title: 'Initiative Lead / Contract Game Programmer',
    period: 'Mar 2026 - Present',
    location: 'Remote, United States',
    focus: 'Confidential game project under company privacy policy',
    bullets: [
      'Lead technical initiatives through RFC-style documents that clarify architecture direction, scope, validation, and decisions.',
      'Review GitHub issues, pull requests, and task deliverables to keep implementation aligned with approved goals.',
      'Contributed hands-on programming during the early project phase before shifting into leadership, review, and planning.',
    ],
  },
  {
    company: 'CV Maleo Media Kreatif',
    title: 'Programmer',
    period: 'Jan 2024 - Present',
    location: 'Remote, Indonesia',
    focus: 'Mobile and simulation game development',
    bullets: [
      'Developed Catmelon systems, ad integration, optimization, and QA support for a shipped mobile puzzle game.',
      'Contributed to Ojol Life from early development through launch, supporting core systems that helped it reach Top 3 Free Games on Google Play.',
      'Worked with programmers and artists to refine gameplay flow, mobile performance, and release polish.',
    ],
  },
  {
    company: 'uniXcorp',
    title: 'Founder & Lead Programmer',
    period: 'Jan 2019 - Mar 2026',
    location: 'Remote, Indonesia',
    focus: 'Indie game leadership and award-winning projects',
    bullets: [
      'Led a small indie team across game programming, design, release, updates, and cross-discipline collaboration.',
      'Created games recognized for technical innovation, storytelling, audio, and cultural education.',
    ],
  },
  {
    company: 'Impact Plus Technologies Pte Ltd',
    title: 'Programmer',
    period: 'Aug 2023 - Dec 2023',
    location: 'Remote, Singapore',
    focus: 'Web3, AR, and casual mobile games',
    bullets: [
      'Built stakeholder-driven Web3, AR, and mobile game features across Android and iOS.',
      'Focused on gameplay mechanics, optimization, and cross-platform compatibility.',
    ],
  },
  {
    company: 'Web3re Technologies Pte Ltd',
    title: 'Programmer',
    period: 'Apr 2023 - Aug 2023',
    location: 'Remote, Singapore',
    focus: 'Virtual world systems and multiplayer synchronization',
    bullets: [
      'Helped design virtual-world mechanics including pedestrians, traffic, NPC behavior, and Photon synchronization.',
      'Integrated assets with artists and optimized stakeholder builds.',
    ],
  },
  {
    company: 'Indigo Game Startup Incubation',
    title: 'Project Manager & Programmer',
    period: 'Jul 2022 - Dec 2022',
    location: 'Bandung, Indonesia',
    focus: 'Heisters production leadership',
    bullets: [
      'Managed a small game team and delivered Heisters within six months while also contributing as programmer.',
      'Coordinated design, art, programming, and delivery milestones.',
    ],
  },
];

export const awards = [
  'Grand Finalist - Dragon Ranch, Gameseed Competition 2023',
  '2nd Place - Yudi si Anak Magang Housekeeping, SKKNI Game Development Competition 2022',
  '3rd Place - TaxSim, Tax Education Game Development 2021',
  'Featured - Adventure of Hanacaraka, Baparekraf Game Prime 2021',
  '3rd Place - Adventure of Hanacaraka, International Game Development Competition 2021',
  '1st Place - Life of a Dropshipper, HOLOGY 3.0 2020',
  'Best Audio - Isolated Forest, Indie Game Ignite COMPFEST 12',
  '2nd Place - Mysticalipse Dungeon, Multimedia Game Development and Game Event 6 2020',
  '2nd Place - Hide N Seek Nusantara, Informatics Champions Game Development Competition 2019',
  'Finalist - Tag Runner, DIGIFEST Game Development Competition 2019',
  'Finalist - Hide N Seek Nusantara, FIND IT Game Development Competition 2018',
  'Finalist - Find The Corruptor, IT Fest Game Development Competition 2018',
  '2nd Place - Cisewu & Timun Mas, SEAMEO School Network Game Development Online Training 2017',
  '3rd Place - Pangeran Diponegoro, GEMAS Digital Game Competition 2016',
];
