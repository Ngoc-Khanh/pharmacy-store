import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { UserAddress } from "@/data/interfaces";
import { Badge } from "@/components/ui/badge";
import { Users } from "@/data/zod-schemas";
import { memo } from "react";

interface Props {
  currentUser: Users;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


// Memoize address card to prevent unnecessary re-renders
const AddressCard = memo(({ address, index }: { address: UserAddress; index: number }) => (
  <div className="p-4 bg-background m-2 rounded-lg shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start">
      <div className="flex-1 pr-3">
        <div className="flex items-center gap-2">
          <p className="font-medium text-base">{address.name || `Address ${index + 1}`}</p>
          {address.isDefault && (
            <Badge variant="secondary" className="text-xs h-5 px-2 py-0 flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" /> Default
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{address.addressLine1}</p>
        {address.addressLine2 && (
          <p className="text-sm text-muted-foreground">{address.addressLine2}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {[address.city, address.state, address.postalCode].filter(Boolean).join(", ")}
        </p>
        <p className="text-sm text-muted-foreground">{address.country}</p>
        <div className="flex items-center gap-2 mt-3 bg-muted/30 px-3 py-1.5 rounded-md">
          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-xs font-medium">{address.phone}</p>
        </div>
      </div>
    </div>
  </div>
));

// Memoize the entire dialog component to prevent unnecessary re-renders
export const ViewUsersDialog = memo(function ViewUsersDialog({ currentUser, open, onOpenChange }: Props) {
  if (!currentUser) return null;
  
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[650px] md:max-w-[750px] p-0 overflow-hidden rounded-xl border shadow-lg">
        <div className="flex flex-col">
          {/* Header with user info */}
          <div className="bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70 p-8 text-primary-foreground">
            <DialogHeader className="pb-3">
              <DialogTitle className="text-2xl tracking-tight font-bold">User Profile</DialogTitle>
              <DialogDescription className="text-primary-foreground/90 text-base">
                Viewing detailed information for this user
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center mt-6 gap-5">
              <Avatar className="h-20 w-20 border-4 border-primary-foreground/20 shadow-lg">
                {currentUser.profileImage ? (
                  <AvatarImage
                    src={currentUser.profileImage.url}
                    alt={`${currentUser.firstName} ${currentUser.lastName}`}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-primary-foreground text-primary text-2xl font-bold">
                  {`${currentUser.firstName?.[0] || ''}${currentUser.lastName?.[0] || ''}`.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    className={`px-3 py-1 text-sm ${currentUser.status === 'active'
                      ? 'bg-green-500 hover:bg-green-600'
                      : currentUser.status === 'inactive'
                        ? 'bg-amber-500 hover:bg-amber-600'
                        : 'bg-red-500 hover:bg-red-600'
                      }`}
                  >
                    {currentUser.status}
                  </Badge>
                  <Badge className="capitalize bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 px-3 py-1 text-sm">{currentUser.role}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* User details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-muted/20 p-4 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="bg-primary/15 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                  <p className="text-base font-medium">{currentUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-muted/20 p-4 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="bg-primary/15 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Phone Number</p>
                  <p className="text-base font-medium">{currentUser.phone || "—"}</p>
                </div>
              </div>

              <Separator className="my-4 md:col-span-2" />

              {/* Addresses Section - Lazy load addresses */}
              <div className="mt-2 md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/15 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold">Addresses</h3>
                  </div>
                  <Badge variant="outline" className="text-sm font-normal px-3 py-1">
                    {currentUser.addresses?.length || 0} address{currentUser.addresses?.length !== 1 ? 'es' : ''}
                  </Badge>
                </div>

                <div className="border rounded-lg overflow-hidden bg-muted/10 shadow-sm">
                  {currentUser.addresses && currentUser.addresses.length > 0 ? (
                    <div className="p-2 h-[250px] overflow-y-auto will-change-transform">
                      {/* Only render visible addresses */}
                      {currentUser.addresses.slice(0, 10).map((address, index) => (
                        <AddressCard key={address.id} address={address} index={index} />
                      ))}
                      {currentUser.addresses.length > 10 && (
                        <div className="text-center p-2 text-sm text-muted-foreground">
                          And {currentUser.addresses.length - 10} more addresses...
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center mb-3">
                        <MapPin className="h-6 w-6 text-muted-foreground/60" />
                      </div>
                      <p className="text-base text-muted-foreground">No addresses found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
});
