import { Button, Input, Tooltip } from "react-daisyui"
import { FaSearch } from "react-icons/fa"
import { useDebounceCallback } from "usehooks-ts"

type Props = {
  query: [string, React.Dispatch<React.SetStateAction<string>>]
  isFetching: boolean
}

const PostsFilter = ({ query: [query, setQuery], isFetching }: Props) => {
  const debouncedSearch = useDebounceCallback(setQuery, 500)

  return (
    <div className="join flex justify-center mb-8 gap-1">
      <Input
        size="sm"
        placeholder="Pesquisar"
        className="w-3/4 lg:w-2/4 join-item"
        onKeyDown={(e) => debouncedSearch(e.currentTarget.value)}
      />
      <Tooltip message="Pesquisar">
        <Button size="sm" color="primary" disabled={isFetching} className="join-item">
          <FaSearch />
        </Button>
      </Tooltip>
    </div>
  )
}

export default PostsFilter
