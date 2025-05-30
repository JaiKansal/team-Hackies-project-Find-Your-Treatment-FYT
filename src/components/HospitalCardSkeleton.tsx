export default function HospitalCardSkeleton() {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
      role="status"
      aria-label="Loading hospital information"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-1/5 animate-pulse"></div>
        </div>
        
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-2 animate-pulse"></div>
        
        <div className="mt-4">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
          <div className="flex gap-1">
            <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
          
          <div className="text-right">
            <div className="h-4 bg-gray-200 rounded w-16 ml-auto mb-1 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 ml-auto animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}