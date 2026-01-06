export default function QuoteLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col">
      {/* Quote Header Skeleton */}
      <div className="py-4 px-6 flex items-center justify-between border-b border-cream-dark bg-cream">
        <div className="h-4 w-20 bg-cream-dark rounded animate-pulse"></div>
        <div className="text-right">
          <div className="h-3 w-16 bg-cream-dark rounded animate-pulse mb-1"></div>
          <div className="h-8 w-24 bg-cream-dark rounded animate-pulse"></div>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-5xl">
          {/* Title Skeleton */}
          <div className="h-8 w-64 bg-cream-dark rounded animate-pulse mx-auto mb-6"></div>

          {/* Package Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border-2 border-gray-200">
                <div className="p-4 bg-gray-100">
                  <div className="h-6 w-24 bg-cream-dark rounded animate-pulse mx-auto mb-2"></div>
                  <div className="h-4 w-32 bg-cream-dark rounded animate-pulse mx-auto"></div>
                </div>
                <div className="p-4 border-b border-gray-100">
                  <div className="h-10 w-28 bg-cream-dark rounded animate-pulse mx-auto"></div>
                </div>
                <div className="p-4 space-y-3">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 bg-cream-dark rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
