import { useEffect, useState } from "react";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import mediaNewService from "../../services/mediaNewService";
import { Paginate } from "../../models/paginate";
import GetListMediaNewResponse from "../../models/responses/mediaNew/getListMediaNewResponse";
import { useNavigate } from "react-router-dom";
import "./MediaNews.css";

export default function MediaNews(props: any) {
  const [mediaNews, setMediaNews] = useState<Paginate<GetListMediaNewResponse>>();

  useEffect(() => {
    mediaNewService.getAll(0, 100).then((result) => {
      setMediaNews(result.data);
    });
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/basinda-biz-details/${props.id}`);
  }
  return (
    <div className="media-news-page container">
      <h1 className="witp-content title-card">Basında Biz</h1>
      <div className="media-news-page-card">
        {mediaNews?.items.map((mediaNew) => (
          <PhotoCard
            key={mediaNew.id}
            thumbnailPath={mediaNew.thumbnailPath}
            description={mediaNew.description}
            title={mediaNew.title}
            releaseDate={mediaNew.releaseDate}
            id={mediaNew.id}
          />
        ))}
      </div>
    </div>
  );
}