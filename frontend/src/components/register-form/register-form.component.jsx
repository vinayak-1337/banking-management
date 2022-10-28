import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import ModalBox from "../modal-box/modal-box.component";

const defaultFormField = {
  name: "",
  age: "",
  contact: "",
  username: "",
  password: "",
};

export default function RegisterForm() {
  const [formField, setFormField] = useState(defaultFormField);
  const { name, age, contact, username, password } = formField;
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({
      ...formField,
      [name]: value,
    });
  };

  const alertModal = (message) => {
    setModalValue(message);
    setShowModal(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:3001/create", { ...formField }).then((res) => {
      if (res.data.code === "ER_DUP_ENTRY") {
        alert("User already exist. Please choose different username");
      } else {
        setFormField(defaultFormField);
        alertModal("Registration successful");
        // navigate("/");
      }
    });
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <FormInput
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
        />
        <FormInput
          name="age"
          type="number"
          value={age}
          onChange={handleChange}
        />
        <FormInput
          name="contact"
          type="tel"
          value={contact}
          onChange={handleChange}
        />
        <FormInput
          name="username"
          type="text"
          value={username}
          onChange={handleChange}
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <FormInput type="submit" value="submit" />
      </form>
      <ModalBox
        onClose={() => {
          setShowModal(false);
        }}
        value={modalValue}
        show={showModal}
      />
    </>
  );
}
