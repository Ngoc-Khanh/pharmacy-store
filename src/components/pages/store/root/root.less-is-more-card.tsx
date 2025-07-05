import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function RootLessIsMoreCard() {
  return (
    <section className="max-w-[1920px] mx-auto h-[620px] md:h-[580px] bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950 grid grid-cols-12 my-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-200/30 dark:bg-green-900/30 rounded-full blur-3xl transform translate-x-32 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-900/20 rounded-full blur-3xl transform -translate-x-48 translate-y-24"></div>
      
      <div className="relative w-full h-[340px] md:h-[580px] col-span-12 md:col-span-8 overflow-hidden group">
        <img
          src="https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751347964/allopathic-medicine_pl4qcg.jpg"
          alt="Thuốc chất lượng cao"
          className="object-cover object-center w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out filter group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="col-span-12 md:col-span-4 pb-6 md:py-20 px-6 md:px-16 relative z-10 flex flex-col justify-center">
        <div className="space-y-6 transform hover:translate-y-[-4px] transition-transform duration-300">
          <div className="inline-block">
            <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4"></div>
          </div>
          
          <h2 className="text-xl md:text-3xl font-bold mb-3 text-green-800 dark:text-green-300 leading-tight bg-gradient-to-r from-green-700 to-emerald-600 dark:from-green-300 dark:to-emerald-400 bg-clip-text text-transparent">
            Sức khỏe là ưu tiên hàng đầu
          </h2>
          
          <p className="text-xs leading-[1.6] md:text-lg tracking-tight mb-8 text-left max-w-md text-gray-700 dark:text-gray-300 font-medium opacity-90 hover:opacity-100 transition-opacity duration-300">
            Chúng tôi tin rằng mọi người đều xứng đáng được tiếp cận với những sản phẩm 
            chăm sóc sức khỏe chất lượng cao với mức giá hợp lý. Đó là lý do tại sao 
            chúng tôi cam kết cung cấp các sản phẩm dược phẩm đạt tiêu chuẩn quốc tế 
            với giá cả phải chăng cho mọi gia đình.
          </p>
          
          <div className="relative inline-block group/button">
            <Link
              to={routes.store.categories}
              className={cn(
                buttonVariants(), 
                "relative rounded-full text-xs md:text-md font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-700 dark:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 text-white px-8 py-3 hover:translate-y-[-2px]"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                Khám phá ngay
                <svg className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}