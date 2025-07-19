import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';

const Productlist = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [productForm, setProductForm] = useState({
        id: '',
        name: '',
        price: '',
        sale: '',
        qty: 1,
        discount: 0,
    });
    const [isEditMode, setIsEditMode] = useState(false);

    const initialFormState = {
        id: '',
        name: '',
        price: '',
        sale: '',
        qty: 1,
        discount: 0,
    };

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
            alert('Please fill all fields');
            return;
        }

        if (isEditMode) {
            setCartProducts((prev) =>
                prev.map((p) => (p.id === productForm.id ? productForm : p))
            );
        } else {
            setCartProducts((prev) => [...prev, productForm]);
        }
        closePopup();
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this product?')) {
            setCartProducts((prev) => prev.filter((p) => p.id !== id));
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
        <div className="relative">
            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md space-y-4">
                        <h2 className="text-xl font-bold text-center">
                            {isEditMode ? 'Edit Product' : 'Add Product'}
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium">SL NO</label>
                                <input
                                    className="w-full mt-1 p-2 border rounded"
                                    value={productForm.id}
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Product Name</label>
                                <input
                                    className="w-full mt-1 p-2 border rounded"
                                    name="name"
                                    value={productForm.name}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Original Price</label>
                                <input
                                    className="w-full mt-1 p-2 border rounded"
                                    name="price"
                                    type="number"
                                    value={productForm.price}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Sale Price</label>
                                <input
                                    className="w-full mt-1 p-2 border rounded"
                                    name="sale"
                                    type="number"
                                    value={productForm.sale}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Quantity</label>
                                <input
                                    className="w-full mt-1 p-2 border rounded"
                                    name="qty"
                                    type="number"
                                    min="1"
                                    value={productForm.qty}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Discount</label>
                                <input
                                    className="w-full mt-1 p-2 border rounded"
                                    name="discount"
                                    type="number"
                                    min="0"
                                    value={productForm.discount}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    onClick={closePopup}
                                    className="px-4 py-2 border rounded text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    {isEditMode ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Section */}
            <div className="p-6 max-w-6xl mx-auto space-y-6 bg-white rounded-xl shadow-md mt-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        PRODUCTS <span className="text-blue-600">[ADD / MANAGE]</span>
                    </h2>
                    <button
                        onClick={() => openPopup()}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        <FiPlus /> Add Product
                    </button>
                </div>

                <div>
                    <table className="w-full border border-gray-200 text-sm rounded overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">SL NO</th>
                                <th className="p-2 border">PRODUCT NAME</th>
                                <th className="p-2 border">QTY</th>
                                <th className="p-2 border">ORIGINAL PRICE</th>
                                <th className="p-2 border">PRICE TOTAL</th>
                                <th className="p-2 border">SALE PRICE</th>
                                <th className="p-2 border">SALE TOTAL</th>
                                <th className="p-2 border">DISCOUNT</th>
                                <th className="p-2 border">SUB TOTAL</th>
                                <th className="p-2 border">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="10" className="text-center p-4 text-gray-500">
                                        No products in the list. Add one!
                                    </td>
                                </tr>
                            ) : (
                                cartProducts.map((p, i) => {
                                    const original = p.price * p.qty;
                                    const sale = p.sale * p.qty;
                                    const sub = Math.max(0, sale - p.discount);
                                    return (
                                        <tr key={p.id} className="hover:bg-gray-50">
                                            <td className="p-2 border">{i + 1}</td>
                                            <td className="p-2 border">{p.name}</td>
                                            <td className="p-2 border">{p.qty}</td>
                                            <td className="p-2 border">₹{p.price}</td>
                                            <td className="p-2 border">₹{original}</td>
                                            <td className="p-2 border">₹{p.sale}</td>
                                            <td className="p-2 border">₹{sale}</td>
                                            <td className="p-2 border">₹{p.discount}</td>
                                            <td className="p-2 border">₹{sub}</td>
                                            <td className="p-2 border">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openPopup(p)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <FiEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(p.id)}
                                                        className="text-red-600 hover:text-red-800"
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
                            <tfoot className="bg-gray-100 font-semibold">
                                <tr>
                                    <td colSpan="4" className="p-2 border text-right">
                                        Total
                                    </td>
                                    <td className="p-2 border">₹{originalTotal}</td>
                                    <td className="p-2 border"></td>
                                    <td className="p-2 border">₹{saleTotal}</td>
                                    <td className="p-2 border">₹{discount}</td>
                                    <td className="p-2 border">₹{subTotal}</td>
                                    <td className="p-2 border"></td>
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
