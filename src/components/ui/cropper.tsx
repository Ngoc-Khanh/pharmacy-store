import { Cropper as CropperPrimitive } from "@origin-space/image-cropper"
import { cn } from "@/lib/utils"
import type { Area, Point } from "@/hooks/use-image-crop"

interface CropperProps extends Omit<React.ComponentProps<typeof CropperPrimitive.Root>, 'onCropChange'> {
  onCropChange?: (crop: Point) => void;
  onCropComplete?: (croppedArea: Area) => void;
}

function Cropper({
  className,
  onCropChange,
  onCropComplete,
  ...props
}: CropperProps) {
  return (
    <CropperPrimitive.Root
      data-slot="cropper"
      className={cn(
        "relative flex w-full cursor-move touch-none items-center justify-center overflow-hidden focus:outline-none",
        className
      )}
      onCropChange={(crop) => {
        if (crop) {
          onCropChange?.({ x: crop.x, y: crop.y });
          if (onCropComplete) {
            onCropComplete({
              x: crop.x,
              y: crop.y,
              width: crop.width,
              height: crop.height
            });
          }
        }
      }}
      {...props}
    />
  )
}

function CropperDescription({
  className,
  ...props
}: React.ComponentProps<typeof CropperPrimitive.Description>) {
  return (
    <CropperPrimitive.Description
      data-slot="cropper-description"
      className={cn("sr-only", className)}
      {...props}
    />
  )
}

function CropperImage({
  className,
  ...props
}: React.ComponentProps<typeof CropperPrimitive.Image>) {
  return (
    <CropperPrimitive.Image
      data-slot="cropper-image"
      className={cn(
        "pointer-events-none h-full w-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function CropperCropArea({
  className,
  ...props
}: React.ComponentProps<typeof CropperPrimitive.CropArea>) {
  return (
    <CropperPrimitive.CropArea
      data-slot="cropper-crop-area"
      className={cn(
        "pointer-events-none absolute border-3 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.3)] in-[[data-slot=cropper]:focus-visible]:ring-[3px] in-[[data-slot=cropper]:focus-visible]:ring-white/50",
        className
      )}
      {...props}
    />
  )
}

export { Cropper, CropperDescription, CropperImage, CropperCropArea }
