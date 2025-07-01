import { Icons } from "@/components/custom/icons";

export function RootDifferentFeatureCards() {
  const features = [
    {
      Icon: Icons.cart,
      title: "Đặt hàng nhanh chóng",
      description:
        "Hệ thống đặt hàng online tiện lợi, giao hàng tận nơi trong 24h.",
    },
    {
      Icon: Icons.tag,
      title: "Giá cả minh bạch",
      description:
        "Chúng tôi cam kết về giá cả rõ ràng, không phát sinh chi phí ẩn. Mọi thông tin giá đều công khai và cạnh tranh.",
    },
    {
      Icon: Icons.package,
      title: "Nguồn gốc rõ ràng",
      description:
        "Chỉ hợp tác với các nhà cung cấp uy tín, thuốc chính hãng có đầy đủ giấy tờ pháp lý.",
    },
    {
      Icon: Icons.award,
      title: "Tư vấn chuyên nghiệp",
      description:
        "Đội ngũ dược sĩ giàu kinh nghiệm sẵn sàng tư vấn và hỗ trợ khách hàng 24/7.",
    },
  ];
  return (
    <section className="max-w-[1920px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5 gap-y-8 gap-x-5 md:gap-12">
      {features.map(({ Icon, title, description }, index) => (
        <div
          className="text-center max-w-[18rem]"
          key={`FeatureCards_${index}`}
        >
          <div className="flex justify-center items-center p-5">
            <Icon
              width={45}
              height={45}
              className="mb-3 text-green-600 font-light"
            />
          </div>
          <h4 className="text-xl font-semibold mb-4 text-green-800 leading-tight">{title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      ))}
    </section>
  );
}