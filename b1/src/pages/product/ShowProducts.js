import React, {useEffect, useState} from "react";
import axios from "axios";
import Modal from "react-modal";

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        id: '',
        title: '',
        description: '',
        price: 0
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerm2, setSearchTerm2] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");

        if (isConfirmed) {
            axios.delete(`http://localhost:3000/products/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        setProducts(products.filter(product => product.id !== id));
                    }
                })
                .catch(error => console.error('Error deleting product:', error));
        }
    };

    const handleEdit = (product) => {
        setEditingProduct({...product});
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        axios.put(`http://localhost:3000/products/${editingProduct.id}`, editingProduct)
            .then(response => {
                if (response.status === 200) {
                    setProducts(products.map(product => (product.id === editingProduct.id ? editingProduct : product)));
                    setIsEditing(false);
                    setEditingProduct(null);
                    setIsModalOpen(false)
                }
            })
            .catch(error => console.error('Error updating student:', error));
    };

    const handleAdd = () => {
        setNewProduct({
            id: '',
            title: '',
            description: '',
            price: 0
        });
        setIsEditing(false);
        setIsModalAddOpen(true);
    }
    const handleSaveNewProduct = () => {
        axios.post('http://localhost:3000/products', newProduct)
            .then(response => {
                if (response.status === 200) {
                    setProducts([...products, response.data]);
                    setIsModalAddOpen(false);
                }
            })
            .catch(error => console.error('Error adding new student:', error));
    };

    const filteredStudents = products.filter(product => {
        const titleMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const priceMatch = product.price.toString().includes(searchTerm.toLowerCase());
        const descriptionMatch = product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const titleMatch2 = product.title.toLowerCase().includes(searchTerm2.toLowerCase());
        const descriptionMatch2 = product.description.toLowerCase().includes(searchTerm2.toLowerCase());
        const priceMatch2 = product.price.toString().includes(searchTerm2);


        return titleMatch && titleMatch2 || titleMatch && descriptionMatch2 || titleMatch && priceMatch2 ||
            descriptionMatch && titleMatch2 || descriptionMatch && descriptionMatch2 || descriptionMatch && priceMatch2 ||
            priceMatch && titleMatch2 || priceMatch && descriptionMatch2 || priceMatch && priceMatch2
    });

    return (
        <>
            <div>
                <h1>List Of Products</h1>
                <button onClick={handleAdd} style={{width: "100px", height: "30px",marginBottom:"10px"}}>Thêm Mới</button>
                <div>
                    <input className="search-input1"
                           type="text" placeholder="Search 1..." value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <input className="search-input2"
                           type="text" placeholder="Search 2..." value={searchTerm2}
                           onChange={(e) => setSearchTerm2(e.target.value)}
                    />
                    <button onClick={() => {
                        setSearchTerm('');
                        setSearchTerm2('')
                    }}>Clear
                    </button>
                    <Modal isOpen={isModalAddOpen} onRequestClose={() => setIsModalAddOpen(false)} ariaHideApp={false}
                           contentLabel="Edit Product Modal">
                        <h2>Add Products</h2>
                        <table className={"tableAdd"}>
                            <tbody>
                            <tr>
                                <td><label>Id: </label></td>
                                <td><input type="text" value={newProduct.id}
                                           onChange={(e) => setNewProduct({...newProduct, id: e.target.value})}/></td>
                            </tr>
                            <tr>
                                <td><label>Title: </label></td>
                                <td><input type="text" value={newProduct.title}
                                           onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}/>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Description: </label></td>
                                <td><input type="text" value={newProduct.description}
                                           onChange={(e) => setNewProduct({
                                               ...newProduct,
                                               description: e.target.value
                                           })}/>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Price: </label></td>
                                <td><input type="text" value={newProduct.price}
                                           onChange={(e) => setNewProduct({
                                               ...newProduct,
                                               price: parseInt(e.target.value)
                                           })}/></td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="btn">
                            <button onClick={handleSaveNewProduct}>Save</button>
                            <button onClick={() => setIsModalAddOpen(false)}>Cancel</button>
                        </div>
                    </Modal>
                </div>
                <table className={"tableList"}>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th colSpan={2}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredStudents.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td className="buut">
                                {isEditing && editingProduct.id === product.id ? (
                                    <React.Fragment>
                                        {isEditing && (
                                            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
                                                   ariaHideApp={false} contentLabel="Edit Product Modal">
                                                <h2>Edit Product</h2>
                                                <table className={"tableAdd"}>
                                                    <tbody>
                                                    <tr>
                                                        <td><label>Title:</label></td>
                                                        <td><input type="text" value={editingProduct.title || ''}
                                                                   onChange={(e) => setEditingProduct({
                                                                       ...editingProduct,
                                                                       title: e.target.value
                                                                   })}
                                                        /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label>Description:</label></td>
                                                        <td><input type="text" value={editingProduct.description}
                                                                   onChange={(e) => setEditingProduct({
                                                                       ...editingProduct,
                                                                       description: e.target.value
                                                                   })}
                                                        /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label>Price:</label></td>
                                                        <td><input
                                                            type="number" value={editingProduct.score}
                                                            onChange={(e) => setEditingProduct({
                                                                ...editingProduct,
                                                                price: parseInt(e.target.value)
                                                            })}
                                                        /></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <div className="btn">
                                                    <button onClick={handleSave}>Save</button>
                                                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                                                </div>
                                            </Modal>
                                        )}
                                    </React.Fragment>
                                ) : (
                                    <button onClick={() => handleEdit(product)}>Edit</button>
                                )}
                            </td>
                            <td className="buut">
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default ShowProducts;