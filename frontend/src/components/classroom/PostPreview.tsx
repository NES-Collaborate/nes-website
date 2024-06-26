import { PostFormData } from "@/schemas/post"
import CustomMarkdown from "../ui/Markdown"

const PostPreview = ({ post }: { post: PostFormData }) => {
  return (
    <div className="h-96">
      <CustomMarkdown>{post.content}</CustomMarkdown>
    </div>
  )
}

export default PostPreview
