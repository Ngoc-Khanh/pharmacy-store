import { routes, siteConfig } from "@/config";
import { Award, Clock, Heart, Mail, MapPin, Phone, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export function StoreFooter() {
  return (
    <footer className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Heart className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{siteConfig.name}</h3>
                <p className="text-emerald-200 text-sm">Nhà thuốc uy tín hàng đầu</p>
              </div>
            </div>
            <p className="text-emerald-100 mb-6 leading-relaxed">
              Nhà thuốc uy tín hàng đầu Việt Nam, cung cấp các sản phẩm chăm sóc sức khỏe chất lượng cao với đội ngũ AI chuyên nghiệp.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-300" />
                <span className="text-emerald-100">info@pharmacare.vn</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-300" />
                <span className="text-emerald-100">1900-1234</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-300" />
                <span className="text-emerald-100">123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-emerald-300" />
                <span className="text-emerald-100">Mở cửa 24/7</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Liên kết nhanh</h4>
            <ul className="space-y-3">
              <li><Link to={routes.store.root} className="text-emerald-200 hover:text-white transition-colors flex items-center gap-2">Trang chủ</Link></li>
              <li><Link to={routes.store.categories} className="text-emerald-200 hover:text-white transition-colors">Danh mục thuốc</Link></li>
              <li><Link to={routes.store.consultation} className="text-emerald-200 hover:text-white transition-colors">Tư vấn AI</Link></li>
              <li><Link to={routes.store.account.root} className="text-emerald-200 hover:text-white transition-colors">Tài khoản</Link></li>
              <li><Link to={routes.store.account.root} className="text-emerald-200 hover:text-white transition-colors">Giỏ hàng</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Dịch vụ</h4>
            <ul className="space-y-3">
              <li className="text-emerald-200 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Thuốc chính hãng
              </li>
              <li className="text-emerald-200 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Giao hàng nhanh
              </li>
              <li className="text-emerald-200 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Tư vấn chuyên nghiệp
              </li>
              <li className="text-emerald-200 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Hỗ trợ 24/7
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-emerald-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-emerald-200 text-sm">
              © 2025 {siteConfig.name}. Created by ❤ <Link to={siteConfig.links.github} className="hover:text-white transition-colors">Ngoc Khanh</Link>.
            </p>
            <div className="flex items-center gap-6 text-sm text-emerald-200">
              <span>GPP: 1234-567-890</span>
              <span>•</span>
              <Link to="/privacy" className="hover:text-white transition-colors">Bảo mật</Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-white transition-colors">Điều khoản</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}