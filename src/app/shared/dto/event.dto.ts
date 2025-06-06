import { EventCategory } from "../model/event-category";
import { EventImage } from "../model/event-image";

export type EventDTO = {
  id: number;
  category: EventCategory;
  title: string;
  description: string;
  details: string;
  location: string;
  address: string;
  startDateTime: Date;
  upvote: number;
  creatorId: number;
  volunteerCount: number;
  images: EventImage[];
};
