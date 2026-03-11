import { useState, useEffect, useRef } from "react"
import { useDebounce } from "../hooks/useDebounce"

interface Props {
  onSearch: (query: string) => void
}

const SearchBar = ({ onSearch }: Props) => {

  const [query, setQuery] = useState("")
  const isFirstRender = useRef(true)

  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    onSearch(debouncedQuery)
  }, [debouncedQuery, onSearch])

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-zinc-400 group-focus-within:text-brand-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search for Batman, Avengers, Inception..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="glass-input w-full pl-12 pr-12 py-4 rounded-2xl text-lg shadow-2xl"
      />
      
      {query && (
        <button 
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-white transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchBar