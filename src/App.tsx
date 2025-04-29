import { useState } from "react";
import "./App.css";
import { MonthView, setAgendaKitConfig, WeekView } from "react-agenda-kit";
import { en } from "./locales/en";
import { pt } from "./locales/pt";

const now = new Date();

const exampleItems = [
  {
    date: new Date(now.getTime()), // now
    title: "Meeting with team",
  },
  {
    date: new Date(now.getTime() + 1 * 60 * 60 * 1000), // +1 hour
    title: "Client call",
  },
  {
    date: new Date(now.getTime() + 3 * 60 * 60 * 1000), // +3 hours
    title: "Design review",
  },
  {
    date: new Date(now.getTime() + 4 * 60 * 60 * 1000), // +3 hours
    title: "Design review",
  },
  {
    date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // +1 day
    title: "Project deadline",
  },
  {
    date: new Date(now.getTime() + (1 * 24 + 2) * 60 * 60 * 1000), // +1 day and 2 hours
    title: "Weekly planning",
  },
  {
    date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // +2 days
    title: "Team building event",
  },
];

function App() {
  const [currentView, setCurrentView] = useState<"day" | "week" | "month">(
    "week"
  );

  setAgendaKitConfig({ locale: pt });
  
  return (
    <>
      <button onClick={() => setCurrentView("day")}>day</button>
      <button onClick={() => setCurrentView("week")}>week</button>
      <button onClick={() => setCurrentView("month")}>month</button>

      {currentView === "week" && (
        <WeekView currentDate={new Date()} items={exampleItems} />
      )}

      {currentView === "month" && (
        <MonthView currentDate={new Date()} items={exampleItems} />
      )}
    </>
  );
}

export default App;
