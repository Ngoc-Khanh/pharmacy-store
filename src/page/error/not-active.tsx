import { userAtom } from "@/atoms/auth.atom";
import { Button } from "@/components/ui/button";
import { routes, siteConfig } from "@/config";
import { useAtomValue } from "jotai";
import { ArrowLeft, Home, Lock, ShieldX } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function NotActivePage() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-red-950/20 dark:via-gray-900 dark:to-orange-950/20 relative overflow-hidden'>
      <Helmet>
        <title>
          Tài khoản {user ? user.email : "Người dùng"} chưa được kích hoạt | {siteConfig.name}
        </title>
      </Helmet>
      <div className='flex min-h-screen items-center justify-center px-6 py-12'>
        <div className='w-full max-w-lg mx-auto'>
          <div className='flex flex-col items-center text-center space-y-8'>
            {/* Icon và Animation */}
            <div className='relative'>
              <div className='animate-pulse absolute -inset-4 bg-red-100 dark:bg-red-900/20 rounded-full blur-xl'></div>
              <div className='relative bg-white dark:bg-gray-800 p-6 rounded-full shadow-2xl border border-red-100 dark:border-red-800'>
                <ShieldX className='h-16 w-16 text-red-500' />
              </div>
            </div>

            {/* Error Code */}
            <div className='space-y-4'>
              <h1 className='text-7xl md:text-8xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent leading-none'>
                401
              </h1>
              <div className='flex items-center justify-center gap-2'>
                <Lock className='h-5 w-5 text-red-500' />
                <span className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
                  Không Có Quyền Truy Cập
                </span>
              </div>
            </div>

            {/* User Greeting & Message */}
            <div className='space-y-4 max-w-md'>
              {user && (
                <div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800'>
                  <p className='text-blue-700 dark:text-blue-400 font-medium'>
                    Xin chào, <span className='font-bold'>{user.email}</span>!
                  </p>
                </div>
              )}

              <p className='text-gray-600 dark:text-gray-400 text-lg leading-relaxed'>
                {user ?
                  'Tài khoản của bạn chưa được kích hoạt hoặc không có quyền truy cập vào trang này.' :
                  'Vui lòng đăng nhập với thông tin xác thực phù hợp để truy cập tài nguyên này.'
                }
              </p>

              <div className='p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
                <p className='text-sm text-red-700 dark:text-red-400'>
                  Liên hệ với quản trị viên để được hỗ trợ kích hoạt tài khoản.
                </p>
              </div>
            </div>            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 w-full max-w-sm'>
              <Button
                variant='outline'
                onClick={() => history.go(-1)}
                className='flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600'
              >
                <ArrowLeft className='h-4 w-4' />
                Quay Lại
              </Button>
              <Button
                onClick={() => navigate(routes.auth.login)}
                className='flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0'
              >
                <Home className='h-4 w-4' />
                {user ? 'Đăng Xuất' : 'Về Trang Chủ'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className='absolute top-10 left-10 w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full blur-xl animate-pulse'></div>
      <div className='absolute bottom-10 right-10 w-32 h-32 bg-orange-100 dark:bg-orange-900/20 rounded-full blur-xl animate-pulse delay-1000'></div>
      <div className='absolute top-1/3 right-20 w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full blur-xl animate-pulse delay-500'></div>
    </div>
  )
}