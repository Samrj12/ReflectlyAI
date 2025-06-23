import stars from "./../assets/star.svg"
const CardBody = ({ className = "p-4" , title, description }) => (
  <div className={"text-start " + className}>
    <h3 className="text-lg font-bold mb-1 text-lime-50">
      {title}
    </h3>
    <p className="text-zinc-300">
      {description}
    </p>
  </div>
)
//======================================
export const Card = ({title, description}) => {
  const Line = ({ className }) => (
    <div
      className={`h-px w-full via-zinc-400 from-[1%] from-zinc-200 to-zinc-600 absolute -z-0 dark:via-zinc-700 dark:from-zinc-900 dark:to-zinc-500 ${className}`
      }
    />
  )
  const Container = ({ children }) => (
    <div className="relative mx-auto w-full px-4 sm:px-6 md:px-8 shadow-[0_0_5px] shadow-lime-400/50">
      <Line className="bg-gradient-to-l left-0 top-2 sm:top-4 md:top-6" />
      <Line className="bg-gradient-to-r bottom-2 sm:bottom-4 md:bottom-6 left-0" />
 
      <Line className="w-px bg-gradient-to-t right-2 sm:right-4 md:right-6 h-full inset-y-0" />
      <Line className="w-px bg-gradient-to-t left-2 sm:left-4 md:left-6 h-full inset-y-0" />
      <div className="relative z-20 mx-auto py-8">{children}</div>
    </div>
 
)
return (
 
<Container>
  <div className="p-4 w-full center">
    <CardBody title={title} description={description} />
  </div>
</Container>
) }