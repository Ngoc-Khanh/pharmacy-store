import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Github, Instagram } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config";


export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      {/* <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage
              alt="krugkrug"
              src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/475498688_1342904003405977_5625967673413894804_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=XqSmiAURH9QQ7kNvgEMJ11T&_nc_oc=Adieyyfi0PVfknJGtXR_ZB_yjdkeup0os9WepHsVS5a6p364SKbpmkfDVlQpxK1Xjf0&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=AkgVIMAmSfjv2oa09tNbByQ&oh=00_AYD7esd5eIW595jJfvGx5vIRstn-epxdEb38Nhul36RlBQ&oe=67ACBCF0"
            />
            <AvatarFallback>KG</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Krug</CardTitle>
            <CardDescription>@krug</CardDescription>
          </div>
        </CardHeader>

        <CardContent>Pharmacy Store Landing Page</CardContent>
      </Card> */}

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/475498688_1342904003405977_5625967673413894804_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=XqSmiAURH9QQ7kNvgEMJ11T&_nc_oc=Adieyyfi0PVfknJGtXR_ZB_yjdkeup0os9WepHsVS5a6p364SKbpmkfDVlQpxK1Xjf0&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=AkgVIMAmSfjv2oa09tNbByQ&oh=00_AYD7esd5eIW595jJfvGx5vIRstn-epxdEb38Nhul36RlBQ&oe=67ACBCF0"
            alt="user avatar"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">Ngọc Khánh</CardTitle>
          <CardDescription className="font-normal text-primary">
            Fullstack Developer
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            Silence & Darkness
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              rel="noreferrer noopener"
              href={siteConfig.links.github}
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <Github size={18} />
            </a>
            <a
              rel="noreferrer noopener"
              href={siteConfig.links.facebook}
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Facebook icon</span>
              <Facebook size={18} />
            </a>

            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/leopoldo-miranda/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Instagram size={18} />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      {/* <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Free
            <Badge
              variant="secondary"
              className="text-sm text-primary"
            >
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>
            Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">Start Free Trial</Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["4 Team member", "4 GB Storage", "Upto 6 pages"].map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="flex"
                >
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card> */}

      {/* Service */}
      {/* <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <LightbulbIcon />
          </div>
          <div>
            <CardTitle>Light & dark mode</CardTitle>
            <CardDescription className="text-md mt-2">
              Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur
              natusm.
            </CardDescription>
          </div>
        </CardHeader>
      </Card> */}
    </div>
  );
};