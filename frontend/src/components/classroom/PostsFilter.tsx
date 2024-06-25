import { Button, Input, Tooltip } from "react-daisyui"
import { FaSearch } from "react-icons/fa"
import { DebouncedState } from "usehooks-ts"

type Props = {
  query: [string, DebouncedState<(value: string) => void>]
  isFetching: boolean
}

const PostsFilter = ({ query: [_, setQuery], isFetching }: Props) => {
  return (
    <div className="join flex justify-center mb-8 gap-1">
      <Input
        size="sm"
        placeholder="Pesquisar"
        className="w-3/4 lg:w-2/4 join-item"
        onKeyDown={(e) => setQuery(e.currentTarget.value)}
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
