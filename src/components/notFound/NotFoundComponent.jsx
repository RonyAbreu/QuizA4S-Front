import ImgNotFound from "../../assets/data-not-found.jpg";

import "./NotFoundComponent.css";

const NotFoundComponent = ({ title }) => {
  return (
    <div className="container-not-found">
      <h2 className="title-not-found">{title}</h2>
      <img src={ImgNotFound} alt="image-not-found" className="img-not-found" />
    </div>
  );
};

export default NotFoundComponent;
