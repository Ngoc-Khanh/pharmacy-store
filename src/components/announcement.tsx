import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Announcement() {
  return (
    <Link
      to="#"
      className="group mb-2 inline-flex items-center px-0.5 text-sm font-medium"
    >
      <span className="underline-offset-4 group-hover:underline">
        New products are coming soon 🎉!
      </span>
      <ArrowRight className="ml-1 h-4 w-4" />
    </Link>
  );
}
