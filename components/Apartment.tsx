// Definition of the Apartment type
interface Apartment {
    _id?: string;
    name: string;
    description: string;
    area: string;
    size: number;
    propertyType: string; 
    bedrooms: number;
    price: number;
    compound: string;
    realEstateDeveloper: string;
    images: string[] | string; 
  }
  

  export default Apartment;  