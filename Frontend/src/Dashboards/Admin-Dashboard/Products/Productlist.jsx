import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Productlist = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const initialFormState = {
    id: '',
    name: '',
    price: '',
    sale: '',
    qty: 1,
    discount: 0,
  };

  const [productForm, setProductForm] = useState(initialFormState);

  const openPopup = (product = null) => {
    if (product) {
      setIsEditMode(true);
      setProductForm({ ...product });
    } else {
      setIsEditMode(false);
      setProductForm({ ...initialFormState, id: Date.now() });
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setProductForm(initialFormState);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: ['price', 'sale', 'qty', 'discount'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSave = () => {
    const { name, price, sale } = productForm;
    if (!name || !price || !sale) {
      toast.error('Please fill all required fields');
      return;
    }

    if (isEditMode) {
      setCartProducts((prev) =>
        prev.map((p) => (p.id === productForm.id ? productForm : p))
      );
      toast.success('Product updated successfully');
    } else {
      setCartProducts((prev) => [...prev, productForm]);
      toast.success('Product added successfully');
    }
    closePopup();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      setCartProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Product deleted');
    }
  };

  const calculateGrand = () => {
    return cartProducts.reduce(
      (acc, p) => {
        const originalTotal = p.price * p.qty;
        const saleTotal = p.sale * p.qty;
        const sub = Math.max(0, saleTotal - p.discount);
        return {
          originalTotal: acc.originalTotal + originalTotal,
          saleTotal: acc.saleTotal + saleTotal,
          discount: acc.discount + p.discount,
          subTotal: acc.subTotal + sub,
        };
      },
      { originalTotal: 0, saleTotal: 0, discount: 0, subTotal: 0 }
    );
  };

  const { originalTotal, saleTotal, discount, subTotal } = calculateGrand();

  return (
    <div className="relative dark:bg-gray-900 min-h-screen py-10 px-4">
      <ToastContainer />

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-[90%] max-w-md space-y-4">
            <h2 className="text-xl font-bold text-center border-b pb-2 dark:text-white">
              {isEditMode ? 'Edit Product' : 'Add Product'}
            </h2>
            <div className="space-y-3">
              {[
                { label: 'SL NO', name: 'id', disabled: true },
                { label: 'Product Name', name: 'name' },
                { label: 'Original Price', name: 'price', type: 'number' },
                { label: 'Sale Price', name: 'sale', type: 'number' },
                { label: 'Quantity', name: 'qty', type: 'number' },
                { label: 'Discount', name: 'discount', type: 'number' },
              ].map(({ label, name, type = 'text', disabled }) => (
                <div key={name}>
                  <label className="text-sm font-medium dark:text-gray-300">{label}</label>
                  <input
                    className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
                    name={name}
                    type={type}
                    value={productForm[name]}
                    onChange={handleFormChange}
                    min={name === 'qty' || name === 'discount' ? 0 : undefined}
                    disabled={disabled}
                  />
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-3">
                <button
                  onClick={closePopup}
                  className="px-3 py-1 border rounded text-gray-700 text-sm dark:text-white dark:border-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  {isEditMode ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Section */}
      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            PRODUCTS <span className="text-blue-600">[ADD / MANAGE]</span>
          </h2>
          <button
            onClick={() => openPopup()}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
          >
            <FiPlus /> Add Product
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full border border-gray-200 text-sm rounded overflow-hidden dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700 dark:text-white">
              <tr>
                {[
                  'SL NO',
                  'PRODUCT NAME',
                  'QTY',
                  'ORIGINAL PRICE',
                  'PRICE TOTAL',
                  'SALE PRICE',
                  'SALE TOTAL',
                  'DISCOUNT',
                  'SUB TOTAL',
                  'ACTIONS',
                ].map((head, idx) => (
                  <th key={idx} className="p-2 border dark:border-gray-600 whitespace-nowrap">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="dark:text-white">
              {cartProducts.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center p-4 text-gray-500 dark:text-gray-400">
                    No products in the list. Add one!
                  </td>
                </tr>
              ) : (
                cartProducts.map((p, i) => {
                  const original = p.price * p.qty;
                  const sale = p.sale * p.qty;
                  const sub = Math.max(0, sale - p.discount);
                  return (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="p-2 border dark:border-gray-600">{i + 1}</td>
                      <td className="p-2 border dark:border-gray-600">{p.name}</td>
                      <td className="p-2 border dark:border-gray-600">{p.qty}</td>
                      <td className="p-2 border dark:border-gray-600">₹{p.price}</td>
                      <td className="p-2 border dark:border-gray-600">₹{original}</td>
                      <td className="p-2 border dark:border-gray-600">₹{p.sale}</td>
                      <td className="p-2 border dark:border-gray-600">₹{sale}</td>
                      <td className="p-2 border dark:border-gray-600">₹{p.discount}</td>
                      <td className="p-2 border dark:border-gray-600">₹{sub}</td>
                      <td className="p-2 border dark:border-gray-600">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openPopup(p)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            {cartProducts.length > 0 && (
              <tfoot className="bg-gray-100 dark:bg-gray-700 font-semibold dark:text-white">
                <tr>
                  <td colSpan="4" className="p-2 border text-right dark:border-gray-600">
                    Total
                  </td>
                  <td className="p-2 border dark:border-gray-600">₹{originalTotal}</td>
                  <td className="p-2 border dark:border-gray-600"></td>
                  <td className="p-2 border dark:border-gray-600">₹{saleTotal}</td>
                  <td className="p-2 border dark:border-gray-600">₹{discount}</td>
                  <td className="p-2 border dark:border-gray-600">₹{subTotal}</td>
                  <td className="p-2 border dark:border-gray-600"></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Productlist;
