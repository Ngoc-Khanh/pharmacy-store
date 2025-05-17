import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { routes } from "@/config"
import { Medicine } from "@/data/interfaces"
import { addToCartAtom, cartAtom, initCartAtom } from "@/atoms/cart.atom"

import { useAtom } from "jotai"
import { Heart, PhoneCall, ShoppingCart, Star, Truck } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

interface MedicineCardProps {
  medicine: Medicine,
  hoveredMedicineId: string | null,
  onHover: (id: string | null) => void
}

export function MedicineCard({ medicine, hoveredMedicineId, onHover }: MedicineCardProps) {
  const [, addToCart] = useAtom(addToCartAtom);
  const [cart] = useAtom(cartAtom);
  const [, initCart] = useAtom(initCartAtom);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Khởi tạo giỏ hàng khi component mount
  useEffect(() => {
    const loadCart = async () => {
      await initCart();
    };
    loadCart();
  }, [initCart]);

  // Kiểm tra nếu medicine thiếu thuộc tính cần thiết
  if (!medicine?.id || !medicine?.variants) {
    return null; // Không hiển thị thẻ sản phẩm không hợp lệ
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (medicine.variants.stockStatus === "OUT-OF-STOCK") {
      toast.error("Sản phẩm hiện đã hết hàng");
      return;
    }

    // Kiểm tra số lượng giới hạn
    const limitQuantity = medicine.variants.limitQuantity || Infinity;

    // Tìm số lượng sản phẩm này đã có trong giỏ hàng
    const existingItem = cart.find(item => item?.medicine?.id === medicine.id);
    const currentQuantity = existingItem?.quantity || 0;

    // Kiểm tra nếu thêm 1 sản phẩm có vượt quá giới hạn không
    if (currentQuantity + 1 > limitQuantity) {
      toast.error(`Không thể thêm vào giỏ hàng. Đã đạt số lượng tối đa (${limitQuantity})`);
      return;
    }

    // Hiện hiệu ứng đã thêm vào giỏ hàng
    setIsAddingToCart(true);

    try {
      // Thêm vào giỏ hàng với số lượng mặc định là 1
      await addToCart({ medicine, quantity: 1 });

      // Hiển thị thông báo thành công
      toast.success(`Đã thêm ${medicine.name} vào giỏ hàng`);
    } catch (error) {
      // Lỗi đã được xử lý trong atom, chỉ cần đảm bảo reset trạng thái UI
      console.error(error);
    } finally {
      // Tự động ẩn hiệu ứng sau 500ms
      setTimeout(() => setIsAddingToCart(false), 500);
    }
  };

  // Kiểm tra xem có thể thêm tiếp vào giỏ hàng không
  const existingItem = cart.find(item => item?.medicine?.id === medicine.id);
  const currentQuantity = existingItem?.quantity || 0;
  const limitQuantity = medicine.variants.limitQuantity || Infinity;
  const isMaxQuantityReached = currentQuantity >= limitQuantity;

  return (
    <Card
      className="overflow-hidden h-full flex flex-col group bg-background/50 backdrop-blur-sm border-muted hover:border-emerald-500/20 transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => onHover(medicine.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Link to={routes.store.medicineDetails(medicine.id)} className="flex-grow">
        <div className="relative pt-[100%] bg-gray-100 dark:bg-gray-800/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={medicine.thumbnail?.url || ""}
              alt={medicine.thumbnail?.alt || "Product Image"}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Discount badge */}
          {medicine.variants.discountPercent && medicine.variants.discountPercent > 0 && (
            <Badge className={`absolute top-2 left-2 bg-emerald-500 text-white hover:bg-emerald-600`}>
              -{medicine.variants.discountPercent}%
            </Badge>
          )}

          {/* Stock badge */}
          {medicine.variants.stockStatus === "OUT-OF-STOCK" && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Hết hàng
            </Badge>
          )}

          {/* Limit Quantity badge */}
          {medicine.variants.stockStatus !== "OUT-OF-STOCK" && isMaxQuantityReached && (
            <Badge variant="secondary" className="absolute top-2 right-2 bg-amber-100 text-amber-800 border-amber-200">
              Đã đạt giới hạn
            </Badge>
          )}
        </div>

        <CardContent className="flex flex-col flex-grow p-4">
          <h3 className="font-medium line-clamp-2 hover:text-emerald-500 cursor-pointer mb-2 transition-colors group-hover:text-emerald-500">{medicine.name}</h3>

          <div className="flex items-center mt-auto">
            {[...Array(5)].map((_, i) => {
              const starValue = medicine.ratings?.star || 0;
              const isFullStar = i < Math.floor(starValue);
              const isHalfStar = !isFullStar && i === Math.floor(starValue) && starValue % 1 >= 0.5;

              return (
                <div key={i} className="relative">
                  <Star
                    className={`h-4 w-4 ${isFullStar || isHalfStar
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                      }`}
                    fill={isFullStar ? "currentColor" : "none"}
                  />
                  {isHalfStar && (
                    <div className="absolute inset-0 overflow-hidden w-[50%]">
                      <Star
                        className="h-4 w-4 text-yellow-400 fill-yellow-400"
                      />
                    </div>
                  )}
                </div>
              );
            })}
            <span className="text-xs text-muted-foreground ml-1">
              ({(medicine.ratings?.star || 0).toFixed(1)})
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
              {medicine.variants.discountPercent && medicine.variants.discountPercent > 0 && (
                <span className="text-sm line-through text-muted-foreground">
                  {Math.floor((medicine.variants.price || 0) / (1 - medicine.variants.discountPercent / 100)).toLocaleString()}₫
                </span>
              )}
              <span className="font-bold text-emerald-500">{(medicine.variants.price || 0).toLocaleString()}₫</span>
            </div>
            {medicine.variants.stockStatus === "IN-STOCK" ? (
              <div className="flex items-center text-xs text-emerald-500">
                <Truck className="h-3 w-3 mr-1" />
                <span className="font-medium">Có sẵn</span>
              </div>
            ) : (
              <div className="flex items-center text-xs text-gray-400">
                <PhoneCall className="h-3 w-3 mr-1" />
                <span className="font-medium">Liên hệ</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>

      {/* Quick action buttons */}
      <div className={`absolute right-2 top-2 transition-all duration-300 flex flex-col gap-2 ${hoveredMedicineId === medicine.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md">
          <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
          onClick={handleAddToCart}
          disabled={medicine.variants.stockStatus === "OUT-OF-STOCK" || isAddingToCart || isMaxQuantityReached}
        >
          <ShoppingCart className={`h-4 w-4 ${isAddingToCart ? 'animate-ping text-green-600' : 'text-green-500 fill-green-500'}`} />
        </Button>
      </div>

      {/* Hover showing */}
      <div className={`mt-3 px-4 pb-4 transition-all duration-300 ${hoveredMedicineId === medicine.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Button
          className="w-full text-sm h-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white relative overflow-hidden"
          onClick={handleAddToCart}
          disabled={medicine.variants.stockStatus === "OUT-OF-STOCK" || isAddingToCart || isMaxQuantityReached}
        >
          {isAddingToCart && (
            <span className="absolute inset-0 flex items-center justify-center bg-green-600 animate-pulse">
              Đã thêm!
            </span>
          )}
          <span className={isAddingToCart ? 'opacity-0' : 'opacity-100'}>
            {isMaxQuantityReached ? 'Đã đạt giới hạn' : 'Thêm vào giỏ'}
          </span>
        </Button>
      </div>
    </Card>
  )
}
