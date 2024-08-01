/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './ProductsPage.css';
import UploadProduct from './uploadProduts';
import 'bootstrap/dist/css/bootstrap.css';

const placeholderImage = 'https://via.placeholder.com/150';

const initialProducts = [
  { id: 1, name: 'T-shirt for Men', price: '$90.00', image: placeholderImage, category: 'Clothing' },
  { id: 2, name: 'Travel Bag Jeans', price: '$19.50', image: placeholderImage, category: 'Accessories' },
  { id: 3, name: 'Jeans shorts', price: '$70.00', image: placeholderImage, category: 'Clothing' },
  { id: 4, name: 'Sofa for interior', price: '$375.00', image: placeholderImage, category: 'Furniture' },
  { id: 5, name: 'Leather Wallet', price: '$375.00', image: placeholderImage, category: 'Accessories' },
  { id: 6, name: 'Travel Bag Jeans', price: '$375.00', image: placeholderImage, category: 'Accessories' },
  { id: 7, name: 'Just a Item', price: '$375.00', image: placeholderImage, category: 'Misc' },
  { id: 8, name: 'GoPro Camera 4K', price: '$32.00', image: placeholderImage, category: 'Electronics' },
  { id: 9, name: 'Headset Xiaomi', price: '$375.00', image: placeholderImage, category: 'Electronics' },
  { id: 10, name: 'WinterJacket', price: '$375.00', image: placeholderImage, category: 'Clothing' },
];

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
  const [products, setProducts] = useState(initialProducts);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Last added');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  const handleDeleteClick = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const updatedProduct = {
      id: editingProduct.id,
      name: event.target.name.value,
      price: event.target.price.value,
      image: editingProduct.image,
      category: event.target.category.value,
    };
    
    // Update the product in the state and array
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
    .sort((a, b) => sortOption === 'Last added' ? b.id - a.id : a.id - b.id);

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <>
      <div className='p-6 bg-gray-100'>
        <div className="header">
          <h1>Products grid</h1>
          <div className="header-buttons">
            <button className="export-btn">Export</button>
            <button className="create-btn" onClick={handleOpen}>Create new</button>
          </div>
        </div>
        <div className="controls">
          <input 
            type="search" 
            placeholder="Search" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <div className="right-controls">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Misc">Misc</option>
            </select>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="Last added">Last added</option>
              <option value="First added">First added</option>
            </select>
          </div>
        </div>
        <div className="product-grid">
          {paginatedProducts.map(product => (
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill delete_icons" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zM3.5 4V3h9v1h-9z"/>
                  </svg>
                  <label className='edit_delete_btn_text'>Delete</label>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
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
                <h2>Edit Product</h2>
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
};

export default ProductsPage;
