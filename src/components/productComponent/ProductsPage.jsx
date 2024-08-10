/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './ProductsPage.css'; // Ensure this import is at the top
import UploadProduct from './uploadProduts';
import 'bootstrap/dist/css/bootstrap.css';
import EditProduct from './editProduct';

const placeholderImage = 'https://via.placeholder.com/150';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [sortOptions, setSortOptions] = useState(['Last added', 'First added']);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Last added');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://mrv1.indianwelfarefoundation.org.in/productsall');
        const data = await response.json();

        const transformedData = data.map(item => ({
          id: item.id,
          name: item.productName,
          price: `$${item.productPrice}.00`,
          image: item.productImageUrl1 || placeholderImage,
          category: item.productCategory,
          createdAt: item.createdAt,
        }));

        setProducts(transformedData);
        const uniqueCategories = ['All', ...new Set(data.map(item => item.productCategory))];
        setCategories(uniqueCategories);

        const dynamicSortOptions = ['Last added', 'First added', 'Price: High to Low', 'Price: Low to High', 'Name: A to Z', 'Name: Z to A'];
        setSortOptions(dynamicSortOptions);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setImagePreview(null);
    setNewImageFile(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setImagePreview(product.image);
    setOpen(true);
  };

  const handleDeleteClick = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const updatedProduct = {
      id: editingProduct.id,
      name: event.target.name.value,
      price: event.target.price.value,
      image: newImageFile ? imagePreview : editingProduct.image,
      category: event.target.category.value,
    };

    const updatedProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );

    setProducts(updatedProducts);
    handleClose();
  };

  const filteredProducts = products
    .filter(product =>
      (category === 'All' || product.category === category) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'First added':
          return a.createdAt.localeCompare(b.createdAt);
        case 'Last added':
          return b.createdAt.localeCompare(a.createdAt);
        case 'Price: High to Low':
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        case 'Price: Low to High':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'Name: A to Z':
          return a.name.localeCompare(b.name);
        case 'Name: Z to A':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <>
      <div className='p-6 w-full h-full bg-gray-100'>
        <div className="header">
          <h1>Products grid</h1>
          <div className="header-buttons">
            {/*<button className="export-btn">Export</button>*/}
            <button className="create-btn" onClick={handleOpen}>Create new</button>
          </div>
        </div>
        
        <div className="controls bg-white p-3 rounded-md">
          <input 
            type="search" 
            placeholder="Search" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <div className="right-controls">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              {sortOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="product-grid bg-white p-4 rounded-md">
          {loading ? (
            <div className="loading">
              <div className="loader"></div>
            </div>
          ) : paginatedProducts.length > 0 ?(
          paginatedProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <div className="actions">
                <button className="edit-btn" onClick={() => handleEditClick(product)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill pencil_style edit_icons" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                  </svg>
                  <label className='edit_delete_btn_text'>Edit</label>
                </button>
                <button className="delete-btn" onClick={() => handleDeleteClick(product.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill delete_style edit_icons" viewBox="0 0 16 16">
                    <path d="M11 1.5v1H5v-1a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5zm-8 1h10a.5.5 0 0 1 .5.5v1H2.5v-1a.5.5 0 0 1 .5-.5zM3 5h10v9.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V5z"/>
                  </svg>
                  <label className='edit_delete_btn_text'>Delete</label>
                </button>
              </div>
            </div>
          ))): (
            <div className="no-products">No products available</div> // Show no products message
          )
          }
        </div>
        <div className="pagination p-3 ">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span className='p-2'>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          {editingProduct ? (
              <form onSubmit={handleEditSubmit}>
                <center>Edit Product</center>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" defaultValue={editingProduct.name} className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="text" name="price" defaultValue={editingProduct.price} className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" name="category" defaultValue={editingProduct.category} className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Product Image</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
                  {imagePreview && (
                    <div className="image-preview mt-3">
                      <img src={imagePreview} alt="Product Preview" style={{ maxWidth: '100%' }} />
                    </div>
                  )}
                </div>
                <div className="form-group mt-3">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ marginLeft: '10px' }}>Cancel</button>
                </div>
              </form>
            ) : (
              <UploadProduct />
            )}
          </Box>
        </Fade>
      </Modal>
      
    </>
  );
}

export default ProductsPage;
