import { Activity, FilePenLine, FileX2, HeartPulse, Microscope } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import { Section } from "@/components/custom/section";


const features = [
  {
    Icon: FileX2,
    name: "Thuốc không kê đơn",
    description: "Thuốc giảm đau, hạ sốt (Paracetamol, Ibuprofen, Aspirin), Thuốc ho, cảm cúm, Thuốc tiêu hóa (đầy hơi, khó tiêu, tiêu chảy, táo bón), Thuốc chống dị ứng (kháng histamin), Vitamin & khoáng chất",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: FilePenLine,
    name: "Thuốc kê đơn",
    description: "Thuốc tim mạch, huyết áp, Thuốc điều trị tiểu đường, Thuốc kháng sinh, Thuốc an thần, chống trầm cảm, Thuốc xương khớp",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: HeartPulse,
    name: "Thực phẩm chức năng & bổ sung dinh dưỡng",
    description: "Vitamin tổng hợp, Tăng cường miễn dịch (Vitamin C, kẽm, Omega-3), Hỗ trợ xương khớp (Glucosamine, Canxi), Hỗ trợ tim mạch, huyết áp, Bổ sung cho bà bầu, mẹ và bé",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Activity,
    name: "Chăm sóc cá nhân & sắc đẹp",
    description: "Chống nắng, kem trị mụn, Dầu gội, dầu xả, dưỡng tóc, Sản phẩm chăm sóc răng miệng (kem đánh răng, nước súc miệng), Sản phẩm vệ sinh phụ nữ",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Microscope,
    name: "Thiết bị y tế & dụng cụ chăm sóc sức khỏe",
    description: "Máy đo huyết áp, nhiệt kế, Băng gạc, thuốc sát trùng, Khẩu trang, găng tay y tế, Dụng cụ hỗ trợ hô hấp (máy xông khí dung, máy tạo oxy)",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export const Features = () => {
  return (
    <Section id="features">
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </Section>
  )
}