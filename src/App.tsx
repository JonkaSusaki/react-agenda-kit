import "./App.css";
import { WeekView } from "react-agenda-kit";

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
  return (
    <>
      <WeekView currentDate={new Date()} items={exampleItems} />
    </>
  );
}

export default App;
