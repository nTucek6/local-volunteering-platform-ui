import { EventCategory } from "./event-category";

export type EventFilterParams = {
  category?: EventCategory;
  title?: string;
  description?: string;
  location?: string;
  startDateTimeFrom?: Date;
  startDateTimeTo?: Date;
  creatorId?: number;
};
