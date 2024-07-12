import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button"; // assuming you have a Button component

export function PrayCarousel({ otherMembers, setPrayDone }) {
  const numMembers = otherMembers.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percent, setPercent] = useState(20);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % numMembers;
      return newIndex;
    });
  };

  const handleComplete = () => {
    setPrayDone(true);
  };

  useEffect(() => {
    setPercent((currentIndex + 1) * (100 / numMembers));
    if (currentIndex === numMembers) {
      setPrayDone(true);
    }
  }, [currentIndex, setPrayDone, numMembers]);

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
        {otherMembers.map((member, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 flex items-center justify-center">
              <Card className="w-4/5 h-96 mb-10 bg-white">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">
                    {member.prayCards && member.prayCards[0]
                      ? member.prayCards[0].content
                      : "아직 기도제목이 없어요"}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      {currentIndex < numMembers - 1 ? (
        <CarouselNext onClick={handleNext} />
      ) : (
        <div className="flex justify-center">
          <Button
            onClick={handleComplete}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            기도 완료
          </Button>
        </div>
      )}
    </Carousel>
  );
}
