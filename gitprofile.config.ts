// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'aminhanifm', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'manual', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 0, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'My Portfolio',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {
          title: 'Catmelon: Kitty Merge Fever',
          description:
            'A delightful watermelon-themed merge puzzle game where you strategically drop and combine adorable cat-themed fruits to create larger ones. Merge similar fruits together, aim for high scores, and challenge yourself to create the biggest melon possible while managing your space carefully. A cute and addictive take on the viral Suika game phenomenon!',
          imageUrl: 'https://i.imgur.com/SEu2SyF.png',
          link: 'https://drive.google.com/file/d/153Zfy7d8Ltkg2QTY1tBVhmjJkbO0VHes/view?usp=drive_link',
          platform: ['android'],
          youtubeLink: '',
        },
        {
          title: 'Brickball-Mania',
          description:
            'Brickball Mania, collect balls, and conquer epic levels in Brickball Mania! Master the art of smashing with diverse balls and face thrilling obstacles.',
          imageUrl: 'https://i.imgur.com/m0L5Uv4.png',
          link: 'https://drive.google.com/file/d/1S4ZOBXIomyNhVQOpoFm5W4yPCZiFJdeF/view?usp=sharing',
          platform: ['android'],
          youtubeLink: '',
        },
        {
          title: 'Collecto Frenzy 3D',
          description:
            'Dive into the ultimate collecting frenzy with "Collecto Frenzy 3D"! Challenge your reflexes and precision in this fun and engaging 3D game.',
          imageUrl: 'https://i.imgur.com/PPU9qlU.png',
          link: 'https://drive.google.com/file/d/1uwHRye2zn1skRkvnuB63mj4IHYvobxzN/view?usp=drive_link',
          platform: ['android'],
          youtubeLink: '',
        },
        {
          title: 'Downtown Rush',
          description:
            'Join our lovable cast of characters as they journey through the bustling streets of the city! Dash, leap, and slide your way through vibrant neighborhoods, dodging obstacles and collecting coins to unlock adorable cosmetics. Explore quirky landmarks and encounter mischievous challenges as you run endlessly through the cityscape.',
          imageUrl: 'https://i.imgur.com/79ebEci.png',
          link: 'https://drive.google.com/file/d/1urNKIZpdSL-N0IwHgRUDV0RcRLXKxPBW/view?usp=sharing',
          platform: ['android'],
          youtubeLink: '',
        },
        {
          title: 'Taxland',
          description:
            'Taxland is a 3D simulation game that allows players to experience the world of taxation in a fun and engaging way. Player can learn about tax regulations, finish tax-related tasks, and explore a vibrant virtual world filled with challenges.',
          imageUrl: 'https://i.imgur.com/Wj5aBqy.png',
          link: 'https://drive.google.com/file/d/1ySA0Bt6hdgTqGVZXnn4VMBDXJfqzMsut/view?usp=sharing',
          platform: ['web'],
          youtubeLink: '',
        },
        {
          title: 'Goya Universe (Discontinued)',
          description:
            'A web3-based game that allows players to explore and interact with a virtual universe filled with unique characters and places. Players can collect and trade digital assets, participate in events, and engage with other players in a decentralized environment.',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyvfOf2HOenWsox8hAjRIUgsE5MZmUVXnrsQ&s',
          link: 'https://drive.google.com/file/d/1QaVAEBM0Lh84UhaIfu1FDI5vGrKkkuRG/view?usp=drive_link',
          platform: ['web'],
          youtubeLink: '',
        },
        {
          title: 'Krispy Kreme AR Game',
          description:
            'An augmented reality game that allows players to experience the thrill of avoiding obstacles in their real-world  environment.',
          imageUrl: 'https://cdn-icons-png.freepik.com/512/5969/5969346.png',
          link: 'https://drive.google.com/file/d/1SQ7MBLer7ONgzqdSg1ai3xg4kafvAWE2/view?usp=drive_link',
          platform: ['android', 'web'],
          youtubeLink: '',
        },
        {
          title: 'Furniture AR',
          description:
            'An augmented reality application that allows users to visualize and interact with virtual furniture in their real-world environment. Users can place, rotate, and scale furniture items to see how they fit into their space before making a purchase.',
          imageUrl: 'https://cdn-icons-png.freepik.com/512/5969/5969346.png',
          link: 'https://drive.google.com/file/d/1kIDeO71JEw7gvmI9KHu0GCjX1aUBHuD3/view?usp=sharing',
          platform: ['android', 'web'],
          youtubeLink: '',
        },
        {
          title: 'KFC AR Game',
          description:
            'An augmented reality game that allows players to experience the thrill of collecting virtual chicken and placing it into a KFC bucket in their real-world environment. Using their mobile devices, players can explore their surroundings and retrieve fallen chicken.',
          imageUrl: 'https://cdn-icons-png.freepik.com/512/5969/5969346.png',
          link: 'https://drive.google.com/file/d/1l4veG-OZHedKNyJSdiLnZlvUmr1-Bgy5/view?usp=sharing',
          platform: ['android', 'web'],
          youtubeLink: '',
        },
        {
          title: 'Puzzling Polygons',
          description:
            'Welcome to Puzzling Polygons, the mesmerizing 2D puzzle game that challenges your wit and creativity! Immerse yourself in a world of hexagons and unlock the secrets within as you embark on a journey of brain-teasing delight.',
          imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/bb/90/0c/bb900c99-6b03-b400-86f9-d141906890df/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/314x0w.webp',
          link: 'https://apps.apple.com/us/app/puzzling-polygons/id6468189395',
          platform: ['android', 'ios'],
          youtubeLink: '',
        },
        {
          title: 'Jump and Boom',
          description:
            'Embark on an adrenaline-pumping journey with Jump and Boom, the heart-pounding 3D platformer that challenges you to defy gravity, dodge dangers, and score big! Jump from platform to platform, climb higher, and brace yourself for a game that combines skill, strategy, and power-ups most thrillingly.',
          imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/63/8a/83/638a8357-6175-0336-1e4e-1a854b169f24/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/314x0w.webp',
          link: 'https://apps.apple.com/us/app/jump-and-boom/id6467084131',
          platform: ['android', 'ios'],
          youtubeLink: '',
        },
        {
          title: 'Swoosh Ball',
          description:
            'The ultimate 3D basketball game that takes your hoop dreams to new heights! Immerse yourself in the thrill of shooting hoops and experience the rush of making every shot count.',
          imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/e9/4d/c9/e94dc92a-d88a-cae9-3df8-23ba073346bf/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/314x0w.webp',
          link: 'https://apps.apple.com/us/app/swoosh-ball/id6468182659',
          platform: ['android', 'ios'],
          youtubeLink: '',
        },
        {
          title: 'Dragon Ranch',
          description:
            'Dragon Ranch is a simulation game where players raise and care for dragons, grow crops, expand their farm, and breed unique dragon species. They can also embark on dragon rides and showcase their collection, creating a relaxing and immersive experience.',
          imageUrl: 'https://play-lh.googleusercontent.com/85oX1UXh-7-qYAJ-jPDbamUUKknAIWF1oHS40hXD-NpJ4gOlDRI4MX3mKUM0NkejBe0=s512-rw',
          link: 'https://play.google.com/store/apps/details?id=com.unixcorp.dragonranch',
          platform: ['android'],
          youtubeLink: '',
        },
        {
          title: 'Animal Chase',
          description:
            'Keep your distance from hunters in the forest! The hunter will catch you if you are close enough to them, its your destiny to run away from them and dont step on the trap!',
          imageUrl: 'https://i.imgur.com/j8XS0xC.png',
          link: 'https://play.google.com/store/apps/details?id=com.unixcorp.animalchase',
          platform: ['android'],
          youtubeLink: '',
        },
        {
          title: 'Heisters',
          description:
            'Play as heisters who rob other heisters then uses the loot to build your own squad and base. Feel the thrill of shooting enemies while searching and breaking into enemy vaults. Then, enjoy your loot by using it to build a strong base and an unstoppable squad.',
          imageUrl: 'https://i.imgur.com/HXBBhq8.png',
          link: 'https://play.google.com/store/apps/details?id=com.uniXcorp.Heisters',
          platform: ['android'],
          youtubeLink: '',
        },
        {
          title: 'Yudi si Anak Magang Housekeeping',
          description:
            'An interactive narrative where gives you an experience as Yudi an intern of housekeeping in a hotel called Santika hotel',
          imageUrl: 'https://i.imgur.com/1icEOaj.png',
          link: 'https://drive.google.com/file/d/1d1KUP7KZ8Qd6PSE8ExllBzg7LhZ3IUEn/view?usp=share_link',
          platform: ['windows'],
          youtubeLink: '',
        },
        {
          title: 'Sleep Gravity',
          description:
            'A multiplayer platform side-scroller game that lets you run towards your dreams before your opponents. Survive from your opponents and hinder their dream by spawning obstacles in front of them.',
          imageUrl: 'https://i.imgur.com/vhVNpTt.png',
          link: 'https://unixcorp.itch.io/sleep-gravity',
          platform: ['android', 'windows', 'web'],
          youtubeLink: '',
        },
        {
          title: 'Kompleks Lalu Lintas',
          description:
            'Kompleks Lalu Lintas is a 2D simulation game where you become a resident who moves in a complex called "Tertib Lalu Lintas" with the aim of wanting to understand more about traffic rules. In this game there are also puzzles and trivia that help you understand traffic rules.',
          imageUrl: 'https://i.imgur.com/OlqxEuF.png',
          link: 'https://drive.google.com/drive/folders/1AMHhhM1Q3oBhgp78PJohZQLzJc7wIAPO?usp=share_link',
          platform: ['android', 'windows'],
          youtubeLink: '',
        },
        {
          title: 'TaxSim',
          description:
            'TaxSim is a casual tax-themed game with an interactive 2D simulation and education concept. This game provides learning about taxation in Indonesia in general, as well as providing unpleasant surprises in learning. Providing a background game at the Primary Tax Service Office which is packaged in pixel art and the feel of relaxing music makes the game even more interesting.',
          imageUrl: 'https://i.imgur.com/yMrvwIi.png',
          link: 'https://amin-hanif.itch.io/taxsim',
          platform: ['android', 'windows'],
          youtubeLink: '',
        },
        {
          title: 'Javanese Cuisine',
          description:
            'Javanese Cuisine is a 2D cultural simulation of selling Javanese food and drinks. Help Bambang to pay his rent by selling it within 30days. Buy ingredients to make the cuisine for the customers passing by. It allows players to upgrade the stall until it reaches the maximum level. Higher reputation higher chance to get a customer.',
          imageUrl: 'https://i.imgur.com/fRv7Tf7.png',
          link: 'https://drive.google.com/file/d/1KjzrO6ocj1siLeuNpgQLRMburaqBmjfZ/view?usp=share_link',
          platform: ['windows'],
          youtubeLink: '',
        },
        {
          title: 'Adventure of Hanacaraka',
          description:
            'Adventure of Hanacaraka is a top down 2D cultural adventure game that allows players to control 2 characters to help each other solve puzzles, collect hanacaraka characters, kill monsters, and find hidden tools that can be used to complete a level.',
          imageUrl: 'https://i.imgur.com/HuMByX7.png',
          link: 'https://amin-hanif.itch.io/aoh',
          platform: ['windows', 'web'],
          youtubeLink: '',
        },
        {
          title: 'Life of a Dropshipper',
          description:
            'Life of a Dropshipper is a game where players will act as characters who have experience in doing a job and have sufficient economics for a relatively long period of time. But it is undeniable that the character that will be played by the player must do a new job, namely doing business due to previous work problems, therefore players can try to simulate how to do business in the fashion field, namely dropshipping in this all-digital era in this game.',
          imageUrl: 'https://i.imgur.com/Um07QUd.png',
          link: 'https://drive.google.com/drive/folders/1dbIn3c8PiSNC_FVIzIU-zGDvRcEW0z38?usp=sharing',
          platform: ['windows'],
          youtubeLink: '',
        },
        {
          title: 'Mysticalipse Dungeon',
          description:
            'Dungeon tells the story of an adventurer who tries to collect Mystic Crystals in various types of dungeons. The Mystical Crystal is used to open the gate forever in order to save the village from monster attacks.',
          imageUrl: 'https://i.imgur.com/GtNpXLV.png',
          link: 'https://drive.google.com/drive/folders/1XDNVrY3BjNq0WMhC1UcTEqSd3ARiN7aV?usp=share_link',
          platform: ['android', 'windows'],
          youtubeLink: '',
        },
        {
          title: 'Isolated Forest',
          description:
            'A journey leads you to be trapped in an unknown forest. With physically challenging nature and ghosts bothering you mentally. Can you survive? If so, then an exciting adventure awaits you. Farming, Hunting, Mining, to Make unique and interesting items. Beware of ghosts, he always lurks from directions you never expect. Survival is not only a matter of means but also an amazingly long process.',
          imageUrl: 'https://i.imgur.com/ThNG1Nv.png',
          link: 'https://amin-hanif.itch.io/isolated-forest',
          platform: ['windows', 'web'],
          youtubeLink: '',
        },
        {
          title: 'Tag Runner',
          description:
            'Tag Runner is a multiplayer platformer game that allows you to play with your friends with addicting gameplay and full of features!',
          imageUrl: 'https://i.imgur.com/cZogVFY.png',
          link: 'https://play.google.com/store/apps/details?id=com.unixcorp.tagrunner',
          platform: ['android', 'windows', 'web'],
          youtubeLink: '',
        },
        {
          title: 'The Covid Hero',
          description:
            'The Covid Hero is set against the backdrop of the corona virus outbreak which has made people restless who need to stay at home and keep their distance from other people, and this game aims to be a medium of entertainment and education for people who are at home in a way that we have presented in an interesting and unique way.',
          imageUrl: 'https://i.imgur.com/8NABMww.png',
          link: 'https://amin-hanif.itch.io/the-covid-hero',
          platform: ['android', 'windows', 'web'],
          youtubeLink: '',
        },
        {
          title: 'Hide N Seek Nusantara',
          description:
            'Hide n Seek Nusantara is a game with the concept of hide-and-seek culture, where players can choose a place to play, namely Borobudur, Museum Angkut, Coban Rondo Labyrinth. And players can collect coins to buy perk to use in the game',
          imageUrl: 'https://i.imgur.com/KkBP3wQ.png',
          link: 'https://play.google.com/store/apps/details?id=com.unixcorp.hidenseeknusantara',
          platform: ['android'],
          youtubeLink: '',
        },
      ],
    },
  },
  seo: {
    title: 'Amin Portfolio',
    description: '',
    imageURL: '',
  },
  social: {
    linkedin: 'aminhanifm',
    x: 'aminhanifm',
    mastodon: '',
    researchGate: '',
    facebook: 'aminhanifm',
    instagram: 'aminhanifm',
    reddit: '',
    threads: '',
    youtube: 'aminytchannel', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: 'aminhanif24',
    dev: '',
    stackoverflow: '10861353/amin-hanif', // example: '1/jeff-atwood'
    skype: '',
    telegram: '',
    website: '',
    phone: '(+62) 82131332643 / (+20) 1030952865',
    email: 'aminhanifm@gmail.com',
  },
  resume: {
    fileUrl:
      'https://drive.google.com/file/d/1te60l7zApV1c2GNUoy73K0286dXVOh1v/view?usp=sharing', // Empty fileUrl will hide the `Download Resume` button.
  },
  port: {
    fileUrl:
      'https://drive.google.com/file/d/1taN__P5q1-VwKPUs6ALLn9vmr525JMI-/view?usp=sharing', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Unity',
    'Construct 2/3',
    'Blender',
    'Aseprite',
    'Photoshop',
    'C#',
    'Python',
    'Javascript',
    'React',
    'Vue',
  ],
  experiences: [
    {
      company: 'CV Maleo Media Kreatif',
      position: 'Programmer',
      from: 'January 2024',
      to: 'Present',
      companyLink: 'https://maleo.co/',
    },
    {
      company: 'uniXcorp',
      position: 'Founder & Lead Programmer',
      from: 'January 2019',
      to: 'Present',
      companyLink: 'https://unixcorp.github.io/',
    },
    {
      company: 'Impact Plus Technologies Pte Ltd',
      position: 'Programmer',
      from: 'August 2023',
      to: 'December 2023',
      companyLink: 'https://www.linkedin.com/company/impact-plus-technologies',
    },
    {
      company: 'Web3re Technologies Pte Ltd',
      position: 'Programmer',
      from: 'April 2023',
      to: 'August 2023',
      companyLink: 'https://linkedin.com/company/web3re-technologies',
    },
    {
      company: 'Indigo Game Startup Incubation',
      position: 'Project Manager & Programmer',
      from: 'July 2022',
      to: 'December 2022',
      companyLink: 'https://game.indigo.id/',
    }
  ],
  certifications: [
    {
      name: 'Grand Finalist',
      body: 'Gameseed Competition 2023 by Indie Games Group Indonesia',
      year: '2023',
      link: 'https://play.google.com/store/apps/details?id=com.unixcorp.dragonranch'
    },
    {
      name: '2nd Place',
      body: 'Launching SKKNI Game Development Competition',
      year: '2022',
      link: 'https://drive.google.com/file/d/1d1KUP7KZ8Qd6PSE8ExllBzg7LhZ3IUEn/view'
    },
    {
      name: '3rd Place', 
      body: 'Tax Education Game Development by Directorate General of Taxes',
      year: '2021',
      link: 'https://amin-hanif.itch.io/taxsim'
    },
    {
      name: 'Featured',
      body: 'Baparekraf Game Prime',
      year: '2021',
      link: 'https://amin-hanif.itch.io/aoh'
    },
    {
      name: '3rd Place',
      body: 'International Game Development Competition (IGDC)',
      year: '2021',
      link: 'https://amin-hanif.itch.io/aoh'
    },
    {
      name: '1st Place',
      body: 'Game Development House of Technology 3.0 (HOLOGY 3.0)',
      year: '2020',
      link: 'https://drive.google.com/drive/folders/1dbIn3c8PiSNC_FVIzIU-zGDvRcEW0z38'
    },
    {
      name: '2nd Place',
      body: 'Multimedia Game Development and Game Event 6 (MAGE 6)',
      year: '2020',
      link: 'https://drive.google.com/drive/folders/1XDNVrY3BjNq0WMhC1UcTEqSd3ARiN7aV'
    },
    {
      name: 'Best Audio',
      body: 'Indie Game Ignite COMPFEST 12',
      year: '2020',
      link: 'https://amin-hanif.itch.io/isolated-forest'
    },
    {
      name: '2nd Place',
      body: 'Informatics Champions Game Development Competition',
      year: '2019',
      link: 'https://play.google.com/store/apps/details?id=com.unixcorp.hidenseeknusantara'
    },
    {
      name: 'Finalist',
      body: 'DIGIFEST Game Development Competition in Surabaya',
      year: '2019',
      link: 'https://play.google.com/store/apps/details?id=com.unixcorp.tagrunner'
    },
    {
      name: 'Finalist',
      body: 'FIND IT Game Development Competition at Universitas Gajah Mada Yogyakarta',
      year: '2018',
      link: 'https://play.google.com/store/apps/details?id=com.unixcorp.tagrunner'
    },
    {
      name: 'Finalist',
      body: 'IT Fest 2018 Game Development Competition at Universitas Sumatera Utara',
      year: '2018',
      link: ''
    },
    {
      name: '2nd Place',
      body: 'Southeast Asian Ministers of Education Organization "SEAMEO School Network: Game Development Online Training" "Anyone Can Make a Game!" 2017 for Asia level',
      year: '2017',
      link: 'https://www.seameo.org/_files/seagamedev/cisewutimunmas/'
    },
    {
      name: '3rd Place',
      body: 'Generasi Maju Arek Suroboyo (GEMAS) 2016 Digital Game Competition for High School Students in Surabaya to Commemorate Heroes Day',
      year: '2016',
      link: ''
    },
  ],
  educations: [
    {
      institution: 'Airlangga University',
      degree: 'Bachelor',
      from: '2017',
      to: '2022',
    },
  ],
  publications: [
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: '', // to hide blog section, keep it empty
    limit: 0, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: 'G-TMGSL66PFH', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '3392501',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'halloween',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: true,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'procyon',
    ],

    // Custom theme, applied to `procyon` theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Thank you for visiting my profile!`,

  enablePWA: true,
};

export default CONFIG;
