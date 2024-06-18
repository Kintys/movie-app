import { v4 as uuidv4 } from 'uuid';

export interface Movie {
  id: string;
  link: string;
  imgSrc: string;
  title: string;
  description: string;
  rating: number;
  time: number;
}

export const movieList: Movie[] = [
  {
    id: uuidv4(),
    link: 'https://www.google.com/',
    imgSrc: '../../../assets/img/lord.jpg',
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    description:
      'The future of civilization rests in the fate of the One Ring, which has been lost for centuries. Powerful forces are unrelenting in their search for it. But fate has placed it in the hands of a young Hobbit named Frodo Baggins (Elijah Wood), who inherits the Ring and steps into legend. A daunting task lies ahead for Frodo when he becomes the Ringbearer - to destroy the One Ring in the fires of Mount Doom where it was forged.',
    rating: 4.2,
    time: 14234,
  },
  {
    id: uuidv4(),
    link: 'https://www.google.com/',
    imgSrc: '../../../assets/img/steel.jpg',
    title: 'Real Steel',
    description:
      "In the near future, robot boxing is a top sport. A struggling ex-boxer feels he's found a champion in a discarded robot.",
    rating: 4.5,
    time: 21414,
  },
  {
    id: uuidv4(),
    link: 'https://www.google.com/',
    imgSrc: '../../../assets/img/mad.webp',
    title: 'Mad Max: Fury Road',
    description:
      'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper and a drifter named Max.',
    rating: 3.8,
    time: 13953,
  },
  {
    id: uuidv4(),
    link: 'https://www.google.com/',
    imgSrc: '../../../assets/img/bad.jpg',
    title: 'Bad Boys II',
    description:
      'Two loose-cannon narcotics cops investigate the flow of Ecstasy into Florida from a Cuban drug cartel',
    rating: 4.9,
    time: 12942,
  },
  {
    id: uuidv4(),
    link: 'https://www.google.com/',
    imgSrc: '../../../assets/img/citizen.jpg',
    title: 'Law Abiding Citizen',
    description:
      "A frustrated man decides to take justice into his own hands after a plea bargain sets one of his family's killers free.",
    rating: 4.1,
    time: 15942,
  },
];
