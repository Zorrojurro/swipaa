// Google Places API integration for restaurant discovery

export interface PlaceResult {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    reviewCount: number;
    priceLevel: 1 | 2 | 3 | 4;
    spiceLevel: 1 | 2 | 3 | 4 | 5;
    distance: string;
    deliveryTime: string;
    image: string;
    tags: string[];
    address: string;
    isVeg: boolean;
    isOpen: boolean;
    location: {
        lat: number;
        lng: number;
    };
    placeId: string;
}

interface GooglePlaceResult {
    place_id: string;
    name: string;
    vicinity?: string;
    formatted_address?: string;
    rating?: number;
    user_ratings_total?: number;
    price_level?: number;
    opening_hours?: {
        open_now?: boolean;
    };
    photos?: Array<{
        photo_reference: string;
        height: number;
        width: number;
    }>;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    types?: string[];
}

// Cuisine keywords to detect from place types
const cuisineKeywords: Record<string, string[]> = {
    "South Indian": ["dosa", "idli", "indian", "south"],
    "North Indian": ["mughlai", "punjabi", "north", "curry"],
    "Chinese": ["chinese", "asian", "noodles"],
    "Continental": ["european", "continental", "french", "italian"],
    "Mexican": ["mexican", "tex-mex", "burrito"],
    "American": ["burger", "american", "fast_food"],
    "Japanese": ["japanese", "sushi", "ramen"],
    "Thai": ["thai"],
    "Multi-Cuisine": ["restaurant", "cafe"],
};

// Function to estimate spice level based on cuisine
const estimateSpiceLevel = (cuisine: string): 1 | 2 | 3 | 4 | 5 => {
    const spicyCuisines: Record<string, number> = {
        "Andhra": 5,
        "South Indian": 3,
        "North Indian": 3,
        "Chinese": 2,
        "Thai": 4,
        "Mexican": 3,
        "Continental": 1,
        "American": 1,
        "Japanese": 1,
    };
    return (spicyCuisines[cuisine] || 2) as 1 | 2 | 3 | 4 | 5;
};

// Cuisine tags mapping
const cuisineTags: Record<string, string[]> = {
    "South Indian": ["🥞 Dosa", "☕ Filter Coffee", "🏛️ Traditional"],
    "North Indian": ["🍛 Curry", "🫓 Naan", "🍗 Tandoori"],
    "Chinese": ["🥢 Noodles", "🥟 Dim Sum", "🍜 Soup"],
    "Continental": ["🥗 Salads", "🍝 Pasta", "☕ Brunch"],
    "Mexican": ["🌮 Tacos", "🌯 Burritos", "🍹 Margaritas"],
    "American": ["🍔 Burgers", "🍟 Fries", "🍕 Pizza"],
    "Japanese": ["🍣 Sushi", "🍜 Ramen", "🍱 Bento"],
    "Multi-Cuisine": ["🍽️ Variety", "👨‍👩‍👧‍👦 Family", "🎉 Casual"],
};

// Detect cuisine from place types and name
function detectCuisine(place: GooglePlaceResult): string {
    const searchText = `${place.name} ${(place.types || []).join(" ")}`.toLowerCase();

    for (const [cuisine, keywords] of Object.entries(cuisineKeywords)) {
        if (keywords.some(keyword => searchText.includes(keyword))) {
            return cuisine;
        }
    }

    return "Multi-Cuisine";
}

