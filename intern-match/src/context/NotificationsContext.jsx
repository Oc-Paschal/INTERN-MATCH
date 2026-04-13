// src/context/NotificationsContext.jsx
import { createContext, useContext, useState } from "react";

const NotificationsContext = createContext(null);

// Sample notifications — replace with real API data later
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "match",
    title: "New match found!",
    message: "Frontend Developer Intern at Paystack matches 92% of your profile.",
    time: "2 mins ago",
    read: false,
    link: "/internships/1",
  },
  {
    id: 2,
    type: "deadline",
    title: "Application deadline soon",
    message: "Product Design Intern at Andela closes in 3 days. Don't miss it!",
    time: "1 hour ago",
    read: false,
    link: "/internships/3",
  },
  {
    id: 3,
    type: "match",
    title: "New match found!",
    message: "Backend Engineer Intern at Kuda Bank matches 88% of your profile.",
    time: "3 hours ago",
    read: false,
    link: "/internships/4",
  },
  {
    id: 4,
    type: "tip",
    title: "Complete your profile",
    message: "Add your GitHub link to increase your match score by up to 15%.",
    time: "Yesterday",
    read: true,
    link: "/profile",
  },
  {
    id: 5,
    type: "deadline",
    title: "Deadline reminder",
    message: "Operations Intern at Zenith Bank closes tomorrow. Apply now!",
    time: "Yesterday",
    read: true,
    link: "/internships/8",
  },
];

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => setNotifications([]);

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, clearAll }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used inside NotificationsProvider");
  return ctx;
};