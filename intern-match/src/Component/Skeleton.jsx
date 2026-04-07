import { motion } from "framer-motion";

export const InternshipCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-5 border border-gray-200 flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
      <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />
    </div>
    <div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
    </div>
    <div className="flex gap-3">
      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-14 animate-pulse" />
    </div>
    <div className="flex gap-2">
      <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
      <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
      <div className="h-6 bg-gray-200 rounded w-14 animate-pulse" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <InternshipCardSkeleton key={i} />
    ))}
  </div>
);