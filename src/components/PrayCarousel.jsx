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
import { Button } from "@/components/ui/button";

export function PrayCarousel({ otherMembers, setPrayDone }) {
  const othersWithPrayCards = otherMembers.filter(
    (member) => member.prayCards && member.prayCards[0]
  );
  const prayCardCount = othersWithPrayCards.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [percent, setPercent] = useState(
    (currentIndex + 1) * (100 / prayCardCount)
  );

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % prayCardCount;
      setPercent((currentIndex + 1) * (100 / prayCardCount));
      return newIndex;
    });
  };

  const handleComplete = () => {
    setPrayDone(true);
  };

  useEffect(() => {
    setPercent((currentIndex + 1) * (100 / prayCardCount));
  }, [currentIndex, prayCardCount]);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <div className="flex justify-center">
        <Progress value={percent} className="w-3/5 bg-white mb-4" />
      </div>

      <CarouselContent>
        {othersWithPrayCards.map((member, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 flex items-center justify-center">
              <Card className="w-4/5 h-96 mb-10 bg-white rounded-2xl">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={member.profiles.avatar_url}
                      alt="avatar"
                      className="w-10 h-10 rounded-full mb-20"
                    />

                    <span className="text-3xl font-semibold">
                      {member.prayCards[0].content}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      {currentIndex < prayCardCount - 1 ? (
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
