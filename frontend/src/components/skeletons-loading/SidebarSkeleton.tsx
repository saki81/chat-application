import { Users } from "lucide-react"


const SidebarSkeleton = () => {

  // Create 8 items skeleton
  const skeletons = Array(9).fill(null);

 return ( 
     <aside className="h-full md:w-1/4 sm:w-full lg:w-60 border-r border-base-300 flex flex-col transition-all duration-300">

      {/* header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6"/>
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* skeleton */}
      <div className="overflow-y-auto">
         {skeletons.map((_, id) => (
           <div key={id} className="w-full flex items-center p-3 gap-3">
            {/* avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
                 <div className="skeleton size-12 rounded-full" />
            </div>

            {/* user info skeleton*/}
            <div className="text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
           </div>
         ))}
      </div>
     </aside>
  );
}
 
export default SidebarSkeleton;