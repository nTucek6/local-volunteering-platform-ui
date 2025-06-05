import { EventCategory } from "../model/event-category";
import { EventImage } from "../model/event-image";

export type EventDTO = {
  id: number;
  category: EventCategory;
  title: string;
  description: string;
  location: string;
  startDateTime: Date;
  upvote: number;
  creatorId: number;
  volunteerCount: number;
  images: EventImage[];
};
