import React, { useEffect, useState } from "react";
import "./ProductContent.css";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { getProduct } from "../../api/products";

export function ProductContent() {
  const id = window.location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const quantities = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];
  useEffect(() => {
    getProduct(id).then((product) => setProduct(product));
  }, [id]);

  return (
    <div className="ProductContent">
      <div className="ProductSection">
        <img src={product.image} alt={product.name} />
        <div className="ProductData">
          <p className="Description"> {`Productos > ${product.name}`}</p>
          <h2>{product.name}</h2>
          <Rating value={5} readOnly cancel={false} />
          <p className="Description">{product.description}</p>
          <p className="Price">${product.price}</p>
          <p className="Description">Stock: {product.stock}</p>
          <Dropdown
            value={quantity}
            options={quantities}
            onChange={(e) => setQuantity(e.value)}
            placeholder="1"
          />
          <Button label="Añadir al carrito" />
        </div>
      </div>
      <div className="CommentsSection">
        <Comments productId={id} />
        <CommentForm productId={id} />
      </div>
    </div>
  );
}

function Comments(props) {
  let productId = props.productId;
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Juan",
      stars: 5,
      comment: "Muy buen producto",
      date: "Hace 2 horas",
    },
    {
      id: 2,
      user: "Pedro",
      stars: 4,
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      date: "Hace 2 horas",
    },
  ]);

  return (
    <div className="Comments">
      <h2>Valoraciones</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="Comment" key={comment.id}>
            <h3>
              <b className="User">{comment.user}</b>
              <small className="Date">{comment.date}</small>
            </h3>
            <p className="Stars">
              <Rating value={comment.stars} readOnly cancel={false} />
            </p>
            <p>{comment.comment}</p>
          </div>
        ))
      ) : (
        <p>No hay comentarios</p>
      )}
    </div>
  );
}

function CommentForm(props) {
  let productId = props.productId;
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);

  return (
    <div className="CommentForm">
      <h2>¡Dejanos tu valoración!</h2>
      <form>
        <div className="form-group">
          <label htmlFor="user">Nombre</label>
          <InputText value={user} onChange={(e) => setUser(e.target.value)} />
          <label htmlFor="comment">Valoración</label>
          <Rating
            value={stars}
            onChange={(e) => setStars(e.value)}
            cancel={false}
          />
          <label htmlFor="comment">Comentario<small>(máx. 150 caracteres)</small></label>
          <InputTextarea
            rows={5}
            cols={30}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            autoResize
            maxlength="150"
          />
          <Button label="Enviar"/>
        </div>
      </form>
    </div>
  );
}