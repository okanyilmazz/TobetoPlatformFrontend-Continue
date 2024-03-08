import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paginate } from "../../models/paginate";
import GetListBlogResponse from "../../models/responses/blog/getListBlogResponse";
import blogService from "../../services/blogService";

export default function BlogDetail() {
    let { id } = useParams();

    const [blogs, setBlogs] = useState<Paginate<GetListBlogResponse>>();

    useEffect(() => {
        blogService.getAll(0, 100).then(result => {
            setBlogs(result.data);
        })
    }, []);

    return (
        <div style={{ color: "blue", marginTop: "25rem" }}>
            detay sayfası
        </div>
    )
}