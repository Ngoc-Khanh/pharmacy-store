import { siteConfig } from "@/config";
import { Icons } from "@/components/icons";

export function MainFooter() {
  return (
    <footer className="border-grid border-t border-green-200 dark:border-green-800/50 bg-white dark:bg-gray-950 pt-16 pb-8">
      <div className="container-wrapper">
        <div className="container">
          {/* Footer content grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {/* Brand section */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2">
                <Icons.logo className="h-7 w-7 text-green-600 dark:text-green-400" />
                <span className="font-bold text-xl text-green-600 dark:text-green-400">
                  {siteConfig.name}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                Chăm sóc sức khỏe trực tuyến đáng tin cậy với dịch vụ giao hàng nhanh và tư vấn từ dược sĩ chuyên nghiệp.
              </p>
              <div className="flex gap-3">
                <a 
                  href="#"
                  target="_blank" 
                  rel="noreferrer"
                  className="h-9 w-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-4 w-4" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a 
                  href={siteConfig.links.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="h-9 w-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                >
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a 
                  href="#"
                  target="_blank" 
                  rel="noreferrer"
                  className="h-9 w-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-4 w-4" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </a>
              </div>
            </div>
            
            {/* Link sections */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Sản phẩm</h4>
              <ul className="space-y-2 text-sm">
                {["Thuốc kê đơn", "Thuốc không kê đơn", "Thực phẩm chức năng", "Chăm sóc cá nhân"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Công ty</h4>
              <ul className="space-y-2 text-sm">
                {["Về chúng tôi", "Dịch vụ", "Dược sĩ tư vấn", "Tuyển dụng"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm">
                {["Liên hệ", "Trung tâm trợ giúp", "Chính sách bảo mật", "Điều khoản dịch vụ"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Copyright section */}
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
              </p>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="text-green-600 dark:text-green-400">❤️</span> Built by{" "}
                <a
                  href={siteConfig.links.facebook || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline underline-offset-4"
                >
                  Krug
                </a>
                . The source code is available on{" "}
                <a
                  href="https://github.com/Ngoc-Khanh/pharmacy-store"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline underline-offset-4"
                >
                  GitHub
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}