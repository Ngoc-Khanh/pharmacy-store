import { Heart, PhoneCall, ShoppingCart, Star, Truck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Medicine } from "@/data/interfaces"
import { Link } from "react-router-dom"
import { routes } from "@/config"

interface MedicineCardProps {
  medicine: Medicine,
  hoveredMedicineId: string | null,
  onHover: (id: string | null) => void
}

export function MedicineCard({ medicine, hoveredMedicineId, onHover }: MedicineCardProps) {
  return (
    <Card
      className="overflow-hidden h-full flex flex-col group bg-background/50 backdrop-blur-sm border-muted hover:border-emerald-500/20 transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => onHover(medicine.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Link to={routes.medicineDetails(medicine.id)} className="flex-grow">
        <div className="relative pt-[100%] bg-gray-100 dark:bg-gray-800/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={medicine.thumbnail.imageUrl}
              alt={medicine.thumbnail.imageAlt}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>
  
          {/* Discount badge */}
          {medicine.variants.discountPercent > 0 && (
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
        </div>
  
        <CardContent className="flex flex-col flex-grow p-4">
          <div className="mb-1 text-sm text-muted-foreground">{medicine.supplier?.name}</div>
          <h3 className="font-medium line-clamp-2 hover:text-emerald-500 cursor-pointer mb-2 transition-colors group-hover:text-emerald-500">{medicine.name}</h3>
  
          <div className="flex items-center mt-auto">
            {[...Array(5)].map((_, i) => {
              const starValue = medicine.ratings.star;
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
              ({medicine.ratings.star.toFixed(1)})
            </span>
          </div>
  
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
              {medicine.variants.discountPercent > 0 && (
                <span className="text-sm line-through text-muted-foreground">
                  {Math.floor(medicine.variants.price / (1 - medicine.variants.discountPercent / 100)).toLocaleString()}₫
                </span>
              )}
              <span className="font-bold text-emerald-500">{medicine.variants.price.toLocaleString()}₫</span>
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
        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md">
          <ShoppingCart className="h-4 w-4 text-green-500 fill-green-500" />
        </Button>
      </div>

      {/* Hover showing */}
      <div className={`mt-3 px-4 pb-4 transition-all duration-300 ${hoveredMedicineId === medicine.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Button className="w-full text-sm h-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
          Thêm vào giỏ
        </Button>
      </div>
    </Card>
  )
}
