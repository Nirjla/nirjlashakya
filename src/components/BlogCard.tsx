import type { BlogPost } from "../data/blogPosts"
import { Link } from "react-router-dom"
import { Calendar, Tag, Clock } from "lucide-react"

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })

  return (
    <Link to={`/blog/${post.slug}`} className="blog-card-link">
      <article className="blog-card">
        <div className="card-header">
          <h2 className="card-title">{post.title}</h2>
          <span className="card-category">{post.category}</span>
        </div>

        <p className="card-excerpt">{post.excerpt}</p>

        <div className="card-meta">
          <div className="meta-item">
            <Calendar className="meta-icon" size={16} />
            <span>{formattedDate}</span>
          </div>
          <div className="meta-item">
            <Clock className="meta-icon" size={16} />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <div className="card-tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag-badge">
              <Tag size={12} className="tag-icon" />
              {tag}
            </span>
          ))}
        </div>

        <div className="card-footer">
          <span className="read-more">Read article →</span>
        </div>
      </article>
    </Link>
  )
}
