import { POST_TYPE_TRANSLATIONS } from "@/data/constants"
import { Post } from "@/types/entities"
import Image from "next/image"
import Link from "next/link"

const PostCard = ({ post }: { post: Post }) => {
  // TODO: Add conditional information here (for test and activity)
  return (
    <Link
      href={`/app/post/${post.id}`}
      className="transform transition-transform hover:scale-105 block"
    >
      <div className="card card-compact bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Image
                src={post.postBy.photo || "/img/default-user.png"}
                alt={`${post.postBy.name} profile photo`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm">
                  {post.postBy.name} ({post.postBy.email || "Sem email"})
                </span>
                <span className="text-sm font-light">
                  {post.createdAt || "Sem data de criação"}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="badge badge-secondary">{post.subject?.name}</div>
              <div className="badge badge-accent">
                {POST_TYPE_TRANSLATIONS[post.type]}
              </div>
            </div>
          </div>

          <p className="mb-4">{post.content}</p>

          <div className="flex space-x-2">
            {/* TODO: Add attachments here */}
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