// Generate photo URL from Google Places photo reference
function getPhotoUrl(photoReference: string, apiKey: string, maxWidth = 800): string {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${apiKey}`;
}

// Calculate distance between two coordinates
function calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
): string {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    if (distance < 1) {
        return `${Math.round(distance * 1000)} m`;
    }
    return `${distance.toFixed(1)} km`;
}

// Estimate delivery time based on distance
function estimateDeliveryTime(distanceKm: number): string {
    const baseTime = 15; // Base preparation time
    const travelTime = Math.round(distanceKm * 5); // 5 min per km
    return `${baseTime + travelTime} min`;
}

// Transform Google Place to our PlaceResult format
export function transformGooglePlace(
    place: GooglePlaceResult,
    userLat: number,
    userLng: number,
    apiKey: string
): PlaceResult {
    const cuisine = detectCuisine(place);
    const distanceKm = parseFloat(
        calculateDistance(
            userLat,
            userLng,
            place.geometry.location.lat,
            place.geometry.location.lng
        )
    );

    const photoUrl = place.photos?.[0]?.photo_reference
        ? getPhotoUrl(place.photos[0].photo_reference, apiKey)
        : `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800`; // Fallback

    return {
        id: place.place_id,
        name: place.name,
        cuisine,
        rating: place.rating || 4.0,
        reviewCount: place.user_ratings_total || 0,
        priceLevel: (place.price_level || 2) as 1 | 2 | 3 | 4,
        spiceLevel: estimateSpiceLevel(cuisine),
        distance: calculateDistance(
            userLat,
            userLng,
            place.geometry.location.lat,
            place.geometry.location.lng
        ),
        deliveryTime: estimateDeliveryTime(distanceKm),
        image: photoUrl,
        tags: cuisineTags[cuisine] || cuisineTags["Multi-Cuisine"],
        address: place.vicinity || place.formatted_address || "",
        isVeg: place.name.toLowerCase().includes("veg") || cuisine === "South Indian",
        isOpen: place.opening_hours?.open_now ?? true,
        location: place.geometry.location,
        placeId: place.place_id,
    };
}

// Fetch nearby restaurants from Google Places API
export async function fetchNearbyRestaurants(
    lat: number,
    lng: number,
    radius = 5000, // 5km default
    apiKey?: string
): Promise<PlaceResult[]> {
    const key = apiKey || process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    if (!key) {
        console.warn("Google Places API key not configured, using mock data");
        return [];
    }

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
            `location=${lat},${lng}&radius=${radius}&type=restaurant&key=${key}`
        );

        if (!response.ok) {
            throw new Error(`Places API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
            throw new Error(`Places API status: ${data.status}`);
        }

        const places: GooglePlaceResult[] = data.results || [];

        return places
            .filter(place => place.rating && place.rating >= 3.5) // Only 3.5+ ratings
            .map(place => transformGooglePlace(place, lat, lng, key))
            .sort((a, b) => b.rating - a.rating); // Sort by rating

    } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        return [];
    }
}

// Search restaurants by text query
export async function searchRestaurants(
    query: string,
    lat: number,
    lng: number,
    apiKey?: string
): Promise<PlaceResult[]> {
    const key = apiKey || process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    if (!key) {
        console.warn("Google Places API key not configured");
        return [];
    }

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?` +
            `query=${encodeURIComponent(query + " restaurant")}&location=${lat},${lng}&radius=10000&key=${key}`
        );

        if (!response.ok) {
            throw new Error(`Places API error: ${response.status}`);
        }

        const data = await response.json();
        const places: GooglePlaceResult[] = data.results || [];

        return places.map(place => transformGooglePlace(place, lat, lng, key));

    } catch (error) {
        console.error("Failed to search restaurants:", error);
        return [];
    }
}

// Get restaurant details by place ID
export async function getRestaurantDetails(
    placeId: string,
    userLat: number,
    userLng: number,
    apiKey?: string
): Promise<PlaceResult | null> {
    const key = apiKey || process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    if (!key) {
        console.warn("Google Places API key not configured");
        return null;
    }

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?` +
            `place_id=${placeId}&fields=place_id,name,vicinity,formatted_address,rating,user_ratings_total,price_level,opening_hours,photos,geometry,types&key=${key}`
        );

        if (!response.ok) {
            throw new Error(`Places API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== "OK") {
            throw new Error(`Places API status: ${data.status}`);
        }

        return transformGooglePlace(data.result, userLat, userLng, key);

    } catch (error) {
        console.error("Failed to get restaurant details:", error);
        return null;
    }
}
