"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const initialCart = [
  {
    id: 1,
    image: "/avatar/1.jpg",
    user: "Chris Tompson",
    action: "requested review on",
    target: "PR #42: Feature implementation",
    timestamp: "15 minutes ago",
    unread: true,
  },
  {
    id: 2,
    image: "/avatar/2.jpg",
    user: "Emma Davis",
    action: "shared",
    target: "New component library",
    timestamp: "45 minutes ago",
    unread: true,
  },
  {
    id: 3,
    image: "/avatar/3.jpg",
    user: "James Wilson",
    action: "assigned you to",
    target: "API integration task",
    timestamp: "4 hours ago",
    unread: false,
  },
  {
    id: 4,
    image: "/avatar/4.jpg",
    user: "Alex Morgan",
    action: "replied to your comment in",
    target: "Authentication flow",
    timestamp: "12 hours ago",
    unread: false,
  },
  {
    id: 5,
    image: "/avatar/5.jpg",
    user: "Sarah Chen",
    action: "commented on",
    target: "Dashboard redesign",
    timestamp: "2 days ago",
    unread: false,
  },
  {
    id: 6,
    image: "/avatar/6.jpg",
    user: "Miky Derya",
    action: "mentioned you in",
    target: "Origin UI open graph image",
    timestamp: "2 weeks ago",
    unread: false,
  },
];

function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  )
}

export function Cart() {
  const [carts, setCarts] = useState(initialCart);
  const unreadCount = carts.filter((item) => item.unread).length;

  const handleMarkAllAsRead = () => {
    setCarts(carts.map((cart) => ({
      ...cart,
      unread: false,
    })))
  }

  const handleCartClick = (id: number) => {
    setCarts(
      carts.map((cart) =>
        cart.id === id ? { ...cart, unread: false } : cart,
      ),
    );
  };


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="relative" aria-label="Open notifications">
          <ShoppingCart size={16} strokeWidth={2} aria-hidden="true" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1" align="end" side="bottom">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Shopping Cart</div>
          {unreadCount > 0 && (
            <button className="text-xs font-medium hover:underline" onClick={handleMarkAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="-mx-1 my-1 h-px bg-border"
        />
        {carts.map((cart) => (
          <div
            key={cart.id}
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
          >
            <div className="relative flex items-start gap-3 pe-3">
              <img
                className="size-9 rounded-md"
                src={cart.image}
                width={32}
                height={32}
                alt={cart.user}
              />
              <div className="flex-1 space-y-1">
                <button
                  className="text-left text-foreground/80 after:absolute after:inset-0"
                  onClick={() => handleCartClick(cart.id)}
                >
                  <span className="font-medium text-foreground hover:underline">
                    {cart.user}
                  </span>{" "}
                  {cart.action}{" "}
                  <span className="font-medium text-foreground hover:underline">
                    {cart.target}
                  </span>
                  .
                </button>
                <div className="text-xs text-muted-foreground">{cart.timestamp}</div>
              </div>
              {cart.unread && (
                <div className="absolute end-0 self-center">
                  <Dot />
                </div>
              )}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover >
  )
}