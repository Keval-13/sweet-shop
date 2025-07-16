import { useEffect } from "react";

export default function Toast({ message, showToast, setShowToast }) {
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000); // auto-close after 3s
      return () => clearTimeout(timer);
    }
  }, [showToast, setShowToast]);

  if (!showToast) return null;

  return (
    <div className="fixed top-5 right-5 bg-green-400 text-white px-4 py-2 rounded shadow-lg animate-fadeIn z-50">
      {message}
    </div>
  );
}
