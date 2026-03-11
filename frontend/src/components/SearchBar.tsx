import { useState } from "react"

interface Props {
  onSearch: (query: string) => void
}

const SearchBar = ({ onSearch }: Props) => {

  const [query, setQuery] = useState("")

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}

export default SearchBar