import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Apartment from '@/components/Apartment';
import { Carousel } from 'react-bootstrap';
import '../style.css'
const ApartmentDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [apartment, setApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/apartments/${id}`);
        setApartment(response.data.apartment);
      } catch (error) {
        console.error('Error fetching apartment details:', error);
      }
    };

    if (id) {
      fetchApartmentDetails();
    }
  }, [id]);

  if (!apartment) {
    return <p>Loading...</p>;
  }

  return (
    <div className="apartment-details">
    <h1>Apartment Details</h1>
    <p className="property">Name: {apartment.name}</p>
    <p className="property">Description: {apartment.description}</p>
    {apartment.images && (
  <Carousel>
    {Array.isArray(apartment.images)
      ? apartment.images.map((image: string, index: number) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 object-fit-cover img-fluid"
              src={image}
              alt={`Image ${index + 1}`}
            />
          </Carousel.Item>
        ))
      : (
          <Carousel.Item>
            <img
              className="d-block w-100 object-fit-cover img-fluid"
              src={apartment.images}
              alt="Image"
            />
          </Carousel.Item>
      )
    }
  </Carousel>
)}

      {apartment.description && <p className="property">Description: {apartment.description}</p>}
      {apartment.area && <p className="property">Area: {apartment.area}</p>}
      {apartment.size && <p className="property">Size: {apartment.size} sq ft</p>}
      {apartment.propertyType && <p className="property">Property Type: {apartment.propertyType}</p>}
      {apartment.bedrooms && <p className="property">Bedrooms: {apartment.bedrooms}</p>}
      {apartment.price && (
  <p className="property">
    Price: {apartment.price.toLocaleString('en-US')} EGP
  </p>
)}
      {apartment.compound && <p className="property">Compound: {apartment.compound}</p>}
      {apartment.realEstateDeveloper && <p className="property">Developer: {apartment.realEstateDeveloper}</p>}
    </div>
  );
};

export default ApartmentDetails;
