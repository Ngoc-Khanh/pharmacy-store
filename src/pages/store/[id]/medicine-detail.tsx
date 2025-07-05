import { MedicineDetailBreadcrumb, MedicineDetailImage, MedicineDetailInformation, MedicineDetailRelated, MedicineDetailReviews, MedicineDetailSkeleton, MedicineDetailTabs } from "@/components/pages/store/medicine";
import { siteConfig } from "@/config";
import { useMedicineDetail } from "@/hooks/use-medicine-detail";
import { useSimilarMedicines } from "@/hooks/use-similar-medicines";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

export default function MedicineDetailPage() {
  const { id } = useParams();
  const { data: medicine, isLoading } = useMedicineDetail(id!);
  const { data: similarMedicinesData, isLoading: isSimilarLoading, error: similarError } = useSimilarMedicines(id!);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  if (isLoading) return <MedicineDetailSkeleton />

  return (
    <div className="container py-2">
      <Helmet>
        <title>{`${medicine?.name} | ${siteConfig.name}`}</title>
      </Helmet>
      {/* Breadcrumb */}
      <MedicineDetailBreadcrumb id={id!} name={medicine?.name} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image Section */}
        <MedicineDetailImage
          imageUrl={medicine?.thumbnail?.url || ""}
          imageAlt={medicine?.thumbnail?.alt || medicine?.name || "Thuốc"}
          stockStatus={medicine?.variants?.stockStatus}
          discountPercent={medicine?.variants?.discountPercent}
        />

        {/* Product Info Section */}
        <MedicineDetailInformation
          medicine={medicine!}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
      </div>

      {/* Product Tabs */}
      <MedicineDetailTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        details={medicine?.details}
        usageguide={medicine?.usageguide}
        supplier={medicine?.supplier}
        categoryName={medicine?.category?.title}
        updatedAt={medicine?.updatedAt}
      />

      {/* Reviews Section */}
      <MedicineDetailReviews
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
      <MedicineDetailRelated
        medicines={similarMedicinesData?.similarMedicines}
        isLoading={isSimilarLoading}
        error={similarError}
      />
    </div>
  );
}