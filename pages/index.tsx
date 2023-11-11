import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddApartmentModal from '../components/AddApartmentModal';
import Apartment from '@/components/Apartment';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import '../style.css'
const Home: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddApartment = async (newApartment: Apartment) => {
    console.log('Adding an apartment...');
    setApartments((prevApartments) => [...prevApartments, newApartment]);
    
    // Close the modal
    handleCloseModal();
  
    
  };
useEffect(() => {
    // Fetch the initial list of apartments when the component mounts
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/apartments');
      setApartments(response.data.apartments);
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };
  
  return (
    <div className="apartment-listing">
      <h1 className="apartment-listing-title">Apartment Listing</h1>
      <Button variant="primary" onClick={handleOpenModal} className="add-apartment-btn">
        Add a New Apartment
      </Button>
      <AddApartmentModal isOpen={isModalOpen} onRequestClose={handleCloseModal} onAddApartment={handleAddApartment} />

      <div className="row mt-4">
        {apartments.map((apartment) => (
          <div key={apartment._id} className="col-md-4 mb-3">
           <Card>
              {apartment.images && apartment.images.length > 0 && (
                <Card.Img variant="top" src={apartment.images[0]} alt={apartment.name} />
              )}
              <Card.Body>
                <Card.Title>{apartment.name}</Card.Title>
                {/* <Card.Text>{apartment.description}</Card.Text> */}
                {/* {apartment.area && <p>Area: {apartment.area}</p>} */}
                {/* {apartment.size && <p>Size: {apartment.size} sq ft</p>} */}
                {apartment.propertyType && <p>Property Type: {apartment.propertyType}</p>}
                {/* {apartment.bedrooms && <p>Bedrooms: {apartment.bedrooms}</p>} */}
                {apartment.price && <p>Price:  {apartment.price.toLocaleString('en-US')}  EGP</p>}
                {apartment.compound && <p>Compound: {apartment.compound}</p>}
                {/* {apartment.realEstateDeveloper && <p>Developer: {apartment.realEstateDeveloper}</p>} */}
                <Link href={`/${apartment._id}`}>
                 View Details
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Home;
