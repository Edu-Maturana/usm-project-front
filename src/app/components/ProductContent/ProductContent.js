import React, { useEffect, useState } from "react";
import moment from "moment";
import 'moment/locale/es';
import "./ProductContent.css";
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { getProduct } from "../../api/products";
import { getLastComments, getAllComments } from "../../api/comments";
import useCart from "../../hooks/useCart";

moment().locale('es');

export function ProductContent() {
  const id = window.location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { addProduct } = useCart();
  useEffect(() => {
    getProduct(id).then((product) => setProduct(product));
  }, []);

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
          <InputNumber className="HorizontalBar" min={1} max={product.stock} value={quantity} onChange={(e) => setQuantity(e.value)}
            showButtons buttonLayout="horizontal" decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" size={1}
          />
          <Button className="buy" onClick={() => addProduct(product.ID)}>Añadir al carro</Button>
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
  
  const [commentsHidden, setCommentsHidden] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getLastComments(productId).then((comments) => setComments(comments));
  }, []);

  const showAllComments = () => {
    setCommentsHidden(false);
    getAllComments(productId).then((comments) => setComments(comments));
  }

  return (
    <div className="Comments">
      <h2>⭐ Valoraciones ⭐</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="Comment" key={comment.id}>
            <h3>
              <b className="User">{comment.customer}</b>
              <small className="Date">{moment(comment.CreatedAt).startOf('day').fromNow()}</small>
            </h3>
            <p className="Stars">
              <Rating value={comment.stars} readOnly cancel={false} />
            </p>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>No hay valoraciones</p>
      )}
      <div>
        {comments.length >= 3 && commentsHidden ?
          <p className="allCommentsButton" onClick={() => showAllComments()}>👇 Ver todas las valoraciones</p>
          : null
        }

      </div>
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
      <h2>¡Dejanos tu valoración! 😎</h2>
      <form>
        <div className="form-group">
          <label htmlFor="user">Nombre</label>
          <InputText value={user} onChange={(e) => setUser(e.target.value)} />
          <label htmlFor="comment">Estrellas</label>
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
          <Button label="Enviar" />
        </div>
      </form>
    </div>
  );
}