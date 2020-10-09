import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
	return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function getProducts(categoryId) {
	return function (dispatch) {
		let url = "http://localhost:3000/products";

		if (categoryId) {
			url = url + "?categoryId=" + categoryId;
		}
		return fetch(url)
			.then((response) => response.json())
			.then((result) => dispatch(getProductsSuccess(result)));
	};
}

export function updateProductSuccess(product) {
	return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function createProductSuccess(product) {
	return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}

export function saveProduct(product) {
	return function (dispatch) {
		return saveProductApi(product)
			.then((savedProduct) => {
				product.id
					? dispatch(updateProductSuccess(savedProduct))
					: dispatch(createProductSuccess(savedProduct));
			})
			.catch((error) => {
				throw error;
			});
	};
}

//güncelleme için put ekleme için post
export function saveProductApi(product) {
	//eger id gönderilmemişse ekleme, gönderilmişse güncellemedir şeklinde çalışıcaz
	//(product.id || "") gödneerilen bir id varsa onu koy yoksa koyma
	//body adrese gönderdiğimiz datadır
	return (
		fetch("http://localhost:3000/products/" + (product.id || ""), {
			method: product.id ? "PUT" : "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(product),
		})
			//then handle response dediğimizde thenden dönen sonucu handle responsa yollamış oluyoruz
			.then(handleResponse)
			.catch(handleError)
	);
}

//genellikle async olarak yazılır
//response sonucuna göre karar verececk bir durum oluşturduk
export async function handleResponse(response) {
	if (response.ok) {
		return response.json();
	}
	//sonuç okey değilse bir hata vardır
	//handle response bir hata oluşturursa bir sonraki aşamada catch çalıştırır
	const error = await response.text();
	throw new Error(error);
}

export function handleError(error) {
	console.error("Bir hata oluştu!");
	throw error;
}
