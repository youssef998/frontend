import React, { useState } from 'react';
import axios from 'axios';
import Apartment from './Apartment'; 
import { Modal, Form, Button, Dropdown } from 'react-bootstrap';

interface AddApartmentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAddApartment: (newApartment: Apartment) => Promise<void>;
}

const AddApartmentModal: React.FC<AddApartmentModalProps> = ({ isOpen, onRequestClose, onAddApartment }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    area: '',
    size: 0,
    propertyType: '',
    bedrooms: 0,
    price: 0,
    compound: '',
    realEstateDeveloper: '',
    images: [] as string[], 
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imagesArray: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        imagesArray.push(URL.createObjectURL(e.target.files[i]));
      }
      setFormData({ ...formData, images: imagesArray });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAddApartment = async () => {
    try {
      const isValid = validateForm();
      if (isValid) {
        await axios.post('http://localhost:3001/api/apartments', formData);
        const newApartment = await onAddApartment(formData);
        console.log('New apartment added:', newApartment);
        onRequestClose();
      }
      } catch (error) {
        console.error('Error adding apartment:', error);
      }
  };
  const handleDropdownSelect = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleDropdownSelect2 = (field: keyof typeof formData, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };
  const [validationErrors, setValidationErrors] = useState<Partial<Apartment>>({});
  const validateForm = () => {
    const errors: Partial<Apartment> = {};
    if (!formData.name.trim()) {
      errors.name = 'Title is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!formData.propertyType) {
      alert('Please enter your property type.');
    }
    if (!formData.images || formData.images.length === 0) {
      errors.images = 'Images are required';
    }
    if (!formData.bedrooms) {
      alert('Please enter your bedrooms.');
    }
    if (!formData.area) {
      errors.area = 'Area is required';
    }
    // }
    if (!formData.price || formData.price<=0 ) {
      alert('Please enter a valid price.');
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Apartment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Title<span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange}  isInvalid={!!validationErrors.name} required />
            <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description<span className="text-danger">*</span></Form.Label>
            <Form.Control as="textarea" name="description" value={formData.description} onChange={handleInputChange}  isInvalid={!!validationErrors.description} />
            <Form.Control.Feedback type="invalid">{validationErrors.description}</Form.Control.Feedback>
          </Form.Group>

          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group controlId="formPropertyType">
                <Form.Label>Property Type<span className="text-danger">*</span></Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdownPropertyType">
                    {formData.propertyType || 'Property Type'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDropdownSelect('propertyType', 'Villa')}>Villa</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect('propertyType', 'Apartment')}>Apartment</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect('propertyType', 'Duplex')}>Duplex</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect('propertyType', 'Chalet')}>Chalet</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect('propertyType', 'Studio')}>Studio</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Group controlId="formBedrooms">
                <Form.Label>Bedrooms<span className="text-danger">*</span></Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdownBedroom">
                    {formData.bedrooms || 'Bedrooms'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDropdownSelect2('bedrooms', 1)}>1 Bedroom</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect2('bedrooms', 2)}>2 Bedrooms</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect2('bedrooms', 3)}>3 Bedrooms</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect2('bedrooms', 4)}>4 Bedrooms</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelect2('bedrooms', 5)}>5 Bedrooms</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </div>
          </div>

          <Form.Group controlId="formCompound">
            <Form.Label>Price (in EGP)<span className="text-danger">*</span></Form.Label>
            <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formCompound">
            <Form.Label>Compound</Form.Label>
            <Form.Control type="text" name="compound" value={formData.compound} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formArea">
            <Form.Label>Area<span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" name="area" value={formData.area} onChange={handleInputChange} isInvalid={!!validationErrors.area}/>
            <Form.Control.Feedback type="invalid">{validationErrors.area}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formRealEstateDeveloper">
            <Form.Label>Real Estate Developer</Form.Label>
            <Form.Control type="text" name="realEstateDeveloper" value={formData.realEstateDeveloper} onChange={handleInputChange} />
          </Form.Group>


          <Form.Group controlId="formImages">
            <Form.Label>Images<span className="text-danger">*</span></Form.Label>
            <Form.Control type="file" name="images" onChange={handleImageChange} multiple  isInvalid={!!validationErrors.images}/>
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleAddApartment}>
            Add Apartment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


export default AddApartmentModal;
