declare module "node-open-geocoder" {
  interface Address {
    display_name: string;
    city?: string;
    town?: string;
    // Add other fields as needed
  }

  interface GeocodingResponse {
    address: Address;
  }

  interface Geocoder {
    reverse(
      lng: number,
      lat: number
    ): {
      end(callback: (err: any, res: GeocodingResponse) => void): void;
    };
  }

  export default function openGeocoder(): Geocoder;
}
