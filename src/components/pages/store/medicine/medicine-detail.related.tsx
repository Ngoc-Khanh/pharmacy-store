import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { routes } from "@/config";
import { StockStatus } from "@/data/enums";
import { SimilarMedicine } from "@/data/interfaces";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import { Eye, Plus, ShoppingCart, Star, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface MedicineDetailRelatedProps {
  medicines?: SimilarMedicine[];
  isLoading?: boolean;
  error?: Error | null;
}

function RelatedMedicineSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <Card className="overflow-hidden h-full flex flex-col">
            <div className="relative pt-[100%] bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
              <Skeleton className="absolute inset-0" />
            </div>
            <CardContent className="flex flex-col flex-grow p-6">
              <Skeleton className="h-6 w-full mb-3" />
              <div className="flex items-center mb-3 gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-4 rounded-full" />
                ))}
              </div>
              <div className="flex items-center justify-between mt-auto">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export function MedicineDetailRelated({ medicines, isLoading, error }: MedicineDetailRelatedProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleAddToCart = async (medicine: SimilarMedicine, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setAddingToCart(medicine.id);
      await addToCart({ medicine, quantity: 1 });
    } catch (error) {
      console.error("Lỗi thêm vào giỏ hàng:", error);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleViewDetail = (medicineId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(routes.store.medicineDetails(medicineId));
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center py-12"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-emerald-600/20 blur-3xl" />
          <h2 className="relative text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700">
            <Sparkles className="inline-block w-8 h-8 mr-3 text-emerald-500" />
            Sản phẩm tương tự
          </h2>
        </div>
        <p className="text-muted-foreground">Không thể tải sản phẩm tương tự. Vui lòng thử lại sau.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative"
    >
      {/* Background decoration */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700"
          >
            <Sparkles className="inline-block w-8 h-8 mr-3 text-emerald-500" />
            Sản phẩm tương tự
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full"
          />
        </div>
        
        {isLoading ? (
          <RelatedMedicineSkeleton />
        ) : medicines && medicines.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {medicines.map((medicine, index) => (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.1 * index,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                onHoverStart={() => setHoveredCard(medicine.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card className="overflow-hidden h-full flex flex-col bg-gradient-to-br from-background via-background/95 to-background/90 border-muted hover:border-teal-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10 group cursor-pointer backdrop-blur-sm">
                  <div className="relative pt-[100%] bg-gradient-to-br from-slate-50 via-white to-slate-50/50 dark:from-slate-900/50 dark:via-slate-900/30 dark:to-slate-900/20 overflow-hidden">
                    {/* Image with enhanced hover effect */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <motion.img
                        src={medicine.thumbnail?.url || ""}
                        alt={medicine.thumbnail?.alt || medicine.name}
                        className="object-cover w-full h-full rounded-lg transition-all duration-700 group-hover:scale-110"
                        loading="lazy"
                        animate={hoveredCard === medicine.id ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Similarity Score Badge with animation */}
                    {medicine.similarityScore && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + 0.1 * index }}
                        className="absolute top-3 right-3 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20"
                      >
                        <Sparkles className="inline-block w-3 h-3 mr-1" />
                        {Math.round(medicine.similarityScore * 100)}%
                      </motion.div>
                    )}

                    {/* Enhanced Action Buttons Overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
                      initial={false}
                      animate={hoveredCard === medicine.id ? { opacity: 1 } : { opacity: 0 }}
                    >
                      <motion.div 
                        className="flex gap-3"
                        initial={{ y: 20, opacity: 0 }}
                        animate={hoveredCard === medicine.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/95 hover:bg-white text-gray-900 shadow-xl backdrop-blur-sm border border-white/50 transition-all duration-300 hover:scale-105"
                          onClick={(e) => handleViewDetail(medicine.id, e)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-xl backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
                          onClick={(e) => handleAddToCart(medicine, e)}
                          disabled={addingToCart === medicine.id}
                        >
                          {addingToCart === medicine.id ? (
                            <motion.div 
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>

                  <CardContent className="flex flex-col flex-grow p-6 relative">
                    {/* Subtle gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-50/20 to-emerald-50/20 dark:via-teal-950/10 dark:to-emerald-950/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <div className="relative z-10">
                      <Link
                        to={routes.store.medicineDetails(medicine.id)}
                        className="font-semibold text-lg line-clamp-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-600 hover:to-emerald-600 cursor-pointer transition-all duration-300 min-h-[3.5rem] flex items-start mb-3"
                      >
                        {medicine.name}
                      </Link>
                      
                      {/* Enhanced Rating */}
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.1 * i + 0.3 + 0.1 * index }}
                            >
                              <Star 
                                className={`h-4 w-4 transition-colors duration-300 ${
                                  i < Math.floor(medicine.ratings?.star || 0) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2 font-medium">
                          {(medicine.ratings?.star || 0).toFixed(1)}
                        </span>
                        {medicine.ratings?.reviewCount && (
                          <span className="text-xs text-muted-foreground ml-1">
                            ({medicine.ratings.reviewCount})
                          </span>
                        )}
                      </div>
                      
                      {/* Enhanced Price Section */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          {medicine.variants?.originalPrice && medicine.variants.originalPrice > medicine.variants.price && (
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-muted-foreground line-through">
                                {formatCurrency(medicine.variants.originalPrice)}
                              </span>
                              {medicine.variants.discountPercent && (
                                <motion.span 
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.4 + 0.1 * index }}
                                  className="text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-0.5 rounded-full font-medium shadow-sm"
                                >
                                  -{medicine.variants.discountPercent}%
                                </motion.span>
                              )}
                            </div>
                          )}
                          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700">
                            {formatCurrency(medicine.variants?.price || 0)}
                          </span>
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white md:hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          onClick={(e) => handleAddToCart(medicine, e)}
                          disabled={addingToCart === medicine.id}
                        >
                          {addingToCart === medicine.id ? (
                            <motion.div 
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Thêm
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Enhanced Stock Status */}
                      {medicine.variants?.stockStatus && (
                        <motion.div 
                          className="mt-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + 0.1 * index }}
                        >
                          <span className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
                            medicine.variants.stockStatus === StockStatus.IN_STOCK 
                              ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200' 
                              : medicine.variants.stockStatus === StockStatus.PRE_ORDER
                              ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border border-yellow-200'
                              : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200'
                          }`}>
                            {medicine.variants.stockStatus === StockStatus.IN_STOCK && '✨ Còn hàng'}
                            {medicine.variants.stockStatus === StockStatus.PRE_ORDER && '⏳ Đặt trước'}
                            {medicine.variants.stockStatus === StockStatus.OUT_OF_STOCK && '❌ Hết hàng'}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-teal-500" />
            </div>
            <p className="text-muted-foreground text-lg">Không tìm thấy sản phẩm tương tự.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
