import React, { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string | number;
    positive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 bg-blue-50 rounded-md">
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className={`text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
            <span className={`mr-1 ${trend.positive ? 'rotate-0' : 'rotate-180'}`}>
              ▲
            </span>
            {trend.value} {trend.positive ? 'plus' : 'moins'} que le mois dernier
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;