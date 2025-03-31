'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Event, User } from '@/types';
import api from '@/lib/axios';
import Link from 'next/link';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
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

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <div className="flex gap-4">
            <Input
              placeholder="Search events..."
              className="w-[300px]"
            />
            <Button>Filter</Button>
            {user?.role === 'ADMIN_LOCAL' && (
              <Link href="/events/create">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Event
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{event.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{format(new Date(event.startDate), 'PPP')}</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>Location ID: {event.locationId}</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4" />
                      <span>{event.participants} participants</span>
                    </div>
                  </div>

                  <Button className="w-full">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
