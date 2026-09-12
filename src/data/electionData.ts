export interface CandidateItem {
  id: string;
  role: string;
  name: string;
  badge: string;
  subtitle?: string;
  iconName: 'crown' | 'shield' | 'scroll-text' | 'graduation-cap' | 'users' | 'megaphone' | 'star';
  photoUrl?: string;
}

export interface ElectionCampaignData {
  schoolName: string;
  eventTitle: string;
  campaignTitle: string;
  targetAudience: string;
  votingDateText: string;
  votingLocationText: string;
  slogan: string;
  qrCodeUrl: string;
  appeal: {
    greeting: string;
    body: string[];
    callToAction: string;
  };
  president: CandidateItem;
  vicePresidents: CandidateItem[];
  deputies: CandidateItem[];
}

export const electionData: ElectionCampaignData = {
  schoolName: 'Лицей №11',
  eventTitle: 'День самоуправления',
  campaignTitle: 'Кандидат в Президенты Лицея №11',
  targetAudience: '10–11 классы',
  votingDateText: 'Дата выборов: будет объявлена',
  votingLocationText: 'Место: Холл 2 этажа / Избирательный участок Лицея',
  slogan: 'Голосуй за 11 А! 🗳️',
  qrCodeUrl: 'https://golub4ik-official.github.io/portfolio-website/#/election',

  appeal: {
    greeting: 'Привет, старшеклассники (10–11 классы)!',
    body: [
      'День самоуправления — это наш день, и кто будет у руля лицея, решаешь только ты.',
      'Кандидат от 11 А класса и наша команда готовы взять ответственность за порядок и атмосферу в школе.',
    ],
    callToAction: 'Твой голос имеет вес. Голосуй за 11 А!',
  },

  president: {
    id: 'president',
    role: 'Президент лицея',
    name: 'Ваше имя',
    badge: '11 А',
    iconName: 'crown',
  },

  vicePresidents: [
    {
      id: 'vp-11a',
      role: 'Заместитель президента',
      name: 'Имя заместителя',
      badge: '11 А',
      iconName: 'shield',
    },
    {
      id: 'vp-11b',
      role: 'Заместитель президента',
      name: 'Имя заместителя',
      badge: '11 Б',
      iconName: 'shield',
    },
    {
      id: 'vp-11v',
      role: 'Заместитель президента',
      name: 'Имя заместителя',
      badge: '11 В',
      iconName: 'shield',
    },
    {
      id: 'sec-11a',
      role: 'Секретарь президента',
      name: 'Имя секретаря',
      badge: '11 А',
      iconName: 'scroll-text',
    },
  ],

  deputies: [
    {
      id: 'dep-uvr',
      role: 'Завуч по УВР',
      name: 'Имя завуча',
      badge: '11 А',
      subtitle: 'Учебно-воспитательная работа',
      iconName: 'graduation-cap',
    },
    {
      id: 'dep-junior',
      role: 'Завуч младшей школы',
      name: 'Имя завуча',
      badge: '11 А',
      subtitle: 'Ответственный за 10-ые классы',
      iconName: 'users',
    },
    {
      id: 'dep-media',
      role: 'Завуч по медиа',
      name: 'Имя завуча',
      badge: '11 А',
      subtitle: 'Пресс-центр и соцсети',
      iconName: 'megaphone',
    },
    {
      id: 'dep-fun-a',
      role: 'Завуч по движухе',
      name: 'Имя завуча',
      badge: '11 А',
      subtitle: 'Культурно-массовые мероприятия',
      iconName: 'star',
    },
    {
      id: 'dep-fun-b',
      role: 'Завуч по движухе',
      name: 'Имя завуча',
      badge: '11 Б',
      subtitle: 'Спорт и интерактивы',
      iconName: 'star',
    },
    {
      id: 'dep-fun-v',
      role: 'Завуч по движухе',
      name: 'Имя завуча',
      badge: '11 В',
      subtitle: 'Атмосфера и активности',
      iconName: 'star',
    },
  ],
};
