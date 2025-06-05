export type NewEventDto = {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  address: string;
  startDateTime: Date;
  creatorId: number;
};
