
const SearchProducts = (props) => {
  return (
    <form
      onSubmit={props.searchProduct}
    >
      <legend>Search for a Product and add a quantity</legend>
      <div className="field">
        <label form="products">Products:</label>
        <input
            type="text"
            placeholder="Products Name"
            name="products"
            id="products"
            onChange={props.readFoundData}
          />
      </div>
      <div className="send">
          <input
            type="submit"
            className="btn btn-blue btn-block"
            value="Search Product"
           />
        </div>
    </form>
  );
};

export default SearchProducts;
