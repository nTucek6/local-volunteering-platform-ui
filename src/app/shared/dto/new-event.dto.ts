export type NewEventDto = {
  id?: number;
  category: string;
  title: string;
  description: string;
  details: string;
  location: string;
  address: string;
  startDateTime: Date;
  creatorId: number;
  images: File[];
};
