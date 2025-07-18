const ForecastSkeleton = () => (
  <main className='px-3 mx-auto flex flex-col gap-9 w-full pb-10 pt-4 max-w-7xl'>
    <section className='space-y-3'>
      <div className='space-y-2'>
        {/* Date & Day */}
        <div className='flex gap-1 text-2xl items-end'>
          <div className='h-8 w-32 bg-gray-300 rounded animate-pulse' />
          <div className='h-7 w-40 bg-gray-200 rounded animate-pulse ml-2' />
        </div>
        <div className='gap-10 px-6 items-center flex'>
          {/* Temperature Block */}
          <div className='flex flex-col px-4'>
            <div className='h-20 w-40 bg-gray-300 rounded animate-pulse mb-3' />
            <div className='h-6 w-32 bg-gray-200 rounded animate-pulse mb-3' />
            <div className='h-6 w-40 bg-gray-200 rounded animate-pulse' />
          </div>
          {/* Hourly Forecast Icons */}
          <div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3 pb-2'>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className='flex flex-col justify-between gap-3 items-center text-xs font-semibold'
              >
                <div className='h-6 w-20 bg-gray-200 rounded animate-pulse mb-2' />
                <div className='h-16 w-16 bg-gray-300 rounded-full animate-pulse mb-2' />
                <div className='h-6 w-14 bg-gray-200 rounded animate-pulse' />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        {/* Left */}
        <div className='w-fit justify-center flex-col px-4 items-center flex'>
          <div className='h-6 w-32 bg-gray-200 rounded animate-pulse mb-3' />
          <div className='h-20 w-20 bg-gray-300 rounded-full animate-pulse' />
        </div>
        {/* Right */}
        <div className='bg-orange-400/30 rounded-lg p-6 flex-1 flex gap-6 items-center min-h-[120px]'>
          <div className='flex flex-col gap-2'>
            <div className='h-6 w-28 bg-gray-200 rounded animate-pulse' />
            <div className='h-6 w-40 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='h-32 w-32 bg-gray-300 rounded-full animate-pulse' />
        </div>
      </div>
    </section>
    {/* Weekly Forecast */}
    <section className='space-y-3'>
      <div className='flex gap-4'>
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className='flex-1 bg-white rounded-lg shadow animate-pulse p-6 min-h-[180px] flex flex-col justify-center items-center'
          >
            <div className='h-6 w-20 bg-gray-200 rounded mb-4' />
            <div className='h-20 w-20 bg-gray-300 rounded-full' />
            <div className='h-6 w-24 bg-gray-200 rounded mt-4' />
          </div>
        ))}
      </div>
    </section>
  </main>
);

export default ForecastSkeleton;
