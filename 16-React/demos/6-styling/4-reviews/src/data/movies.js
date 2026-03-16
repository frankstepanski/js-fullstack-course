const movies = [
  {
    id: 1,
    title: "The Unbearable Weight of Massive Talent",
    release: "2022",
    image:
      "https://res.cloudinary.com/dgkpobybj/image/upload/v1716094000/poster1_z9rxzu.jpg",
    alt: "The Unbearable Weight of Massive Talent",
    description:
      "Unfulfilled and facing financial ruin, actor Nick Cage accepts a $1 million offer to attend a wealthy fan's birthday party. Things take a wildly unexpected turn when a CIA operative recruits Cage for an unusual mission.",
    imdb: "https://www.imdb.com/title/tt11291274/",
    youtube: "CKTRbKch2K4",
    categories: ["Action", "Comedy", "Crime"],
    length: "1h 46m",
    reviews: [
      {
        user: "user2",
        stars: 2,
        comment: "Nick Cage needs to stop making movies, really.",
        date: "2022-03-25",
      },
      {
        user: "user3",
        stars: 2,
        comment: "Meh, could've just watched The Rock on dvd instead.",
        date: "2022-03-26",
      },
    ],
    featured: false,
    hidden: false,
  },
  {
    id: 2,
    title: "The Northernman",
    release: "2022",
    image:
      "https://res.cloudinary.com/dgkpobybj/image/upload/v1716094005/poster2_aegvem.jpg",
    alt: "The Northernman",
    description:
      "Prince Amleth is on the verge of becoming a man when his father is brutally murdered by his uncle, who kidnaps the boy's mother. Two decades later, Amleth is now a Viking who's on a mission to save his mother, kill his uncle and avenge his father",
    imdb: "https://www.imdb.com/title/tt11138512/",
    youtube: "E7wNR9sHQ2g",
    categories: ["Action", "Adventure", "Drama"],
    length: "2h 17m",
    reviews: [
      {
        user: "user4",
        stars: 4,
        comment: "Very thrilling and exciting.",
        date: "2022-03-27",
      },
      {
        user: "user5",
        stars: 3,
        comment: "Acting was average. There is better stuff on Netflix.",
        date: "2022-03-28",
      },
      {
        user: "user6",
        stars: 4,
        comment: "Lots of fun for the whole family.",
        date: "2022-03-29",
      },
      {
        user: "user70",
        stars: 2,
        comment: "A little too gory for my taste",
        date: "2022-03-29",
      },
      {
        user: "user71",
        stars: 1,
        comment: "I don't like the ending.",
        date: "2022-03-30",
      },
    ],
    featured: true,
    hidden: false,
  },
  {
    id: 3,
    title: "Dr Strange in the Multiverse of Madness",
    release: "2022",
    image:
      "https://res.cloudinary.com/dgkpobybj/image/upload/v1716094009/poster3_awz8tm.jpg",
    alt: "Dr Strange in the Multiverse of Madness",
    description:
      "Dr Stephen Strange casts a forbidden spell that opens a portal to the multiverse. However, a threat emerges that may be too big for his team to handle.",
    imdb: "https://www.imdb.com/title/tt9419884/",
    youtube: "aWzlQ2N6qqg",
    categories: ["Adventure", "Fantasy"],
    length: "2h 06m",
    reviews: [
      {
        user: "user7",
        stars: 5,
        comment: "Marvel finally rebounds from Morbius!!!!",
        date: "2022-05-09",
      },
      {
        user: "user8",
        stars: 5,
        comment: "Even better than the first one.",
        date: "2022-05-06",
      },
      {
        user: "user9",
        stars: 5,
        comment:
          "This is something that I defintely will watch a second time in the theaters!",
        date: "2022-05-05",
      },
    ],
    featured: true,
    hidden: false,
  },
  {
    id: 4,
    title: "Ready Player One",
    release: "2018",
    image:
      "https://res.cloudinary.com/dgkpobybj/image/upload/v1716094011/poster4_z2jhih.jpg",
    alt: "Ready Player One",
    description:
      "In the year 2045, climate change, war and poverty have ruined most of Earth's societies. Most people find escape and relief in the OASIS, a multiplayer online game with thousands of different locations, including games, online shopping, and even a thriving school system.",
    imdb: "https://www.imdb.com/title/tt1677720/",
    youtube: "cSp1dM2Vj48",
    categories: ["Action", "Adventure", "Sci-Fi"],
    length: "2h 20m",
    reviews: [
      {
        user: "user10",
        stars: 4,
        comment:
          "Reminds me of my youth with $25 worth of quarters at the arcade.",
        date: "2020-12-07",
      },
      {
        user: "user12",
        stars: 4,
        comment: "Never wanted it end.",
        date: "2019-12-05",
      },
    ],
    featured: false,
    hidden: false,
  },
  {
    id: 5,
    title: "The Matrix Resurrections",
    release: "2021",
    image:
      "https://res.cloudinary.com/dgkpobybj/image/upload/v1716094014/poster5_tfqwsx.jpg",
    alt: "The Matrix Resurrections",
    description:
      "The machines terminated Neo to destroy Smith. When this happened, a program called The Analyst observed that Neo was an anomaly like none other and that Neo's choices were based on his love for Trinity, a companion that the earlier anomalies did not have. So he resuscitates both of them.",
    imdb: "https://www.imdb.com/title/tt10838180/",
    youtube: "9ix7TUGVYIo",
    categories: ["Action", "Sci-Fi"],
    length: "2h 28m",
    reviews: [
      {
        user: "user13",
        stars: 1,
        comment: "OMG, this was horrible. Why Keanu, why???",
        date: "2021-12-25",
      },
      {
        user: "user14",
        stars: 2,
        comment:
          "Fun to see Keanu back as Neo, but it would've been better for the franchise if this was not done.",
        date: "2021-12-26",
      },
      {
        user: "user15",
        stars: 1,
        comment: "Why was this movie done, other than to make money?.",
        date: "2021-12-27",
      },
    ],
    featured: false,
    hidden: false,
  },
  {
    id: 6,
    title: "In Time",
    release: "2011",
    image:
      "https://res.cloudinary.com/dgkpobybj/image/upload/v1716094018/poster6_j5shgk.jpg",
    alt: "In Time",
    description:
      "In a future where time is money and the wealthy can live forever, Will Salas is a poor man who rarely has more than a day's worth of life on his time clock. When he saves Henry Hamilton from time thieves, Will receives the gift of a century.",
    imdb: "https://www.imdb.com/title/tt1637688/",
    youtube: "6zB6wZKEObc",
    categories: ["Action", "Drama", "Sci-Fi"],
    length: "1h 49m",
    reviews: [
      {
        user: "user16",
        stars: 3,
        comment: "Surprised me. It was a real tear-jerker and entertaining.",
        date: "2011-10-25",
      },
      {
        user: "user17",
        stars: 4,
        comment: "Wow, Justin Timberlake can act. Who knew???",
        date: "2011-10-26",
      },
    ],
    featured: false,
    hidden: false,
  },
  {
    id: 7,
    title: "Crazy Rich Asians",
    release: "2018",
    image:
      "https://res.cloudinary.com/dgkpobybj/image/upload/v1716094020/poster7_woiaqu.jpg",
    alt: "Crazy Rich Asians",
    description:
      "Rachel Chu is happy to accompany her longtime boyfriend, Nick, to his best friend's wedding in Singapore. She's also surprised to learn that Nick's family is extremely wealthy and he's considered one of the country's most eligible bachelors.",
    imdb: "https://www.imdb.com/title/tt3104988/",
    youtube: "ZQ-YX-5bAs0",
    categories: ["Comedy", "Drama", "Romance"],
    length: "2h 01m",
    reviews: [
      {
        user: "user20",
        stars: 5,
        comment: "Love, love, love it!. Go see it, then go see it again.",
        date: "2018-6-25",
      },
    ],
    featured: false,
    hidden: false,
  },
  {
    id: 8,
    title: "Blade Runner 2049",
    release: "2017",
    image:
      "https://res.cloudinary.com/dgkpobybj/image/upload/v1716094023/poster8_jilvvw.jpg",
    alt: "Blade Runner 2049",
    description:
      "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
    imdb: "https://www.imdb.com/title/tt1856101/",
    youtube: "gCcx85zbxz4",
    categories: ["Sci-Fi", "Thriller"],
    length: "2h 43m",
    reviews: [
      {
        user: "user23",
        stars: 3,
        comment: "The original was better, but was fun to watch.",
        date: "2017-6-25",
      },
      {
        user: "user24",
        stars: 3,
        comment: "Harrison Ford still can kick ass!",
        date: "2017-8-01",
      },
    ],
    featured: true,
    hidden: false,
  },
];

export default movies;