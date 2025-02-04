import React, { useState, useEffect } from 'react';
import {
  CButton,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';

const LoanForm = () => {
  const [form, setForm] = useState({
    Uid_users: '1', // User ID predeterminado
    name: 'Leon', // Nombre predeterminado
    lastname: 'Pineda', // Apellido predeterminado
    cedula: '28169315', // ID de card predeterminado
    email: 'leonpineda@gmail.com', // Email predeterminado
    date_loans: '',
    category: '',
    book: '',
    status: '',
  });

  const [categories, setCategories] = useState([]); // Categorías de libros
  const [books, setBooks] = useState([]); // Libros disponibles por categoría
  const [loanStatus, setLoanStatus] = useState(''); // Status del préstamo
  const [submitted, setSubmitted] = useState(false); // Si se ha pedido el préstamo
  const [selectedBooks, setSelectedBooks] = useState([]); // Libros seleccionados

  const [showAddBookModal, setShowAddBookModal] = useState(false); // Modal para agregar más libros
  const [addingAnotherBook, setAddingAnotherBook] = useState(false); // Flag para agregar más libros

  useEffect(() => {
    // Simulación de categorías de libros
    setCategories([
      { id: 1, name: 'Fiction' },
      { id: 2, name: 'Non-fiction' },
      { id: 3, name: 'Science' },
    ]);

    // Al seleccionar una categoría, se deben cargar los libros de esa categoría.
    if (form.category === '1') {
      setBooks([
        { id: 1, title: 'The Great Gatsby' },
        { id: 2, title: '1984' },
      ]);
    } else if (form.category === '2') {
      setBooks([
        { id: 3, title: 'Sapiens: A Brief History of Humankind' },
        { id: 4, title: 'Educated' },
      ]);
    } else if (form.category === '3') {
      setBooks([
        { id: 5, title: 'A Brief History of Time' },
        { id: 6, title: 'The Selfish Gene' },
      ]);
    } else {
      setBooks([]);
    }
  }, [form.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    setForm({
      Uid_users: '1',
      name: 'Leon',
      lastname: 'Pineda',
      cedula: '28169315',
      email: 'leonpineda@gmail.com',
      date_loans: '',
      category: '',
      book: '',
      status: '',
    });
    setSubmitted(false); // Resetear estado de prestamo
    setSelectedBooks([]); // Limpiar libros seleccionados
  };

  const handleSubmit = () => {
    setSubmitted(true); // Mostrar carta con el estado de la solicitud
  };

  const handleAddBook = () => {
    if (form.book && form.category) {
      const selectedBook = books.find((book) => book.id === parseInt(form.book));
      setSelectedBooks([...selectedBooks, selectedBook]);
      setForm({ ...form, book: '' });

      // Mostrar modal para agregar otro libro
      setShowAddBookModal(true);
    }
  };

  const handleAddAnotherBook = () => {
    setShowAddBookModal(false);
    setForm({ ...form, category: '', book: '' });
  };

  const handleFinishAddingBooks = () => {
    setShowAddBookModal(false);
  };

  return (
    <CContainer className="container-lg">
      <CForm className="text-light fw-semibold">
        {/* Datos del usuario */}
        <CRow className="mb-3">
          <CCol>
            <CFormInput label="Name" name="name" value={form.name} disabled />
          </CCol>
          <CCol>
            <CFormInput label="Last Name" name="lastname" value={form.lastname} disabled />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol>
            <CFormInput label="ID Card" name="cedula" value={form.cedula} disabled />
          </CCol>
          <CCol>
            <CFormInput label="Email" name="email" value={form.email} disabled />
          </CCol>
        </CRow>

        {/* Fecha de préstamo */}
        <CRow className="mb-3">
          <CCol>
            <CFormInput
              label="Loan Date"
              name="date_loans"
              type="date"
              value={form.date_loans}
              onChange={handleChange}
            />
          </CCol>
        </CRow>

        {/* Selección de categoría */}
        <CRow className="mb-3">
          <CCol>
            <CFormSelect
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="" disabled>Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>

        {/* Selección de libro basado en la categoría */}
        {form.category && (
          <CRow className="mb-3">
            <CCol>
              <CFormSelect
                label="Book"
                name="book"
                value={form.book}
                onChange={handleChange}
              >
                <option value="" disabled>Select Book</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        )}

        {/* Tabla de libros seleccionados */}
        <CTable className="table table-dark table-hover">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableHeaderCell>Category</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {selectedBooks.map((book, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{book.title}</CTableDataCell>
                <CTableDataCell>
                  {categories.find((category) => category.id === parseInt(form.category))?.name}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {/* Botón para agregar libro */}
        <CRow className="mb-3">
          <CCol>
            <CButton color="primary" onClick={handleAddBook}>
              Add Book to Loan
            </CButton>
          </CCol>
        </CRow>

        {/* Botones para realizar el préstamo o cancelar */}
        {!showAddBookModal && (
          <CRow className="mb-3">
            <CCol>
              <CButton color="primary" onClick={handleSubmit}>
                Request Loan
              </CButton>
            </CCol>
            <CCol>
              <CButton color="secondary" onClick={handleCancel}>
                Cancel
              </CButton>
            </CCol>
          </CRow>
        )}
      </CForm>

      {/* Mostrar modal para agregar otro libro */}
      <CModal
        visible={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
      >
        <CModalHeader>
          <CModalTitle>Would you like to add another book?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          You have added a book to your loan request. Do you want to add another one?
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleAddAnotherBook}>
            Yes, Add Another Book
          </CButton>
          <CButton color="secondary" onClick={handleFinishAddingBooks}>
            No, Finish Adding Books
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Mostrar carta con el estado del préstamo */}
      {submitted && (
        <CAlert color="success px-2">
          Loan Request Submitted!
          <CFormSelect
            label="Loan Status"
            name="status"
            value={loanStatus}
            onChange={(e) => setLoanStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Returned">Returned</option>
          </CFormSelect>
        </CAlert>
      )}
    </CContainer>
  );
};

export default LoanForm;
