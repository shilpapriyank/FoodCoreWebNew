import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
import { AddTempDeliveryAddress } from '../../../../redux/delivery-address/delivery-address.slice';

// Define constants
const apiKey = 'AIzaSyC6hNIP3xs2wN0tRG3Ue5Vg8seHGZTYnn4';
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';

// Type for address object
interface Address {
    address1?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    lat?: string;
    lng?: string;
    plain: () => string;
}

// Props type
interface GoogleAutoCompleteProps {
    sendToParent: (address: Address) => void;
    isDelivery?: boolean;
    className?: string;
    handleClearAddressField?: () => void;
    isResetQuery?: boolean;
}

// Utility: Load Google Maps JS
function loadAsyncScript(src: string): Promise<HTMLScriptElement> {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        Object.assign(script, {
            type: 'text/javascript',
            id: 'locationscript',
            async: true,
            src,
        });
        script.addEventListener('load', () => resolve(script));
        document.head.appendChild(script);
    });
}

// Utility: Extract address from Google place result
function extractAddress(place: any): Address {
    const address: Address = {
        city: '',
        state: '',
        zip: '',
        country: '',
        lat: '',
        lng: '',
        plain() {
            const city = this.city ? `${this.city}, ` : '';
            const zip = this.zip ? `${this.zip}, ` : '';
            const state = this.state ? `${this.state}, ` : '';
            const lat = this.lat ? `${this.lat}, ` : '';
            const lng = this.lng ? `${this.lng}, ` : '';
            return city + zip + state + this.country + lat + lng;
        },
    };

    if (!Array.isArray(place?.address_components)) {
        return address;
    }

    place.address_components.forEach((component: any) => {
        const types = component.types;
        const value = component.long_name;
        const shortValue = component.short_name;

        if (types.includes('locality')) {
            address.city = value;
        }
        if (types.includes('street_number')) {
            address.address1 = value + ' ';
        }
        if (types.includes('route')) {
            address.address1 = (address.address1 || '') + shortValue;
        }
        if (types.includes('postal_code')) {
            address.zip = value;
        }
        if (types.includes('country')) {
            address.country = value;
        }
        if (types.includes('administrative_area_level_1')) {
            address.state = shortValue;
        }
    });

    if (place.geometry?.location) {
        address.lat = place.geometry.location.lat().toString();
        address.lng = place.geometry.location.lng().toString();
    }

    return address;
}

export const GoogleAutoComplete: React.FC<GoogleAutoCompleteProps> = ({
    sendToParent,
    isDelivery,
    className = '',
    handleClearAddressField,
    isResetQuery,
}) => {
    const { deliveryaddress, restaurantinfo } = useReduxData();
    const regionCode = restaurantinfo?.defaultLocation?.regioncode ?? 'ca';
    const tempDeliveryAddress = deliveryaddress?.tempDeliveryAddress;
    const searchInput = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();

    const [, setAddress] = useState<Address>();
    const [, setQuery] = useState<string>('');

    const initMapScript = () => {
        if ((window as any).google) {
            return Promise.resolve();
        }
        const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly&callback=initAutocomplete`;
        return loadAsyncScript(src);
    };

    const onChangeAddress = (autocomplete: any) => {
        const place = autocomplete.getPlace();
        setAddress(extractAddress(place));
        sendToParent(extractAddress(place));
    }

    const initAutocomplete = () => {
        if (!searchInput.current) return;
        const options = {
            componentRestrictions: { country: regionCode },
        };
        const autocomplete = new (window as any).google.maps.places.Autocomplete(searchInput.current, options); autocomplete.setFields(['address_component', 'geometry']);
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.setComponentRestrictions({ country: [regionCode] });
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
    };

    useEffect(() => {
        if (!(window as any).initAutocomplete) {
            (window as any).initAutocomplete = initAutocomplete;
        }

        initMapScript().then(() => {
            initAutocomplete();
        });
    }, []);

    useEffect(() => {
        if (searchInput?.current) {
            searchInput.current.value = '';
        }
    }, [isResetQuery]);

    const handleChange = () => {
        if (handleClearAddressField) {
            handleClearAddressField();
        }
        if (tempDeliveryAddress !== null) {
            dispatch(AddTempDeliveryAddress(null));
        }
    };

    return (
        <input
            ref={searchInput}
            onChange={handleChange}
            className={`${className} type-address`}
            placeholder="Start typing Your Address"
            name="keyword"
            id="keyword"
            type="text"
        />
    );
};
