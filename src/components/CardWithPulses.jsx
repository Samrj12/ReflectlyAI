
export const CardBody = ({ className = "", cardContent }) => (

  <div className={className}>
    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
      {cardContent.title}
    </h3>
    <p className="text-gray-700 dark:text-gray-400">
      {cardContent.description}
    </p>
  </div>
)
export const Card1 = ({children}) => {
  return (
    <div className="py-14">
      <div className="relative mx-auto h-max">
        <div
          className="bg-lime-950/70 absolute size-full rounded-3xl border border-neutral-200 dark:border-zinc-800 scale-y-[.75] top-6 scale-x-[1.01] z-10"
          style={{
            transformOrigin: "top center",
          }}
        ></div>
        <div
          className="absolute dark:bg-zinc-950 shadow-[0_0_20px] shadow-lime-400/50 bg-white size-full rounded-3xl p-2 md:p-4 border border-lime-400/50 center scale-95 z-20"
          style={{
            transformOrigin: "top center",
          }}
        >
        </div>
        
          {children}
      </div>
    </div>
  )
}