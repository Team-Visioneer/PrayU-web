import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

export function CarouselSize() {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);

  const [percent, setPercent] = useState(20);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % 5; // Assuming there are 5 items
      setPercent((newIndex + 1) * 20);
      return newIndex;
    });
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <div className="flex justify-center">
        <Progress value={percent} className="w-3/5 bg-red-200 mb-4" />
      </div>

      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 flex items-center justify-center">
              <Card className="w-4/5 h-96 mb-10 bg-white">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">
                    기도제목:{index + 1}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext onClick={handleNext} />
    </Carousel>
  );
}
