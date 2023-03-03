// gitprofile.config.js

const config = {
  github: {
    username: 'aminhanifm', // Your GitHub org/user name. (Required)
    sortBy: 'stars', // stars | updated
    limit: 2, // How many projects to display.
    exclude: {
      forks: false, // Forked projects will not be displayed if set to true.
      projects: [], // These projects will not be displayed. example: ['my-project1', 'my-project2']
    },
  },
  social: {
    linkedin: 'amin-hanif-mahmud-b10b5914a',
    twitter: 'aminhanifm',
    mastodon: '',
    facebook: '',
    instagram: '',
    dribbble: '',
    behance: '',
    medium: 'aminhanif24',
    dev: '',
    stackoverflow: '10861353/amin-hanif', // format: userid/username
    skype: 'aminhanif24',
    telegram: '',
    website: 'aminhanifm.github.io',
    phone: '',
    email: 'aminhanifm@gmail.com',
  },
  resume: {
    fileUrl:
      'https://drive.google.com/file/d/1kDZhlVMcB2IzCcUNYe7u0p7G2jSBSNr5/view?usp=sharing', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Unity',
    'Construct 3',
    'Construct 2',
    'Blender',
    'Aseprite',
    'Substance Painter',
    'C#',
    'Javascript',
    'HTML5',
  ],
  experiences: [
    {
      company: 'uniXcorp',
      position: 'Founder',
      from: 'December 2019',
      to: 'January 2023',
      companyLink: 'https://unixcorpgamedev.id',
    },
    {
      company: 'Indigo Game Startup Incubation',
      position: 'Startup',
      from: 'July 2022',
      to: 'December 2022',
      companyLink: 'https://game.indigo.id/',
    },
  ],
  certifications: [
    {
      name: '3rd Place',
      body: 'Generasi Maju Arek Suroboyo (GEMAS) 2016 Digital Game Competition for High School Students in Surabaya to Commemorate Heroes Day',
      year: '2016',
      link: ''
    },
    {
      name: '2nd Place',
      body: 'Southeast Asian Ministers of Education Organization "SEAMEO School Network: Game Development Online Training" "Anyone Can Make a Game!" 2017 for Asia level',
      year: '2017',
      link: ''
    },
    {
      name: 'Finalist',
      body: 'IT Fest 2018 Game Development Competition at Universitas Sumatera Utara',
      year: '2018',
      link: ''
    },
    {
      name: 'Finalist',
      body: 'FIND IT Game Development Competition at Universitas Gajah Mada Yogyakarta',
      year: '2018',
      link: ''
    },
    {
      name: '2nd Place',
      body: 'Game Development Informatics Champions at Universitas Negeri Surabaya',
      year: '2018',
      link: ''
    },
    {
      name: 'Finalist',
      body: 'DIGIFEST Game Development Competition in Surabaya',
      year: '2019',
      link: ''
    },
    {
      name: '2nd Place',
      body: 'Informatics Champions Game Development Competition',
      year: '2019',
      link: ''
    },
    {
      name: 'Best Audio',
      body: 'Indie Game Ignite COMPFEST 12',
      year: '2020',
      link: ''
    },
    {
      name: '2nd Place',
      body: 'Multimedia Game Development and Game Event 6 (MAGE 6)',
      year: '2020',
      link: ''
    },
    {
      name: '1st Place',
      body: 'Game Development House of Technology 3.0 (HOLOGY 3.0)',
      year: '2020',
      link: ''
    },
    {
      name: '3rd Place',
      body: 'International Game Development Competition (IGDC)',
      year: '2021',
      link: ''
    },
    {
      name: 'Featured',
      body: 'Baparekraf Game Prime',
      year: '2021',
      link: ''
    },
    {
      name: '3rd Place',
      body: 'Tax Education Game Development by Directorate General of Taxes',
      year: '2021',
      link: ''
    },
    {
      name: '2nd Place',
      body: 'Launching SKKNI Game Development Competition',
      year: '2022',
      link: ''
    },
  ],
  education: [
    {
      institution: 'Airlangga University',
      degree: 'Bachelor',
      from: '2017',
      to: '2022',
    },
  ],

  // To hide the `My Projects` section, keep it empty.
  externalProjects: [
    {
      title: 'Hide N Seek Nusantara',
      description:
        'Hide n Seek Nusantara is a game with the concept of hide-and-seek culture, where players can choose a place to play, namely Borobudur, Museum Angkut, Coban Rondo Labyrinth. And players can collect coins to buy perk to use in the game',
      imageUrl: 'https://imgur.com/KkBP3wQ',
      link: '',
    },
    {
      title: 'The Covid Hero',
      description:
        'The Covid Hero is set against the backdrop of the corona virus outbreak which has made people restless who need to stay at home and keep their distance from other people, and this game aims to be a medium of entertainment and education for people who are at home in a way that we have presented in an interesting and unique way.',
      imageUrl: 'https://via.placeholder.com/250x250',
      link: '',
    },
    {
      title: 'Isolated Forest',
      description:
        'A journey leads you to be trapped in an unknown forest. With physically challenging nature and ghosts bothering you mentally. Can you survive? If so, then an exciting adventure awaits you. Farming, Hunting, Mining, to Make unique and interesting items. Beware of ghosts, he always lurks from directions you never expect. Survival is not only a matter of means but also an amazingly long process.',
      imageUrl: 'https://imgur.com/ThNG1Nv',
      link: 'https://amin-hanif.itch.io/isolated-forest',
    },
    {
      title: 'Mysticalipse Dungeon',
      description:
        'Dungeon tells the story of an adventurer who tries to collect Mystic Crystals in various types of dungeons. The Mystical Crystal is used to open the gate forever in order to save the village from monster attacks.',
      imageUrl: 'https://imgur.com/GtNpXLV',
      link: '',
    },
    {
      title: 'Life of a Dropshipper',
      description:
        'Life of a Dropshipper is a game where players will act as characters who have experience in doing a job and have sufficient economics for a relatively long period of time. But it is undeniable that the character that will be played by the player must do a new job, namely doing business due to previous work problems, therefore players can try to simulate how to do business in the fashion field, namely dropshipping in this all-digital era in this game.',
      imageUrl: 'https://imgur.com/Um07QUd',
      link: '',
    },
    {
      title: 'Adventure of Hanacaraka',
      description:
        'Adventure of Hanacaraka is a top down 2D cultural adventure game that allows players to control 2 characters to help each other solve puzzles, collect hanacaraka characters, kill monsters, and find hidden tools that can be used to complete a level.',
      imageUrl: 'https://imgur.com/HuMByX7',
      link: 'https://amin-hanif.itch.io/aoh',
    },
    {
      title: 'Javanese Cuisine',
      description:
        'Javanese Cuisine is a 2D cultural simulation of selling Javanese food and drinks. Help Bambang to pay his rent by selling it within 30days. Buy ingredients to make the cuisine for the customers passing by. It allows players to upgrade the stall until it reaches the maximum level. Higher reputation higher chance to get a customer.',
      imageUrl: 'https://imgur.com/fRv7Tf7',
      link: '',
    },
    {
      title: 'TaxSim',
      description:
        'TaxSim is a casual tax-themed game with an interactive 2D simulation and education concept. This game provides learning about taxation in Indonesia in general, as well as providing unpleasant surprises in learning. Providing a background game at the Primary Tax Service Office which is packaged in pixel art and the feel of relaxing music makes the game even more interesting.',
      imageUrl: 'https://imgur.com/yMrvwIi',
      link: 'https://amin-hanif.itch.io/taxsim',
    },
    {
      title: 'Kompleks Lalu Lintas',
      description:
        'Kompleks Lalu Lintas is a 2D simulation game where you become a resident who moves in a complex called "Tertib Lalu Lintas" with the aim of wanting to understand more about traffic rules. In this game there are also puzzles and trivia that help you understand traffic rules.',
      imageUrl: 'https://imgur.com/OlqxEuF',
      link: '',
    },
    {
      title: 'Yudi si Anak Magang Housekeeping',
      description:
        'An interactive narrative where gives you an experience as Yudi an intern of housekeeping in a hotel called Santika hotel',
      imageUrl: 'https://imgur.com/1icEOaj',
      link: '',
    },
    {
      title: 'Heisters',
      description:
        'Play as heisters who rob other heisters then uses the loot to build your own squad and base. Feel the thrill of shooting enemies while searching and breaking into enemy vaults. Then, enjoy your loot by using it to build a strong base and an unstoppable squad.',
      imageUrl: 'https://imgur.com/HXBBhq8',
      link: 'https://play.google.com/store/apps/details?id=com.uniXcorp.Heisters',
    },
    {
      title: 'Animal Chase',
      description:
        'Keep your distance from hunters in the forest! The hunter will catch you if you are close enough to them, it's your destiny to run away from them and don't step on the trap!',
      imageUrl: 'https://imgur.com/j8XS0xC',
      link: 'https://play.google.com/store/apps/details?id=com.unixcorp.animalchase',
    },
  ],
  // Display blog posts from your medium or dev account. (Optional)
  blog: {
    source: '', // medium | dev
    username: '', // to hide blog section, keep it empty
    limit: 0, // How many posts to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'business',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Hide the ring in Profile picture
    hideAvatarRing: false,

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
      'procyon',
    ],

    // Custom theme
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
  footer: `Thank you for visiting my profile! <a 
      class="text-primary" href="https://github.com/aminhanifm"
      target="_blank"
      rel="noreferrer"`,
};

export default config;
