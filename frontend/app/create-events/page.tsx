"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({ 
    title: "", 
    price: 0, 
    capacity: 0,
    date: "" 
  });
  const [events, setEvents] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([formData, ...events]);
    alert("Event created!");
  };

  return (
    <div className="flex flex-col items-center p-10 min-h-screen bg-zinc-50">
      
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-1">Create Event</h2>
        <p className="text-sm text-zinc-500 mb-6">Enter the details for your new event.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Event Title</Label>
            <Input 
              placeholder="Summer Festival" 
              required 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
            />
          </div>

          <div className="space-y-2">
            <Label>Date and Time</Label>
            <Input 
              type="datetime-local" 
              required 
              onChange={(e) => setFormData({...formData, date: e.target.value})} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price (€)</Label>
              <Input 
                type="number" 
                min="0" 
                placeholder="0"
                required 
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} 
              />
            </div>
            <div className="space-y-2">
              <Label>Capacity</Label>
              <Input 
                type="number" 
                min="1" 
                placeholder="50"
                required 
                onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})} 
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-2">
            Create Event
          </Button>
        </form>
      </Card>

      <div className="w-full max-w-md mt-12">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {events.length === 0 ? (
            <p className="text-zinc-400 text-sm italic">No events yet...</p>
          ) : (
            events.map((ev, index) => (
              <Card key={index} className="p-4 bg-white shadow-sm">
                <div className="font-bold text-lg">{ev.title}</div>
                <div className="text-sm text-zinc-600 mt-1">
                  📅 {ev.date.replace("T", " ")}
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-xs font-medium uppercase text-zinc-500">
                  <span>Price: {ev.price}€</span>
                  <span>Max: {ev.capacity} ppl</span>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

    </div>
  );
}