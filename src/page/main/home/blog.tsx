import { Section } from "@/components/custom/section"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/config"

export const Blog = () => {
  return (
    <Section id="#blog" className="gap-14">
      <div className="flex w-full flex-col pb-6 sm:flex-row sm:justify-between sm:items-center gap-8">
        <h4 className="text-3xl md:text-4xl tracking-tighter max-w-xl font-bold">
          Latest articles
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 hover:opacity-75 cursor-pointer md:col-span-2">
          <div className="bg-muted rounded-md aspect-video"></div>
          <div className="flex flex-row gap-4 items-center">
            <Badge>News</Badge>
            <p className="flex flex-row gap-2 text-sm items-center">
              <span className="text-muted-foreground">By</span>{" "}
              <Avatar className="h-6 w-6">
                <AvatarImage src={siteConfig.ogImage} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>John Johnsen</span>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="max-w-3xl text-4xl font-bold tracking-tight">
              Pay supplier invoices
            </h3>
            <p className="max-w-3xl text-muted-foreground text-base">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 hover:opacity-75 cursor-pointer">
          <div className="bg-muted rounded-md aspect-video"></div>
          <div className="flex flex-row gap-4 items-center">
            <Badge>News</Badge>
            <p className="flex flex-row gap-2 text-sm items-center">
              <span className="text-muted-foreground">By</span>{" "}
              <Avatar className="h-6 w-6">
                <AvatarImage src={siteConfig.ogImage} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>John Johnsen</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="max-w-3xl text-2xl font-bold tracking-tight">
              Pay supplier invoices
            </h3>
            <p className="max-w-3xl text-muted-foreground text-base">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 hover:opacity-75 cursor-pointer">
          <div className="bg-muted rounded-md aspect-video"></div>
          <div className="flex flex-row gap-4 items-center">
            <Badge>News</Badge>
            <p className="flex flex-row gap-2 text-sm items-center">
              <span className="text-muted-foreground">By</span>{" "}
              <Avatar className="h-6 w-6">
                <AvatarImage src={siteConfig.ogImage} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>John Johnsen</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="max-w-3xl text-2xl font-bold tracking-tight">
              Pay supplier invoices
            </h3>
            <p className="max-w-3xl text-muted-foreground text-base">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
            </p>
          </div>
        </div>
      </div>
    </Section >
  )
}