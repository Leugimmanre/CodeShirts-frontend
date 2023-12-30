
const FormQuantityProducts = (props) => {
    const {product, subtractProduct, addProduct, index, deleteProduct} = props;
  return (
    <>
      <li className="product-list">
        <div className="product-text">
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>
          {product.image ? (
                <img src={`http://localhost:4000/${product.image}`} alt="Product images" width={150}/>
            ) : null
          }

        </div>
        <div className="actions">
          <div className="container-quantity">
            <input
                className="quantity-input"
                type="number" name="cantidad"
                min="0"
                defaultValue={product.quantity}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10);
                  if (!isNaN(newValue)) {
                      if (newValue > product.quantity) {
                          addProduct(index);
                      } else if (newValue < product.quantity) {
                          subtractProduct(index);
                      }
                  }
                }}
            />
          </div>
          <button
            type="button"
            className="btn btn-red"
            onClick={() => deleteProduct(product._id)}
            >
            <i className="fas fa-minus-circle"></i>
            Remove From Order
          </button>
        </div>
      </li>
    </>
  );
};

export default FormQuantityProducts;
