import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function RootLessIsMoreCard() {
  return (
    <section className="max-w-[1920px] mx-auto h-[620px] md:h-[580px] bg-[#E8F5E8] grid grid-cols-12 my-16">
      <div className="relative w-full h-[340px] md:h-[580px] col-span-12 md:col-span-8 overflow-hidden">
        <img
          src="https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751347964/allopathic-medicine_pl4qcg.jpg"
          alt="Thuốc chất lượng cao"
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="col-span-12 md:col-span-4 pb-6 md:py-20 px-6 md:px-16">
        <h2 className="text-xl md:text-3xl font-semibold mb-3 text-green-800">
          Sức khỏe là ưu tiên hàng đầu
        </h2>
        <p className="text-xs leading-[1.5] md:text-lg tracking-tight mb-5 md:mb-12 text-left max-w-md text-gray-700">
          Chúng tôi tin rằng mọi người đều xứng đáng được tiếp cận với những sản phẩm 
          chăm sóc sức khỏe chất lượng cao với mức giá hợp lý. Đó là lý do tại sao 
          chúng tôi cam kết cung cấp các sản phẩm dược phẩm đạt tiêu chuẩn quốc tế 
          với giá cả phải chăng cho mọi gia đình.
        </p>
        <Link
          to="/shop"
          className={cn(buttonVariants(), "rounded-full text-xs md:text-md bg-green-600 hover:bg-green-700")}
        >
          Khám phá ngay
        </Link>
      </div>
    </section>
  )
}