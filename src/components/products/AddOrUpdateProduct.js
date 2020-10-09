import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

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
	useEffect(() => {
		if (categories.length === 0) {
			getCategories();
		}
		setProduct(...props.product);
		//use effect bir lifecycle a giriyor sonsuz bir döngü
		// bunu engellemek için bir parametre ile bunu durdur diyoruz
		//props.product izle dom a yerleştiği zaman bitir
	}, [props.product]);

	function handleChange(e) {
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
	}
	function handleSave(e) {
		e.preventDefault();
		saveProduct(product).then(() => {
			//history de daha önce geldiğimiz sayfalara yönlendirme yapmak için yöntem
			history.push("/");
		});
	}
}
