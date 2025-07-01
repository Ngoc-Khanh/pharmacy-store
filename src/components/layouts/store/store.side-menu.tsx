"use client"

import { Branding } from "@/components/custom/branding"
import { Icons } from "@/components/custom/icons"
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/custom/sheet"
import { StoreSocialMedias } from "@/components/layouts/store"
import { Button } from "@/components/ui/button"
import { mainNav } from "@/config"
import { Link } from "react-router-dom"

export function StoreSideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-0">
          <Icons.menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full md:max-w-xl pr-[4rem]"
        closeButtonClassName="w-6 h-6 md:w-10 md:h-10"
      >
        <div className="grid py-8 gap-y-3 ml-12 md:ml-[96px] mt-[120px]">
          {mainNav.map(({ title, href }, index) => (
            <Link key={index} to={href} className="text-xl md:text-3xl font-medium uppercase">
              {title}
            </Link>
          ))}
        </div>

        <SheetFooter className="fixed grid bottom-[96px] ml-12 md:ml-[96px] space-x-0">
          <Branding className="text-xl md:text-4xl md:mb-3" />

          <div className="mb-8 text-muted-foreground">
            <p className="text-xs md:text-sm ml-0">Đỗ Ngọc Khánh - 72DCTT20150</p>
            <p className="text-xs md:text-sm ml-0">
              <span>72DCTT23</span> {` / `}
              <Link
                className="hover:underline hover:text-primary"
                to="mailto:dongockhanh2003@gmail.com"
              >
                dongockhanh2003@gmail.com
              </Link>
            </p>
          </div>

          <StoreSocialMedias />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}