'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Location, User } from '@/types';
import api from '@/lib/axios';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

const locationTypes = ['Restaurant', 'Bar', 'Club', 'Park', 'Theater'];

export default function LocationsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchRadius, setSearchRadius] = useState<number>(5);
  const [locations, setLocations] = useState<Location[]>([]);
  const [user, setUser] = useState<User | null>(null);

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

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = selectedType === 'all'
          ? await api.get('/locations')
          : await api.get(`/locations/type/${selectedType}`);
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, [selectedType]);

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

          <div className="md:col-span-2 h-[600px]">
            <Map locations={locations} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <Card key={location.id}>
              <CardHeader>
                <CardTitle className="text-lg">{location.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{location.address}</p>
                <p className="text-sm capitalize mt-2">{location.type}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
