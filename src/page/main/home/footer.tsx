import { Section } from "@/components/custom/section";
import { siteConfig } from "@/config";
import { Link } from "react-router-dom";

const navigationItems = [
  {
    title: "Home",
    href: "/",
    description: "",
  },
  {
    title: "Product",
    description: "Managing a small business today is already tough.",
    items: [
      {
        title: "Reports",
        href: "/reports",
      },
      {
        title: "Statistics",
        href: "/statistics",
      },
      {
        title: "Dashboards",
        href: "/dashboards",
      },
      {
        title: "Recordings",
        href: "/recordings",
      },
    ],
  },
  {
    title: "Company",
    description: "Managing a small business today is already tough.",
    items: [
      {
        title: "About us",
        href: "/about",
      },
      {
        title: "Fundraising",
        href: "/fundraising",
      },
      {
        title: "Investors",
        href: "/investors",
      },
      {
        title: "Contact us",
        href: "/contact",
      },
    ],
  },
];

export const Footer = () => {
  return (
    <Section className="border-none">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="flex gap-8 flex-col items-start">
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              {siteConfig.name}
            </h2>
            <p className="text-lg max-w-lg leading-relaxed tracking-tight text-primary text-left">
              Managing a small business today is already tough.
            </p>
          </div>
          <div className="flex gap-20 flex-row">
            <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-primary text-left">
              <p>1 Tailwind Way</p>
              <p>Menlo Park</p>
              <p>CA 94025</p>
            </div>
            <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-primary text-left">
              <Link to="/">Terms of service</Link>
              <Link to="/">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {navigationItems.map((item) => (
            <div
              key={item.title}
              className="flex text-base gap-1 flex-col items-start"
            >
              <div className="flex flex-col gap-2">
                {item.href ? (
                  <Link
                    to={item.href}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xl">{item.title}</span>
                  </Link>
                ) : (
                  <p className="text-xl">{item.title}</p>
                )}
                {item.items &&
                  item.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.href}
                      className="flex justify-between items-center"
                    >
                      <span className="text-primary ">
                        {subItem.title}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}