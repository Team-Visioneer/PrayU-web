import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CarouselSize } from "@/components/Carousel";

// TODO: 하드코딩 제거
const DoPray = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8">
      <div className="mb-4 text-center">
        <div className="text-4xl">Visioneer</div>
        <div className="mt-10"></div>
      </div>

      <Drawer>
        <DrawerTrigger className="bg-black text-white p-5">
          기도하기
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-white">
              그룹원들을 위해 기도하기
            </DrawerTitle>
            <DrawerDescription className="text-white">
              기도하면 다음으로 넘어가요
            </DrawerDescription>
          </DrawerHeader>

          <CarouselSize />

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DoPray;
