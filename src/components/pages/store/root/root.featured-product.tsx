import { ProductCardSkeleton, RootProductCard } from "@/components/pages/store/root";
import { MedicineResponse } from "@/data/interfaces";
import { Suspense } from "react";

interface RootFeaturedProductProps {
  medicines: MedicineResponse[];
}

export function RootFeaturedProduct({ medicines }: RootFeaturedProductProps) {
  return (
    <section className="container py-6">
      <div className="">
        <h2 className="font-semibold text-2xl md:text-3xl mb-1 md:mb-3">
          Sản phẩm nổi bật
        </h2>
        <p className="max-w-4xl text-sm md:text-md leading-[1.5] tracking-[-2%] mb-2">
          Sản phẩm nổi bật được chọn lọc để đáp ứng nhu cầu của bạn.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 py-5 overflow-auto">
        <Suspense
          fallback={[...Array(4)].map((_, index) => (
            <ProductCardSkeleton key={`Product-Skeleton-${index}`} />
          ))}
        >
          {medicines.map((medicine) => (
            <RootProductCard key={`medicine-card-${medicine.id}`} medicine={medicine} />
          ))}
        </Suspense>
      </div>
    </section>
  );
}