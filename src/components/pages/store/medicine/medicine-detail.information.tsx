import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/config";
import { StockStatus } from "@/data/enums";
import { MedicineResponse } from "@/data/interfaces";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import { Clock, Heart, Info, Minus, Plus, Shield, ShoppingCart, Star, Truck } from "lucide-react";
import { motion } from 'motion/react';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
interface MedicineDetailInformationProps {
  medicine: MedicineResponse;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function MedicineDetailInformation({ medicine, quantity, onQuantityChange }: MedicineDetailInformationProps) {
  const { cart, addToCart, initCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Khởi tạo giỏ hàng khi component mount
  useEffect(() => {
    const loadCart = async () => {
      await initCart();
    };
    loadCart();
  }, [initCart]);

  // Kiểm tra nếu medicine thiếu thuộc tính cần thiết
  if (!medicine?.id || !medicine?.variants) {
    console.error('Đối tượng sản phẩm không hợp lệ', medicine);
    return (
      <div className="p-6 text-center">
        <div className="text-red-500">
          Thông tin sản phẩm không hợp lệ
        </div>
      </div>
    );
  }

  // Kiểm tra số lượng và giới hạn
  const currentCartQuantity = cart.find(item => item?.medicine?.id === medicine.id)?.quantity || 0;
  const maxBuyLimit = medicine.variants.limitQuantity ?? Infinity;
  const stockQuantity = medicine.variants.quantity ?? 0;
  
  // Tính số lượng còn có thể mua
  const maxFromLimit = maxBuyLimit === Infinity ? stockQuantity : maxBuyLimit - currentCartQuantity;
  const remainingBuyQuantity = Math.min(maxFromLimit, stockQuantity);

  const handleAddToCart = async () => {
    // Kiểm tra điều kiện cơ bản
    if (!medicine.id) return toast.error("Dữ liệu sản phẩm không hợp lệ");
    if (medicine.variants.stockStatus === StockStatus.OUT_OF_STOCK || stockQuantity <= 0) {
      return toast.error("Sản phẩm hiện đã hết hàng");
    }
    try {
      const addQuantity = Math.min(quantity, remainingBuyQuantity);
      if (addQuantity <= 0) {
        const errorMsg = stockQuantity <= 0 ? "Sản phẩm đã hết hàng" 
          : maxBuyLimit !== Infinity && currentCartQuantity >= maxBuyLimit 
            ? `Đã đạt giới hạn mua tối đa (${maxBuyLimit})`
            : "Không thể thêm vào giỏ hàng";
        return toast.error(errorMsg);
      }
      await addToCart({ medicine, quantity: addQuantity });
      let message = `Đã thêm ${addQuantity} ${medicine.name} vào giỏ hàng`;
      if (addQuantity < quantity) {
        message += addQuantity === stockQuantity ? " (đã hết hàng)" : " (đạt giới hạn mua)";
      }
      toast.success(message);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <motion.div
      className="flex flex-col bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/80 dark:to-slate-900/30 rounded-2xl p-6 shadow-lg"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-2">
        <Link to={routes.store.categories} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
          <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
          {medicine?.category?.title}
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
        {medicine?.name}
      </h1>

      {/* Ratings */}
      <div className="flex items-center mb-5">
        <div className="flex mr-2">
          {[...Array(5)].map((_, i) => {
            const starValue = medicine.ratings?.star || 0;
            const isFullStar = i < Math.floor(starValue);
            const isHalfStar = !isFullStar && i === Math.floor(starValue) && starValue % 1 >= 0.5;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <Star
                  className={`h-4 w-4 ${isFullStar || isHalfStar ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill={isFullStar ? "currentColor" : "none"}
                />
                {isHalfStar && (
                  <div className="absolute inset-0 overflow-hidden w-[50%]">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
        <span className="text-sm text-muted-foreground">
          {medicine.ratings?.star?.toFixed(1) || "0.0"} ({medicine.ratings?.reviewCount || 0} đánh giá)
        </span>
        <Separator orientation="vertical" className="mx-3 h-4" />
        <span className="text-sm text-muted-foreground flex items-center">
          <Heart className="h-3.5 w-3.5 mr-1 text-pink-500" />
          <span className="text-sm text-pink-500">
            {medicine.ratings?.liked || 0} lượt thích
          </span>
        </span>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
            {formatCurrency(medicine.variants.price || 0)}
          </span>
          {medicine.variants.discountPercent && medicine.variants.discountPercent > 0 && (
            <span className="text-lg line-through text-muted-foreground">
              {formatCurrency(medicine.variants.originalPrice ?? 0)}
            </span>
          )}
        </div>
        {medicine.variants.discountPercent && medicine.variants.discountPercent > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-yellow-600 dark:text-yellow-300 flex items-center"
          >
            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
            Tiết kiệm: {medicine.variants.originalPrice !== undefined && medicine.variants.price !== undefined ? formatCurrency(medicine.variants.originalPrice - medicine.variants.price) : 'N/A'}
          </motion.p>
        )}
      </div>

      <Separator className="mb-6" />

      {/* Product Description */}
      <p className="text-muted-foreground leading-relaxed mb-6">
        {medicine.description || "Không có mô tả"}
      </p>

      {/* Quantity Selector */}
      <div className="flex items-center mb-6">
        <span className="text-base font-medium mr-4 min-w-[80px]">Số lượng:</span>
        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-none border-r hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            onClick={() => onQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="h-12 w-16 flex items-center justify-center font-medium bg-white dark:bg-slate-800">
            {quantity}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-none border-l hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            onClick={() => onQuantityChange(quantity + 1)}
            disabled={quantity >= remainingBuyQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="ml-4 flex flex-col">
          <span className="text-sm text-muted-foreground">
            {medicine.variants.quantity !== undefined ? `Tồn kho: ${medicine.variants.quantity}` : "Không có thông tin tồn kho"}
          </span>
          <span className="text-sm text-muted-foreground">
            {medicine.variants.limitQuantity ? `Giới hạn mua: ${medicine.variants.limitQuantity}` : "Không giới hạn mua"}
          </span>
          {currentCartQuantity > 0 && (
            <span className="text-xs text-amber-600">
              (Đã có {currentCartQuantity} trong giỏ hàng{remainingBuyQuantity !== Infinity ? `, còn mua được ${remainingBuyQuantity}` : ''})
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <Button
          size="lg"
          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
          disabled={medicine.variants.stockStatus === StockStatus.OUT_OF_STOCK || stockQuantity <= 0 || remainingBuyQuantity <= 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> 
          {!isAuthenticated ? "Đăng nhập để mua" : 
           stockQuantity <= 0 ? "Hết hàng" :
           remainingBuyQuantity <= 0 ? "Đã đạt giới hạn" : "Thêm vào giỏ"}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-xl hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-900/20 shadow-sm"
        >
          <Heart className="h-6 w-6 text-pink-500" />
        </Button>
      </div>

      {/* Product features */}
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            icon: Truck,
            title: "Giao hàng nhanh",
            description: "2-3 ngày giao hàng",
            color: "emerald"
          },
          {
            icon: Shield,
            title: "Đảm bảo chất lượng",
            description: "Sản phẩm chính hãng",
            color: "blue"
          },
          {
            icon: Clock,
            title: "Hạn sử dụng",
            description: "Còn hạn tối thiểu 6 tháng",
            color: "yellow"
          },
          {
            icon: Info,
            title: "Tư vấn 24/7",
            description: "Hỗ trợ dược sĩ tư vấn",
            color: "purple"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center p-3 rounded-xl bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className={`h-10 w-10 rounded-full bg-${feature.color}-100 dark:bg-${feature.color}-900/30 flex items-center justify-center mr-3`}>
              <feature.icon className={`h-5 w-5 text-${feature.color}-600`} />
            </div>
            <div>
              <h4 className="text-sm font-medium">{feature.title}</h4>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}