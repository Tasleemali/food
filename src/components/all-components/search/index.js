"use client"
import { Input } from "@/components/ui/input"
import { GlobalContext } from "@/context"
import { Search } from "lucide-react"
import { useContext } from "react"

function SearchItems() {
    const {searchItems ,setSearchItems} = useContext(GlobalContext)
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-5 py-1'>
      <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search..."
           onChange={(e)=>setSearchItems(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchItems
