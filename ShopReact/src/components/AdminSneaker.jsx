import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addSneaker, updateSneaker, deleteSneaker} from "../store/actions";

const AdminSneaker = ({sneakers}) => {
    const [seacrh, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [editingSneaker, setEditingSneaker] = useState(null);
    const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null
    });
    const dispatch = useDispatch();


    const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
  setFormData({ ...formData, image: e.target.files[0] });
    };

    const openEditModal = (sneaker) => {
    setEditingSneaker(sneaker); 
    setFormData({
        name: sneaker.name,
        description: sneaker.description,
        price: sneaker.price,
        image: null, 
    });
    setIsModalEditOpen(true);
};

     const SearchSneaker = sneakers.filter((sneaker) =>
    sneaker.name.toLowerCase().includes(seacrh.toLowerCase())
  );

    const handleAddSneaker = (sneakerData) =>
    {
    dispatch(addSneaker(sneakerData));
    }

    const handleSubmit = (e) => {
    e.preventDefault();
    handleAddSneaker(formData);
    setIsModalOpen(false);
    setFormData({ name: "", description: "", price: "", image: null });
  };

    const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("description", formData.description);
    updatedData.append("price", formData.price);

    if (formData.image) {
        updatedData.append("image", formData.image);
    }

  dispatch(updateSneaker(editingSneaker.id, updatedData));

  setIsModalEditOpen(false);
  setEditingSneaker(null);
};


    const handleDeleteSneaker = (e, sneakerId) => {
    e.preventDefault();
    const isConfirmed = window.confirm("Вы уверены, что хотите удалить этот товар?");
    if (isConfirmed) {
        dispatch(deleteSneaker(sneakerId));
        alert("Товар удален");
    }
};


      return (
        <div className="adminWrapper">
            <h1 className="adminTitle">Управление товарами</h1>

            <div className="adminControls">
                <input value={seacrh} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Поиск товара..."className="adminSearch"/>
                <button onClick={() => setIsModalOpen(true)} className="adminBtn">Добавить товар</button>
            </div>
            <div className="adminTable">
                <div className="tableHeader">
                    <span>Изображение</span>
                    <span>Название</span>
                    <span>Цена</span>
                    <span>Действия</span>
                </div>
                {SearchSneaker.length > 0 ? (
                SearchSneaker.map((sneaker) => (
                <div className="tableRow" key={sneaker.id}>
                <img src={`http://127.0.0.1:8000${sneaker.image}`} alt={sneaker.name} className="adminSneakerImg"/>
                <span>{sneaker.name}</span>
                <span>{Number(sneaker.price)} тг</span>
                <div className="actionButtons">
                <button className="adminBtnGray editBtn" onClick={() => openEditModal(sneaker)}>Изменить</button>
                <button onClick={(e) => handleDeleteSneaker(e, sneaker.id)} className="adminBtnRed deleteBtn">Удалить</button>
                </div>
                </div>
                ))
                ) : (
                <div className="tableRow">
                <span colSpan={4} style={{ textAlign: "center", padding: "20px" }}>Товары не найдены</span></div>)}
            </div>

             {isModalOpen && (
        <div className="modalOverlayAdd">
          <div className="modalWindowAdd" onClick={(e) => e.stopPropagation()}>
            <h2>Добавление нового товара</h2>
            <form onSubmit={handleSubmit}>
              <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Название товара" />
              <input name="description" value={formData.description} onChange={handleChange} type="text" placeholder="Описание" />
              <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Цена" />
              <input name="image"  onChange={handleFileChange} type="file" />
              <button type="submit" className="adminBtn"> Сохранить </button>
              <button type="button" className="adminBtnGray" onClick={() => setIsModalOpen(false)}> Отмена </button>
            </form>
          </div>
        </div>
      )}
      {isModalEditOpen && (
        <div className="modalOverlayAdd">
          <div className="modalWindowAdd" onClick={(e) => e.stopPropagation()}>
            <h2>Редактирование товара</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Название товара" />
              <textarea name="description" value={formData.description} onChange={handleChange} type="text" placeholder="Описание" rows={20} cols={50} />
              <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Цена" />
              <input name="image"  onChange={handleFileChange} type="file" />
              <button type="submit" className="adminBtn"> Сохранить </button>
              <button type="button" className="adminBtnGray" onClick={() => setIsModalEditOpen(false)}> Отмена </button>
            </form>
          </div>
        </div>
      )}

        </div>
    );
}
export default AdminSneaker;