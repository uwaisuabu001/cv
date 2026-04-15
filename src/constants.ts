export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  video?: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'THE SILENT ECHO',
    category: 'CINEMATOGRAPHY',
    image: 'https://picsum.photos/seed/echo/1200/1600',
    description: 'A raw exploration of solitude in urban landscapes.'
  },
  {
    id: '2',
    title: 'URBAN TENSION',
    category: 'PHOTOGRAPHY',
    image: 'https://picsum.photos/seed/urban/1200/800',
    description: 'Capturing the friction between architecture and human movement.'
  },
  {
    id: '3',
    title: 'NEON NOIR',
    category: 'CREATIVE DIRECTION',
    image: 'https://picsum.photos/seed/neon/1200/1600',
    description: 'Visual identity for an underground fashion label.'
  },
  {
    id: '4',
    title: 'GRAIN & GRIT',
    category: 'DOCUMENTARY',
    image: 'https://picsum.photos/seed/grit/1200/1200',
    description: 'A series documenting the last artisans of the industrial district.'
  },
  {
    id: '5',
    title: 'VELOCITY',
    category: 'VIDEOGRAPHY',
    image: 'https://picsum.photos/seed/velocity/1600/1200',
    description: 'High-speed cinematic study of motion.'
  },
  {
    id: '6',
    title: 'MONOCHROME SOUL',
    category: 'PHOTOGRAPHY',
    image: 'https://picsum.photos/seed/soul/1200/1600',
    description: 'Stripping away color to find the truth in portraits.'
  }
];
