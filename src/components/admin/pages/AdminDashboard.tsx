import React from 'react';
import { AdminHeader } from '../layout/AdminHeader';
import { Banknote, ShoppingCart, UserPlus, PackageSearch } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const chartData = [
  { name: 'T2', value: 2400 },
  { name: 'T3', value: 3100 },
  { name: 'T4', value: 4800 },
  { name: 'T5', value: 4200 },
  { name: 'T6', value: 2100 },
  { name: 'T7', value: 5400 },
  { name: 'CN', value: 3800 },
];



const ComponentStatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  trendLabel,
  colorClass
}: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm text-neutral-500 font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-neutral-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
        <svg
          className={`w-3 h-3 ${trend === 'down' ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        {trendValue}
      </div>
      <span className="text-xs text-neutral-400 font-medium">{trendLabel}</span>
    </div>
  </div>
);

const recentOrders = [
  { id: '#ORD-5542', customer: 'Bùi Nguyễn An', status: 'CHỜ XỬ LÝ', statusColor: 'bg-orange-100 text-orange-600' },
  { id: '#ORD-5541', customer: 'Bùi Trần Minh', status: 'ĐÃ GIAO', statusColor: 'bg-green-100 text-green-600' },
  { id: '#ORD-5540', customer: 'Bùi Lê Thảo', status: 'ĐÃ GIAO', statusColor: 'bg-green-100 text-green-600' },
  { id: '#ORD-5539', customer: 'Bùi Phạm Dũng', status: 'ĐANG GIAO', statusColor: 'bg-blue-100 text-blue-600' },
];

const topProducts = [
  {
    name: 'Sofa Scandinavian Grey',
    sku: 'NT-SF-01',
    category: 'Phòng khách',
    price: '12,500,000 đ',
    sold: 24,
    revenue: '300,000,000 đ',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=100'
  },
  {
    name: 'Bàn Ăn Gỗ Sồi Minimal',
    sku: 'NT-DT-05',
    category: 'Phòng bếp',
    price: '8,200,000 đ',
    sold: 15,
    revenue: '123,000,000 đ',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=100'
  },
  {
    name: 'Ghế Làm Việc Ergonomic',
    sku: 'NT-CH-12',
    category: 'Văn phòng',
    price: '4,500,000 đ',
    sold: 42,
    revenue: '189,000,000 đ',
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=100'
  },
];

export const AdminDashboard: React.FC = () => {
  
  return (
    <>
      <AdminHeader title="Tổng quan" />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ComponentStatCard
            title="Doanh thu"
            value="125,000,000 đ"
            icon={Banknote}
            trend="up"
            trendValue="+12.5%"
            trendLabel="so với tháng trước"
            colorClass="bg-blue-50 text-blue-600"
          />
          <ComponentStatCard
            title="Đơn hàng mới"
            value="42"
            icon={ShoppingCart}
            trend="up"
            trendValue="+8.2%"
            trendLabel="so với tuần trước"
            colorClass="bg-indigo-50 text-indigo-600"
          />
          <ComponentStatCard
            title="Khách hàng mới"
            value="18"
            icon={UserPlus}
            trend="up"
            trendValue="+5.4%"
            trendLabel="đạt chi tiêu"
            colorClass="bg-sky-50 text-sky-600"
          />
          <ComponentStatCard
            title="Sản phẩm sắp hết"
            value="05"
            icon={PackageSearch}
            trend="down"
            trendValue="-2.1%"
            trendLabel="cần nhập hàng"
            colorClass="bg-orange-50 text-orange-500"
          />
        </div>

        {/* Chart and Recent Orders Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6 flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-neutral-900">Biểu đồ Doanh thu</h3>
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button className="px-4 py-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-900 rounded-md transition-colors w-16">Tuần</button>
                <button className="px-4 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-md shadow-sm w-16">Tháng</button>
              </div>
            </div>
            <div className="w-full h-[300px]" style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#a3a3a3', fontSize: 12 }}
                    dy={10}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#172554', fontWeight: 'bold' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6 flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h3 className="font-bold text-neutral-900">Đơn hàng gần đây</h3>
              <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Xem tất cả</a>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center border border-neutral-100 group-hover:bg-white group-hover:border-neutral-200 transition-all">
                      <PackageSearch className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-900">{order.id}</p>
                      <p className="text-xs text-neutral-500">Bởi {order.customer}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-neutral-900">Sản phẩm bán chạy</h3>
            <div className="flex gap-2">
              <select className="border border-neutral-200 text-sm font-medium text-neutral-600 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-100">
                <option>Tất cả danh mục</option>
                <option>Phòng khách</option>
                <option>Phòng ngủ</option>
              </select>
              <button className="p-2 border border-neutral-200 text-neutral-500 rounded-lg hover:bg-neutral-50">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-neutral-400">Sản phẩm</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-neutral-400">Danh mục</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-neutral-400">Giá bán</th>
                  <th className="pb-3 pl-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Đã bán</th>
                  <th className="pb-3 text-right text-xs font-bold uppercase tracking-widest text-neutral-400">Doanh thu</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-neutral-100" />
                        <div>
                          <p className="text-sm font-bold text-neutral-900">{product.name}</p>
                          <p className="text-xs text-neutral-500">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-medium text-neutral-600">{product.category}</td>
                    <td className="py-4 text-sm font-bold text-neutral-900">{product.price}</td>
                    <td className="py-4 text-sm font-bold text-blue-600 pl-4">{product.sold}</td>
                    <td className="py-4 text-sm font-bold text-neutral-900 text-right">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </>
  );
};
