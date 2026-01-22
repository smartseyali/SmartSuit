
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const officeImages = [
    {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
        title: "Modern Reception Area",
        description: "Our welcoming reception designed for comfort and efficiency."
    },
    {
        url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80",
        title: "Advanced Training Labs",
        description: "State-of-the-art laboratories equipped with the latest technology for hands-on learning."
    },
    {
        url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80",
        title: "Collaborative Study Spaces",
        description: "Open areas designed to foster teamwork and peer learning."
    },
    {
        url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
        title: "Executive Conference Rooms",
        description: "Premium spaces for workshops, seminars, and industry interactions."
    },
    {
        url: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&auto=format&fit=crop&q=80",
        title: "Student Lounge",
        description: "A relaxing environment for students to unwind and network."
    }
];

const OfficeGallery = () => {
    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                        Campus Tour
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                        World-Class Infrastructure
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Experience our modern campus facilities designed to provide the best learning environment for our students.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative max-w-5xl mx-auto">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {officeImages.map((image, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-2/3 pl-4">
                                    <div className="p-1">
                                        <Card className="border-0 shadow-lg overflow-hidden rounded-3xl group">
                                            <CardContent className="flex p-0 relative aspect-[16/10]">
                                                <img
                                                    src={image.url}
                                                    alt={image.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <h3 className="text-white text-2xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                        {image.title}
                                                    </h3>
                                                    <p className="text-white/80 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                                        {image.description}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 h-12 w-12 border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors" />
                            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 h-12 w-12 border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default OfficeGallery;
