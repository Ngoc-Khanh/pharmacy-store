import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DashboardChartData } from '@/data/interfaces';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart as RechartsPieChart, XAxis, YAxis } from 'recharts';

interface DashboardChartProps {
  revenueData: DashboardChartData[];
  ordersData: { name: string; value: number; color: string }[];
  isLoading?: boolean;
}

export function DashboardCharts({ revenueData, ordersData, isLoading }: DashboardChartProps) {
  const chartConfig = {
    revenue: {
      label: "Doanh thu",
      color: "hsl(var(--chart-1))",
    },
    orders: {
      label: "Đơn hàng",
      color: "hsl(var(--chart-2))",
    },
    medicines: {
      label: "Thuốc",
      color: "hsl(var(--chart-3))",
    },
  };

  // Filter out zero values from orders data
  const filteredOrdersData = ordersData.filter(item => item.value > 0);

  if (isLoading) {
    return (
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-teal-600" />
                Doanh thu 6 tháng gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-gray-100 animate-pulse rounded"></div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-600" />
                Trạng thái đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-gray-100 animate-pulse rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="lg:col-span-2"
      >
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              Doanh thu 6 tháng gần đây
            </CardTitle>
            <CardDescription>
              Biểu đồ thể hiện xu hướng doanh thu của nhà thuốc
            </CardDescription>
          </CardHeader>          <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px] w-full">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M đ`}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value: number) => [
                    "Doanh thu:",
                    <span style={{ color: '#0d9488', fontWeight: 'bold' }}>
                      {`${value.toLocaleString('vi-VN')} đ`}
                    </span>,
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0d9488"
                  fill="#0d9488"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Order Status Chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.35 }}
      >
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-600" />
              Trạng thái đơn hàng
            </CardTitle>
            <CardDescription>
              Phân bố trạng thái các đơn hàng hiện tại
            </CardDescription>
          </CardHeader>          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[300px] pb-0"
            >
              <RechartsPieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie 
                  data={filteredOrdersData} 
                  dataKey="value" 
                  nameKey="name"
                  label
                >
                  {filteredOrdersData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}