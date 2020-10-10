import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";

function AddOrUpdateProduct({
	products,
	categories,
	getCategories,
	getProducts,
	saveProduct,
	history,
	...props
}) {
	//bu syntax product stateini set product fonksiyon ile set edebilirim demek
	const [product, setProduct] = useState({ ...props.product });
	const [errors, setErrors] = useState({});
	useEffect(() => {
		if (categories.length === 0) {
			getCategories();
		}
		setProduct({ ...props.product });
		//use effect bir lifecycle a giriyor sonsuz bir döngü
		// bunu engellemek için bir parametre ile bunu durdur diyoruz
		//props.product izle dom a yerleştiği zaman bitir
	}, [props.product]);

	function handleChange(event) {
		//event targetın yani textinputun name ve valuesunu atamış oluyoruz
		const { name, value } = event.target;
		setProduct((previousProduct) => ({
			///previousProduct ın üzerine yaz demek
			...previousProduct,
			//diyoruz ki önceki productın name değeri yanı o alanını
			//eğer alan categoryid alanı varsa değeri int çevir
			//category id değilse value oldugu gibi bas
			[name]: name === "categoryId" ? parseInt(value, 10) : value,
		}));

		validate(name, value);

		function validate(name, value) {
			if (name === "productName" && value === "") {
				setErrors((previousErrors) => ({
					...previousErrors,
					productName: "Need a product name!",
				}));
			} else {
				setErrors((previousErrors) => ({
					...previousErrors,
					productName: "",
				}));
			}
		}
	}
	function handleSave(e) {
		e.preventDefault();
		saveProduct(product).then(() => {
			//history de daha önce geldiğimiz sayfalara yönlendirme yapmak için yöntem
			history.push("/");
		});
	}

	return (
		<ProductDetail
			product={product}
			categories={categories}
			onChange={handleChange}
			onSave={handleSave}
			errors={errors}
		></ProductDetail>
	);
}

export function getProductById(products, productId) {
	// eslint-disable-next-line eqeqeq
	let product = products.find((product) => product.id == productId) || null;
	return product;
}

//react hooksu redux bağlamamız lazım birde

//ownprops bizim componentlerin kendi içerilerinde barındırdıkları proplara karşılık geliyor
// git parametlere bak ordan productid çek
function mapStateToProps(state, ownProps) {
	const productId = ownProps.match.params.productId;
	//state ki ürünler içerisinde bu ürünü bulmaya calısıyoruz
	const product =
		productId && state.productListReducer.length > 0
			? getProductById(state.productListReducer, productId)
			: {};
	return {
		product,
		products: state.productListReducer,
		categories: state.categoryListReducer,
	};
}

const mapDispatchToProps = {
	//redux gidip reducer bakıp oradaki operasyonları çekme
	getCategories,
	saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
