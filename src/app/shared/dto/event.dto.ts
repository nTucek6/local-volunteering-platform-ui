import { EventCategory } from "../model/event-category";

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
};
