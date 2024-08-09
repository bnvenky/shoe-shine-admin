import { useState } from 'react';

const EditProduct = () => {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    productCategory: '',
    productPrice: '',
    productQuantity: '',
    productDescription: '',
    productSizes: '',
    productImages: Array(8).fill(null),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    setFormData((prev) => {
      const newImages = [...prev.productImages];
      newImages[index] = file;
      return { ...prev, productImages: newImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'productImages') {
        formData[key].forEach((file, index) => {
          if (file) {
            formDataToSend.append(`productImage${index + 1}`, file);
          }
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('https://mrv1.indianwelfarefoundation.org.in/product', {
        method: 'PUT',
        body: formDataToSend,
      });
      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="m-5 font-sans">
      <h1 className="text-center text-2xl mb-5">Edit Product</h1>
      <form
        id="uploadForm"
        className="max-w-lg mx-auto p-5 border border-gray-300 rounded-lg bg-gray-100"
        onSubmit={handleSubmit}
      >
        <label className="block mt-4">
          Product ID:
          <input
            type="text"
            name="productId"
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </label>
        <label className="block mt-4">
          Product Name:
          <input
            type="text"
            name="productName"
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </label>
        <label className="block mt-4">
          Product Category:
          <input
            type="text"
            name="productCategory"
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </label>
        <label className="block mt-4">
          Product Price:
          <input
            type="number"
            name="productPrice"
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </label>
        <label className="block mt-4">
          Product Quantity:
          <input
            type="number"
            name="productQuantity"
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </label>
        <label className="block mt-4">
          Product Description:
          <textarea
            name="productDescription"
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded h-24"
            onChange={handleChange}
          />
        </label>
        <label className="block mt-4">
          Product Sizes (comma-separated):
          <input
            type="text"
            name="productSizes"
            required
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </label>
        <label className="block mt-4">
          Product Images:
          <div className="flex flex-wrap gap-3 mt-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex-1 min-w-[calc(50%-0.5rem)]">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => handleFileChange(e, index)}
                />
                <small>{`View ${index + 1}`}</small>
              </div>
            ))}
          </div>
        </label>
        <button
          type="submit"
          className="mt-6 py-2 px-4 text-lg bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
