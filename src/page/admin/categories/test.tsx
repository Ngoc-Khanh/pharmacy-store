import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { routeNames, routes, siteConfig } from "@/config";
import { Category } from "@/data/interfaces/category.interface";
import { cn } from "@/lib/utils";
import { CategoriesAPI } from "@/services/api/categories.api";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Check, ClipboardCheck, Copy, FolderCog, FolderEdit, FolderOpenDot, FolderPlus, FolderSearch, FolderTree, Link2, MoreHorizontal, Package, PencilLine, RefreshCw, ShieldAlert, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

// Extend Category interface for display purposes (UI-specific properties)
interface ExtendedCategory extends Category {
  productCount?: number;
  isActive?: boolean;
}

// Form data interface for creating/updating categories
interface CategoryFormData {
  title: string;
  slug: string;
  description: string;
  isActive: boolean;
}

export default function TestPage() {
  const { data: categoriesList, isLoading, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesAPI.CategoriesList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Form state - separated from Category to respect readonly properties
  const [formData, setFormData] = useState<CategoryFormData>({
    title: "",
    slug: "",
    description: "",
    isActive: true,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string, value: unknown }) => {
    const { name, value } = 'target' in e ? e.target : e;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Category submitted:", formData);
      
      // Show success message
      toast.success(editingCategory ? "Danh mục đã được cập nhật" : "Danh mục mới đã được tạo", {
        description: `Danh mục "${formData.title}" đã được ${editingCategory ? 'cập nhật' : 'tạo'} thành công.`,
        action: {
          label: "Xem",
          onClick: () => console.log("View category")
        }
      });
      
      setShowAddModal(false);
      setEditingCategory(null);
      setFormData({
        title: "",
        slug: "",
        description: "",
        isActive: true,
      });
      
      // Refetch categories
      refetch();
    } catch (error) {
      console.error("Error submitting category:", error);
      toast.error("Không thể tạo danh mục", {
        description: "Đã xảy ra lỗi khi lưu danh mục. Vui lòng thử lại sau.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Sample data for display when real data is empty
  const categoriesData: Category[] = categoriesList || [];
  
  // Sample extended categories with UI-specific properties
  const sampleCategories: ExtendedCategory[] = [
    { 
      id: "1", 
      title: "Thuốc kháng sinh", 
      slug: "thuoc-khang-sinh", 
      description: "Các loại thuốc kháng sinh chữa các bệnh nhiễm trùng", 
      updatedAt: "2023-06-15", 
      createdAt: "2023-05-10", 
      productCount: 24, 
      isActive: true 
    },
    { 
      id: "2", 
      title: "Vitamin và thực phẩm chức năng", 
      slug: "vitamin", 
      description: "Bổ sung dinh dưỡng và vitamin cần thiết cho cơ thể", 
      updatedAt: "2023-07-01", 
      createdAt: "2023-04-22", 
      productCount: 56, 
      isActive: true 
    },
    { 
      id: "3", 
      title: "Dụng cụ y tế", 
      slug: "dung-cu-y-te", 
      description: "Các thiết bị và dụng cụ y tế dùng tại nhà", 
      updatedAt: "2023-06-28", 
      createdAt: "2023-05-15", 
      productCount: 18, 
      isActive: true 
    },
    { 
      id: "4", 
      title: "Thuốc đau đầu và hạ sốt", 
      slug: "dau-dau-ha-sot", 
      description: "Các loại thuốc giảm đau, hạ sốt và chống viêm", 
      updatedAt: "2023-07-05", 
      createdAt: "2023-05-20", 
      productCount: 32, 
      isActive: true 
    },
    { 
      id: "5", 
      title: "Sản phẩm chăm sóc da", 
      slug: "cham-soc-da", 
      description: "Các sản phẩm dành cho da nhạy cảm và điều trị da", 
      updatedAt: "2023-06-25", 
      createdAt: "2023-04-18", 
      productCount: 45, 
      isActive: false 
    },
  ];

  // Display sample data if real data is empty (for development only)
  const displayCategories = categoriesData.length > 0 ? categoriesData : sampleCategories;

  // Filtered and searched results
  const filteredCategories = displayCategories
    .filter(cat => {
      const extendedCat = cat as ExtendedCategory;
      if (selectedTab === "all") return true;
      if (selectedTab === "withProducts" && (extendedCat.productCount || 0) > 0) return true;
      if (selectedTab === "noProducts" && (extendedCat.productCount || 0) === 0) return true;
      if (selectedTab === "inactive" && extendedCat.isActive === false) return true;
      return false;
    })
    .filter(cat => 
      searchQuery === "" || 
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Calculate stats
  const totalCategories = displayCategories.length;
  const categoriesWithProducts = displayCategories.filter(cat => ((cat as ExtendedCategory).productCount || 0) > 0).length;
  const categoriesNoProducts = displayCategories.filter(cat => ((cat as ExtendedCategory).productCount || 0) === 0).length;
  const totalProducts = displayCategories.reduce((sum, cat) => sum + ((cat as ExtendedCategory).productCount || 0), 0);
  const inactiveCategories = displayCategories.filter(cat => (cat as ExtendedCategory).isActive === false).length;

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.categories]} | {siteConfig.name}</title>
      </Helmet>
      <div className="flex-1 space-y-5 p-6 pt-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <FolderTree className="h-8 w-8 text-primary" />
              Quản lý danh mục
            </h2>
            <p className="text-muted-foreground mt-1 max-w-3xl">
              Thêm, sửa và quản lý danh mục phân loại sản phẩm để tạo cấu trúc cho cửa hàng của bạn.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <FolderPlus className="h-4 w-4" />
                  <span>Thêm danh mục</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader className="pb-2">
                    <DialogTitle className="text-xl">{editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</DialogTitle>
                    <DialogDescription>
                      {editingCategory ? "Cập nhật thông tin danh mục" : "Tạo danh mục mới để phân loại sản phẩm trong cửa hàng."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Tên danh mục <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        placeholder="Nhập tên danh mục"
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="slug" className="text-right">
                        Đường dẫn <span className="text-destructive">*</span>
                      </Label>
                      <div className="col-span-3 flex items-center gap-2">
                        <Input
                          id="slug"
                          name="slug"
                          value={formData.slug}
                          onChange={handleFormChange}
                          placeholder="duong-dan-danh-muc"
                          className="flex-1"
                          required
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          title="Tạo đường dẫn tự động từ tên"
                          onClick={() => {
                            const slug = formData.title
                              .toLowerCase()
                              .normalize("NFD")
                              .replace(/[\u0300-\u036f]/g, "")
                              .replace(/[đĐ]/g, "d")
                              .replace(/[^a-z0-9\s]/g, "")
                              .replace(/\s+/g, "-");
                            handleFormChange({ name: "slug", value: slug });
                          }}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="description" className="text-right pt-2">
                        Mô tả
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        placeholder="Mô tả ngắn về danh mục này"
                        className="col-span-3 h-20"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="image" className="text-right">
                        Hình ảnh
                      </Label>
                      <div className="col-span-3">
                        <div className="flex items-center justify-center w-full">
                          <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors dark:border-gray-600 dark:hover:border-gray-500">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-primary/60" />
                              <p className="text-sm text-muted-foreground">Nhấp để tải lên hoặc kéo thả</p>
                              <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG hoặc GIF (tối đa 2MB)</p>
                            </div>
                            <input id="image-upload" name="image" type="file" className="hidden" accept="image/*" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="isActive" className="text-right">
                        Trạng thái
                      </Label>
                      <div className="flex items-center space-x-2 col-span-3">
                        <Switch 
                          id="isActive" 
                          checked={formData.isActive} 
                          onCheckedChange={(checked) => handleFormChange({ name: "isActive", value: checked })} 
                        />
                        <Label htmlFor="isActive" className="cursor-pointer">
                          {formData.isActive ? "Hiển thị" : "Ẩn"}
                        </Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowAddModal(false);
                        setEditingCategory(null);
                        setFormData({
                          title: "",
                          slug: "",
                          description: "",
                          isActive: true,
                        });
                      }} 
                      disabled={isUpdating}
                    >
                      Hủy
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isUpdating}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isUpdating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Đang xử lý...
                        </>
                      ) : (
                        <>{editingCategory ? "Cập nhật" : "Tạo danh mục"}</>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              <span>Nhập từ Excel</span>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-cyan-50 border-green-100 dark:from-green-950/30 dark:to-cyan-950/30 dark:border-green-900/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">Tổng danh mục</CardTitle>
              <FolderTree className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800 dark:text-green-300">
                {isLoading ? <Skeleton className="h-8 w-16" /> : totalCategories}
              </div>
              <p className="text-xs text-green-600/90 dark:text-green-400/90">
                Tất cả danh mục đã tạo trong hệ thống
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-900/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">Có sản phẩm</CardTitle>
              <FolderSearch className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                {isLoading ? <Skeleton className="h-8 w-16" /> : categoriesWithProducts}
              </div>
              <p className="text-xs text-blue-600/90 dark:text-blue-400/90">
                <span className="font-medium">{Math.round((categoriesWithProducts / totalCategories) * 100)}%</span> danh mục đã có sản phẩm
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100 dark:from-orange-950/30 dark:to-amber-950/30 dark:border-orange-900/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-300">Chưa có sản phẩm</CardTitle>
              <FolderOpenDot className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800 dark:text-orange-300">
                {isLoading ? <Skeleton className="h-8 w-16" /> : categoriesNoProducts}
              </div>
              <p className="text-xs text-orange-600/90 dark:text-orange-400/90">
                <span className="font-medium">{Math.round((categoriesNoProducts / totalCategories) * 100)}%</span> danh mục cần thêm sản phẩm
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden bg-gradient-to-br from-rose-50 to-red-50 border-rose-100 dark:from-rose-950/30 dark:to-red-950/30 dark:border-rose-900/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-rose-800 dark:text-rose-300">Đã ẩn</CardTitle>
              <ShieldAlert className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-800 dark:text-rose-300">
                {isLoading ? <Skeleton className="h-8 w-16" /> : inactiveCategories}
              </div>
              <p className="text-xs text-rose-600/90 dark:text-rose-400/90">
                <span className="font-medium">{Math.round((inactiveCategories / totalCategories) * 100)}%</span> danh mục đang bị ẩn
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100 dark:from-violet-950/30 dark:to-purple-950/30 dark:border-violet-900/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-violet-800 dark:text-violet-300">Tổng sản phẩm</CardTitle>
              <Package className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-violet-800 dark:text-violet-300">
                {isLoading ? <Skeleton className="h-8 w-16" /> : totalProducts}
              </div>
              <p className="text-xs text-violet-600/90 dark:text-violet-400/90">
                <span className="font-medium">~{Math.round(totalProducts / (categoriesWithProducts || 1))}</span> sản phẩm/danh mục
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between bg-white/50 dark:bg-gray-900/50 p-3 rounded-xl border">
          <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full md:w-auto">
            <TabsList className="grid w-full md:w-auto grid-cols-4 gap-1 bg-muted/70 p-1 rounded-lg">
              <TabsTrigger value="all" className="text-xs py-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Tất cả</TabsTrigger>
              <TabsTrigger value="withProducts" className="text-xs py-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Có sản phẩm</TabsTrigger>
              <TabsTrigger value="noProducts" className="text-xs py-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Chưa có sản phẩm</TabsTrigger>
              <TabsTrigger value="inactive" className="text-xs py-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Đã ẩn</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <FolderSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm danh mục..."
                className="pl-9 w-full md:w-[300px] bg-white dark:bg-gray-950 border focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px] bg-white dark:bg-gray-950 border focus-visible:ring-primary">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="oldest">Cũ nhất</SelectItem>
                <SelectItem value="a-z">Tên A-Z</SelectItem>
                <SelectItem value="z-a">Tên Z-A</SelectItem>
                <SelectItem value="products">Số sản phẩm</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Table */}
        <Card className="overflow-hidden border shadow-sm">
          <CardHeader className="bg-muted/30 py-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Danh sách danh mục
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="space-y-3 p-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[60px]">ID</TableHead>
                      <TableHead className="w-[250px]">Tên danh mục</TableHead>
                      <TableHead className="w-[150px]">Đường dẫn</TableHead>
                      <TableHead>Mô tả</TableHead>
                      <TableHead className="w-[100px] text-center">Sản phẩm</TableHead>
                      <TableHead className="w-[120px]">Cập nhật</TableHead>
                      <TableHead className="w-[80px] text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-32 text-center">
                          <div className="flex flex-col items-center justify-center text-center">
                            <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
                            <h3 className="text-lg font-medium">Không tìm thấy danh mục nào</h3>
                            <p className="text-sm text-muted-foreground mt-1 max-w-md">
                              {searchQuery 
                                ? `Không tìm thấy danh mục nào phù hợp với từ khóa "${searchQuery}"`
                                : "Không có danh mục nào trong hệ thống. Hãy thêm danh mục mới để bắt đầu."
                              }
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCategories.map((category) => {
                        // Cast to ExtendedCategory to access UI properties
                        const extendedCat = category as ExtendedCategory;
                        return (
                          <TableRow key={category.id} className="group hover:bg-muted/40 transition-colors">
                            <TableCell className="font-mono text-xs text-muted-foreground">
                              {category.id.substring(0, 6)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9 rounded-md border-2 border-primary/20 overflow-hidden shadow-sm">
                                  <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(category.title)}&background=e6f7f5&color=0f766e`} />
                                  <AvatarFallback className="bg-primary/10 text-primary rounded-md">
                                    <FolderCog className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                                    {category.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {extendedCat.isActive === false && 
                                      <Badge variant="outline" className="mr-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50 text-[10px] px-1 py-0">Đã ẩn</Badge>
                                    }
                                    ID: {category.id.substring(0, 8)}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="group-hover:text-foreground transition-colors">
                              <div className="flex items-center gap-1">
                                <Link2 className="h-3 w-3 text-primary/70" />
                                <span className="text-xs font-mono text-muted-foreground mr-1">/{category.slug}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => {
                                    navigator.clipboard.writeText(category.slug);
                                    toast.success("Đã sao chép!", {
                                      description: "Đường dẫn đã được sao chép vào clipboard."
                                    });
                                  }}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="rounded-full p-1 bg-primary/10 shrink-0">
                                  <PencilLine className="h-3 w-3 text-primary" />
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {category.description || "Không có mô tả"}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant={(extendedCat.productCount || 0) > 0 ? "default" : "outline"} className={cn(
                                "rounded-full font-medium",
                                (extendedCat.productCount || 0) > 0 
                                  ? "bg-primary/20 text-primary hover:bg-primary/30 border-primary/20" 
                                  : "text-muted-foreground"
                              )}>
                                {extendedCat.productCount || 0}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {new Date(category.updatedAt).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
                                    <span className="sr-only">Mở menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[180px]">
                                  <DropdownMenuLabel>Thao tác danh mục</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => {
                                    setEditingCategory(category);
                                    setFormData({
                                      title: category.title,
                                      slug: category.slug,
                                      description: category.description,
                                      isActive: extendedCat.isActive !== false,
                                    });
                                    setShowAddModal(true);
                                  }} className="gap-2">
                                    <FolderEdit className="h-4 w-4" />
                                    <span>Chỉnh sửa</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2">
                                    <Check className="h-4 w-4" />
                                    <span>Xem sản phẩm</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600 focus:text-red-600 gap-2">
                                    <Trash2 className="h-4 w-4" />
                                    <span>Xóa danh mục</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t p-4 bg-muted/10">
            <div className="text-xs text-muted-foreground">
              Hiển thị {filteredCategories.length} trên tổng số {totalCategories} danh mục
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled className="h-7 px-3 text-xs">Trước</Button>
              <Button variant="outline" size="sm" className="h-7 px-3 text-xs bg-primary text-primary-foreground hover:bg-primary/90">1</Button>
              <Button variant="outline" size="sm" className="h-7 px-3 text-xs">2</Button>
              <Button variant="outline" size="sm" className="h-7 px-3 text-xs">3</Button>
              <Button variant="outline" size="sm" className="h-7 px-3 text-xs">Sau</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}