"use client";

import { EventCard } from "@/components";
import { Event, Component, Duration, parse } from "ical.js";
import { useState } from "react";

export default function Home() {
  const [url, setURL] = useState("");
  const [events, setEvents] = useState<Event[]>([]);

  const handleSetURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setURL(e.target.value);
  };

  const handleLoad = async () => {
    const response = await (await fetch(`/calendar?url=${url}`)).json();

    const jCal = parse(response.data);

    const component = new Component(jCal);
    setEvents(
      component
        .getAllSubcomponents("vevent")
        .map((event) => new Event(event))
        .sort(
          (a, b) =>
            a.startDate.toJSDate().valueOf() - b.startDate.toJSDate().valueOf()
        )
    );
  };

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex flex-row gap-4 mb-10 w-full">
        <input
          type="text"
          placeholder="Paste your iCal URL"
          className="border-gray-200 px-4 py-4 rounded-lg border-2 border-blue flex-grow"
          value={url}
          onChange={handleSetURL}
        />
        <button
          className="bg-blue-500 text-white px-8 rounded-md"
          onClick={handleLoad}
        >
          Load
        </button>
      </div>
      {events && (
        <div className="flex flex-col gap-10 items-center">
          {events.map((event) => (
            <EventCard key={event.uid} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}
