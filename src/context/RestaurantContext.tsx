"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Restaurant, restaurants as mockRestaurants } from "@/data/restaurants";
import { fetchNearbyRestaurants, PlaceResult } from "@/lib/places-api";

interface LocationState {
    lat: number;
    lng: number;
    city: string;
    loading: boolean;
    error: string | null;
}

interface RestaurantContextType {
    restaurants: Restaurant[];
    loading: boolean;
    error: string | null;
    location: LocationState;
    refreshRestaurants: () => Promise<void>;
    useMockData: boolean;
    setUseMockData: (use: boolean) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

// Default location: Koramangala, Bengaluru
const DEFAULT_LOCATION = {
    lat: 12.9352,
    lng: 77.6245,
    city: "Bengaluru",
};

// Convert PlaceResult to Restaurant type for compatibility
function placeToRestaurant(place: PlaceResult): Restaurant {
    return {
        id: place.id,
        name: place.name,
        cuisine: place.cuisine,
        rating: place.rating,
        reviewCount: place.reviewCount,
        priceLevel: place.priceLevel,
        spiceLevel: place.spiceLevel,
        distance: place.distance,
        deliveryTime: place.deliveryTime,
        image: place.image,
        tags: place.tags,
        address: place.address,
        isVeg: place.isVeg,
        isOpen: place.isOpen,
    };
}

export function RestaurantProvider({ children }: { children: ReactNode }) {
    const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [useMockData, setUseMockData] = useState(true);
    const [location, setLocation] = useState<LocationState>({
        ...DEFAULT_LOCATION,
        loading: true,
        error: null,
    });

    // Get user's location
    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation(prev => ({
                ...prev,
                loading: false,
                error: "Geolocation not supported",
            }));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    city: "Your Location",
                    loading: false,
                    error: null,
                });
            },
            (err) => {
                console.warn("Geolocation error:", err.message);
                setLocation(prev => ({
                    ...prev,
                    loading: false,
                    error: "Using default location",
                }));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000, // 5 min cache
            }
        );
    }, []);

    // Fetch restaurants when location is available
    const refreshRestaurants = async () => {
        // Check if API key is configured
        const hasApiKey = !!process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

        if (!hasApiKey || useMockData) {
            setRestaurants(mockRestaurants);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const places = await fetchNearbyRestaurants(location.lat, location.lng);

            if (places.length === 0) {
                // Fallback to mock data if no results
                setRestaurants(mockRestaurants);
                setError("No restaurants found nearby, showing popular picks");
            } else {
                setRestaurants(places.map(placeToRestaurant));
            }
        } catch (err) {
            console.error("Failed to fetch restaurants:", err);
            setError("Failed to load restaurants");
            setRestaurants(mockRestaurants);
        } finally {
            setLoading(false);
        }
    };

    // Auto-refresh when location changes
    useEffect(() => {
        if (!location.loading && !useMockData) {
            refreshRestaurants();
        }
    }, [location.loading, location.lat, location.lng, useMockData]);

    return (
        <RestaurantContext.Provider
            value={{
                restaurants,
                loading,
                error,
                location,
                refreshRestaurants,
                useMockData,
                setUseMockData,
            }}
        >
            {children}
        </RestaurantContext.Provider>
    );
}

export function useRestaurants() {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error("useRestaurants must be used within RestaurantProvider");
    }
    return context;
}
