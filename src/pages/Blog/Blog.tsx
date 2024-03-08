import { useEffect, useState } from "react";
import "./Blog.css";
import BlogCard from "../../components/PhotoCard/PhotoCard";
import blogService from "../../services/blogService";
import { Paginate } from "../../models/paginate";
import GetListBlogResponse from "../../models/responses/blog/getListBlogResponse";

export default function Blog() {
  const [blogs, setBlogs] = useState<Paginate<GetListBlogResponse>>();

  useEffect(() => {
    blogService.getAll(0, 100).then((result) => {
      setBlogs(result.data);
    });
  }, []);

  return (
    <div className="blog-page ">
      <h1 className="witp-content title-card">Blog</h1>
      <div className="blog-page-card">
        {blogs?.items.map((blog) => (
          <BlogCard
            key={blog.id}
            thumbnailPath={blog.thumbnailPath}
            description={blog.description}
            title={blog.title}
            releaseDate={blog.releaseDate}
            id={blog.id}
          />
        ))}
      </div>
    </div>
  );
}
