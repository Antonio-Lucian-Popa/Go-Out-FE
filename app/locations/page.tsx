'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Location, User, MapBounds } from '@/types';
import api from '@/lib/axios';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { LocationsService } from '@/lib/api/locations.service';


const Map = dynamic(() => import('@/components/map'), { ssr: false });

const locationTypes = ['Restaurant', 'Bar', 'Club', 'Park', 'Theater'];

export default function LocationsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchRadius, setSearchRadius] = useState<number>(5);
  const [locations, setLocations] = useState<Location[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;
      try {
        const response = await api.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  // Initial locations fetch
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = selectedType === 'all'
          ? await api.get('/locations')
          : await api.get(`/locations/type/${selectedType}`);
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [selectedType]);

  const handleBoundsChange = useCallback(async (bounds: MapBounds) => {
    try {
      setLoading(true);
      const newLocations = await LocationsService.getLocationsByBounds({
        ...bounds,
        type: selectedType !== 'all' ? selectedType : undefined,
        radius: searchRadius
      });
      setLocations(newLocations);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedType, searchRadius]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Locations</h1>
          {user?.role === 'ADMIN_LOCAL' && (
            <Link href="/locations/create">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Location
              </Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {locationTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Radius (km)</label>
                <Input
                  type="number"
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(Number(e.target.value))}
                  min={1}
                  max={50}
                />
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2 h-[600px] relative">
            {loading && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            <Map locations={locations} onBoundsChange={handleBoundsChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <Card key={location.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                {location.imageUrl && (
                  <img
                    src={location.imageUrl}
                    alt={location.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                )}
                <CardTitle className="text-lg">{location.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{location.address}</p>
                <p className="text-sm capitalize mt-2">{location.type}</p>
                {location.rating > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm">{location.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({location.popularity} visits)</span>
                  </div>
                )}
                {location.tags && location.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {location.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {location.openingHours && (
                  <p className="text-sm text-gray-600 mt-2">{location.openingHours}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}