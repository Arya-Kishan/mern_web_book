import React, { useState } from "react";
import avatar01 from "../assets/avatar01.svg";
import { getAvatarUrl } from "../helper/customFunction";

const MyImage = ({
  src,
  className,
  alt = "",
  imageClass = "",
  onClick = () => {},
  imageType = "avatar",
}) => {

  const extractMultiavatarName = (url = "") => {
    const baseUrl = "https://api.multiavatar.com/";

    if (!url.startsWith(baseUrl)) return null;

    // Remove base URL and .svg
    const name = url.replace(baseUrl, "").replace(".svg", "");

    return name || null;
  };

  const [image, setImage] = useState(src);
  const handleImgLoadError = (err) => {
    if (imageType == "post") {
      return setImage(
        "https://res.cloudinary.com/dwvuqahw2/image/upload/v1767209100/fallback_image_cog63l.jpg"
      );
    }

    if (src.startsWith("https://api.multiavatar.com/")) {
      return setImage(getAvatarUrl(extractMultiavatarName(src)));
    }
    setImage(avatar01);
  };

  return (
    <div onClick={onClick} className={className}>
      <img
        loading="lazy"
        className={`w-full h-full ${imageClass}`}
        src={image}
        alt={alt}
        srcSet=""
        onError={(err) => handleImgLoadError(err)}
      />
    </div>
  );
};

export default MyImage;
