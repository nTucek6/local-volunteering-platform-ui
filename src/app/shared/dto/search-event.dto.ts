import { EventCategory } from '../model/event-category';

export type SearchEventDto = {
  id: number;
  category: EventCategory;
  title: string;
  location: string;
  startDateTime: Date;
  creatorId: number;
  creatorProfileImageURL: string;
};


export type SearchPageResponse = {
  [key: number]: SearchEventDto[];
}