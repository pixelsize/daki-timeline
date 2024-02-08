import { FC } from "react";
import { Event as ICALEvent } from "ical.js";

type Props = {
  event: ICALEvent;
};

export const EventCard: FC<Props> = ({ event }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl">{event.summary}</h2>
      <div>{event.location}</div>
      <div>From: {event.startDate.toJSDate().toLocaleString()}</div>
      <div>To: {event.endDate.toJSDate().toLocaleString()}</div>
    </div>
  );
};
