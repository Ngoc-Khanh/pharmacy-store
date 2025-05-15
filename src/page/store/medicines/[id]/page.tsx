import { routeNames, routes, siteConfig } from "@/config";
import { useMedicineDetails } from "@/hooks/use-medicine-details";

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { MedicineDetailsBreadcrumb } from "./[id].medicine-breadcrumb";
import { MedicineDetailsImage } from "./[id].medicine-image";
import { MedicineDetailsInfo } from "./[id].medicine-info";
import { MedicineDetailsRelated } from "./[id].medicine-related";
import { MedicineDetailsReviews } from "./[id].medicine-reviews";
import { MedicineDetailsSkeleton } from "./[id].medicine-skeleton";
import { MedicineDetailsTabs } from "./[id].medicine-tabs";

export default function MedicineDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: medicine, isLoading } = useMedicineDetails(id || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  if (isLoading) {
    return <MedicineDetailsSkeleton />;
  }

  return (
    <div className="container py-8">
      <Helmet>
        <title>{`${routeNames[routes.store.medicineDetails(id || "")]} | ${siteConfig.name}`}</title>
      </Helmet>

      {/* Breadcrumb */}
      <div className="mb-6">
        <MedicineDetailsBreadcrumb id={id || ""} name={medicine?.name || ""} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image Section */}
        <MedicineDetailsImage
          imageUrl={medicine?.thumbnail.url || ""}
          imageAlt={medicine?.thumbnail.alt || ""}
          discountPercent={medicine?.variants.discountPercent}
          stockStatus={medicine?.variants.stockStatus || "OUT-OF-STOCK"}
        />

        {/* Product Info Section */}
        <MedicineDetailsInfo
          medicine={medicine!}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
      </div>

      {/* Product Tabs */}
      <MedicineDetailsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        details={medicine?.details}
        usageguide={medicine?.usageguide}
        categoryName={medicine?.category?.title}
        updatedAt={medicine?.updatedAt}
      />

      {/* Reviews Section */}
      <MedicineDetailsReviews
        star={medicine?.ratings?.star || 0}
        reviewCount={medicine?.ratings?.reviewCount || 0}
        reviews={[
          {
            name: "Nguyễn Văn A",
            avatar: "https://i.pravatar.cc/100?img=1",
            rating: 5,
            time: "2 ngày trước",
            content: "Sản phẩm rất tốt, đóng gói cẩn thận, giao hàng nhanh. Tôi đã dùng và thấy hiệu quả."
          },
          {
            name: "Trần Thị B",
            avatar: "https://i.pravatar.cc/100?img=2",
            rating: 4,
            time: "1 tuần trước",
            content: "Thuốc uống dễ, không đắng. Giảm đau khá nhanh sau khi uống."
          }
        ]}
      />

      {/* Related Products */}
      <MedicineDetailsRelated
        medicines={[
          {
            id: "1",
            name: "Sản phẩm tương tự 1",
            imageUrl: "https://source.unsplash.com/random/400x400?medicine&1",
            price: 120000,
            rating: 4.0,
            reviewCount: 12
          },
          {
            id: "2",
            name: "Sản phẩm tương tự 2",
            imageUrl: "https://source.unsplash.com/random/400x400?medicine&2",
            price: 135000,
            rating: 4.5,
            reviewCount: 8
          },
          {
            id: "3",
            name: "Sản phẩm tương tự 3",
            imageUrl: "https://source.unsplash.com/random/400x400?medicine&3",
            price: 150000,
            rating: 4.2,
            reviewCount: 15
          },
          {
            id: "4",
            name: "Sản phẩm tương tự 4",
            imageUrl: "https://source.unsplash.com/random/400x400?medicine&4",
            price: 165000,
            rating: 4.8,
            reviewCount: 20
          }
        ]}
      />
    </div>
  );
}

