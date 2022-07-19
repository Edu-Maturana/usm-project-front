import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Link } from "react-router-dom";
import "./BannerGallery.css";

import { Galleria } from "primereact/galleria";
import { Button } from "primereact/button";
import rolls from "../../../assets/images/rolls.svg";
import waffles from "../../../assets/images/waffles.svg";
import pancakes from "../../../assets/images/pancakes.svg";

export default function BannerGallery() {
  const images = [
    {
      itemImageSrc: rolls,
      thumbnailImageSrc: rolls,
      ID: 7,
      alt: "Rolls",
      title: "Rolls de canela 3u",
      price: "$3.500"
    },
    {
      itemImageSrc: waffles,
      thumbnailImageSrc: waffles,
      ID: 1,
      alt: "Waffles",
      title: "Waffles 4u",
      price: "$2.500"
    },
    {
      itemImageSrc: pancakes,
      thumbnailImageSrc: pancakes,
      ID:10,
      alt: "Pancakes",
      title: "Panqueques 6u",
      price: "$2.000"
    },
  ];

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (image) => {
    return <img src={image.itemImageSrc} alt={image.alt} />;
  };

  const templateItem = (image) => {
    return <img src={image.thumbnailImageSrc} alt={image.alt} />;
  };

  const caption = (item) => {
        return (
            <div className="product-data">
                <h4 className="product-title">{item.title}</h4>
                <p className="product-price">{item.price}</p>
                <Link to={`/products/${item.ID}`} className="product-link">
                <Button label="Ver producto" className="p-button-primary" />
                </Link>
            </div>
        );
    };

  return (
    <div>
      <Galleria
        value={images}
        item={itemTemplate}
        thumbnail={templateItem}
        caption={caption}
        responsiveOptions={responsiveOptions}
        style={{ maxWidth: "1000px"}}
        transitionInterval={3000}
        numVisible={5}
        showThumbnails={false}
        showIndicators
        showIndicatorsOnItem
        circular
        autoPlay
      />
    </div>
  );
}
