import React from "react";
import TextInput from "../toolbox/TextInput";
import SelectInput from "../toolbox/SelectInput";

const ProductDetail = ({ categories, product, onSave, onChange, errors }) => {
	return (
		<form onSubmit={onSave}>
			<h2>{product.id ? "Güncelle" : "Ekle"}</h2>
			<TextInput
				name="productName"
				label="Product Name"
				value={product.productName}
				onChange={onChange}
				error="hata"
			/>

			<SelectInput
				name="categoryId"
				label="Category"
				value={product.categoryId || ""}
				defaultOption="Seçiniz"
				options={categories.map((category) => ({
					value: category.id,
					text: category.categoryName,
				}))}
				onChange={onChange}
				error="hata"
			/>

			<TextInput
				name="unitPrice"
				label="Unit Price"
				value={product.unitPrice}
				onChange={onChange}
				error="hata"
			/>

			<TextInput
				name="quantityPerUnit"
				label="Quantity per Unit"
				value={product.quantityPerUnit}
				onChange={onChange}
				error="hata"
			/>

			<TextInput
				name="unitsInStock"
				label="Units In Stock"
				value={product.unitsInStock}
				onChange={onChange}
				error="hata"
			/>

			<button type="submit" className="btn btn-success">
				Save
			</button>
		</form>
	);
};

export default ProductDetail;
