import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function RootPictures() {
  const images = [
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751349760/logo-y-te-suc-khoe-benh-vien_ac7niv.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751349849/y-te-4.0-SUNS_wyejb3.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751349949/AI-trong-y-te-FPT-IS-1743578295_sckcwe.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350009/edited-support-ser-555x290-1_cgb6x0.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350134/637667890_izgli5.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350485/image-39_eixdgd.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350607/bac-si_ff62511651daab121f1c097ef0fb8d6d_450_300_yz7pty.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350651/vai-tro-chuyen-doi-so-trong-y-te-1024x576_duxzpk.webp",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350684/Chuyen-doi-so-trong-nganh-Y-te-1_hhxsut.jpg",

    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350684/Chuyen-doi-so-trong-nganh-Y-te-1_hhxsut.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350684/Chuyen-doi-so-trong-nganh-Y-te-1_hhxsut.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350684/Chuyen-doi-so-trong-nganh-Y-te-1_hhxsut.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350651/vai-tro-chuyen-doi-so-trong-y-te-1024x576_duxzpk.webp",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751349760/logo-y-te-suc-khoe-benh-vien_ac7niv.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751349949/AI-trong-y-te-FPT-IS-1743578295_sckcwe.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350810/chuyen-doi-so-y-te-la-gi_nsc6nh.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350810/chuyen-doi-so-y-te-la-gi_nsc6nh.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350810/chuyen-doi-so-y-te-la-gi_nsc6nh.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350810/chuyen-doi-so-y-te-la-gi_nsc6nh.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350810/chuyen-doi-so-y-te-la-gi_nsc6nh.png",

    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350810/chuyen-doi-so-y-te-la-gi_nsc6nh.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350936/thep-y-te-khong-gi_mrwmmv.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350970/y-te-thong-minh_xbuiuo.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751351009/image-placeholder-2_c7wlwr.svg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751351009/image-placeholder-2_c7wlwr.svg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751351009/image-placeholder-2_c7wlwr.svg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751351009/image-placeholder-2_c7wlwr.svg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751351009/image-placeholder-2_c7wlwr.svg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751351009/image-placeholder-2_c7wlwr.svg",

    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751351009/image-placeholder-2_c7wlwr.svg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751351077/yte-169761547644062967963_yxutpg.jpg",
  ];
  return (
    <div className="relative mx-auto flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
        Sức khỏe của bạn là{" "}
        <span className="relative z-20 inline-block rounded-xl bg-green-500/40 px-4 py-1 text-white underline decoration-emerald-400 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
          ưu tiên
        </span>{" "}
        hàng đầu của chúng tôi.
      </h2>

      <div className="absolute inset-0 z-10 h-full w-full bg-black/50 dark:bg-black/60" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
