import { Icons } from "@/components/custom/icons";

export function RootDifferentFeatureCards() {
  const features = [
    {
      Icon: Icons.cart,
      title: "Đặt hàng nhanh chóng",
      description:
        "Hệ thống đặt hàng online tiện lợi, giao hàng tận nơi trong 24h.",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      iconBg: "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50"
    },
    {
      Icon: Icons.tag,
      title: "Giá cả minh bạch",
      description:
        "Chúng tôi cam kết về giá cả rõ ràng, không phát sinh chi phí ẩn. Mọi thông tin giá đều công khai và cạnh tranh.",
      gradient: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      iconBg: "bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50"
    },
    {
      Icon: Icons.package,
      title: "Nguồn gốc rõ ràng",
      description:
        "Chỉ hợp tác với các nhà cung cấp uy tín, thuốc chính hãng có đầy đủ giấy tờ pháp lý.",
      gradient: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      iconBg: "bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/50 dark:to-violet-900/50"
    },
    {
      Icon: Icons.award,
      title: "Tư vấn chuyên nghiệp",
      description:
        "Đội ngũ dược sĩ giàu kinh nghiệm sẵn sàng tư vấn và hỗ trợ khách hàng 24/7.",
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      iconBg: "bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/50 dark:to-red-900/50"
    },
  ];

  return (
    <section className="max-w-[1920px] py-6 mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5 gap-y-8 gap-x-5 md:gap-12">
      {features.map(({ Icon, title, description }, index) => (
        <div
          className="text-center max-w-[18rem]"
          key={`FeatureCards_${index}`}
        >
          <div className="flex justify-center items-center p-5">
            <Icon
              width={45}
              height={45}
              className="mb-3 text-green-600 dark:text-green-400 font-light"
            />
          </div>
          <h4 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-300 leading-tight">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
        </div>
      ))}
    </section>
  );
}