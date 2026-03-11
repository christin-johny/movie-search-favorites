import { useState, useEffect } from "react"
import { useDebounce } from "../hooks/useDebounce"

interface Props {
  onSearch: (query: string) => void
}

const SearchBar = ({ onSearch }: Props) => {

  const [query, setQuery] = useState("")

  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {

    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery)
    }

  }, [debouncedQuery])

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div>

      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <button onClick={clearSearch}>
          Clear
        </button>
      )}

    </div>
  )
}

export default SearchBar