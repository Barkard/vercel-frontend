import React, { useState } from 'react';
import {
  CForm,
  CFormInput,
  CButton,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CImage,
} from '@coreui/react';
import defaultAvatar from './../../assets/images/avatars/8.jpg';
import '../../css/profile.css'

const Profile = () => {
  // Información inicial del perfil
  const [profile, setProfile] = useState({
    id: 1,
    name: 'Leon',
    lastname: 'Pineda',
    cedula: '28168315',
    email: 'leonpineda@gmail.com',
    birthdate: '2000-06-15',
    avatar: '',
  });

  const [preview, setPreview] = useState(defaultAvatar);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert('Profile updated successfully!');
    console.log('Updated Profile:', profile);
  };

  return (
    <CContainer className="mt-4">
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard className="container-pro">
            <CCardHeader>
              <h5>Edit Profile</h5>
            </CCardHeader>
            <CCardBody>
              <CForm>
                {/* Previsualización de la imagen */}
                <CRow className="mb-3 justify-content-center">
                  <CCol md={6} className="text-center">
                    <CImage
                      rounded
                      thumbnail
                      src={preview}
                      alt="Profile Preview"
                      style={{
                        width: '150px',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                    <div className="mt-3">
                      <CFormInput
                        type="file"
                        className="input-pro"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                  </CCol>
                </CRow>
                {/* Campos del perfil */}
                <CRow className="mb-3">
                  <CCol>
                    <CFormInput
                      label="Name"
                      name="name"
                      className="input-pro"
                      value={profile.name}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                  <CCol>
                    <CFormInput
                      label="Last Name"
                      name="lastname"
                      className="input-pro"
                      value={profile.lastname}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormInput
                      label="ID Number"
                      name="cedula"
                      className="input-pro"
                      value={profile.cedula}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormInput
                      label="Email"
                      name="email"
                      className="input-pro"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormInput
                      label="Birthdate"
                      name="birthdate"
                      className="input-pro"
                      type="date"
                      value={profile.birthdate}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CButton color="primary" onClick={handleSave}>
                  Save Changes
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Profile;
