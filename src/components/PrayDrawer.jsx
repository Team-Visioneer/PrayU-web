import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PrayCarousel } from "./PrayCarousel";

const PrayDrawer = ({ otherMembers, setPrayDone }) => {
  return (
    <div className="flex justify-center items-center mt-20">
      <Drawer>
        <div className="flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg shadow-lg w-80 h-96">
          <h1 className="font-bold text-xl mb-5">오늘의 기도를 시작해보세요</h1>
          <h1>다른 그룹원들의 기도제목을</h1>
          <h1 className="mb-5">확인하고 반응해주세요</h1>

          <DrawerTrigger>
            <div
              className="className=
              bg-black
              text-white
              font-bold
              py-2
              px-4
              rounded
              hover:bg-blue-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-opacity-50"
            >
              기도 시작하기
            </div>
          </DrawerTrigger>
        </div>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="">그룹원들을 위해 기도하기</DrawerTitle>
            <DrawerDescription className="">
              기도하면 다음으로 넘어가요
            </DrawerDescription>
          </DrawerHeader>

          <PrayCarousel otherMembers={otherMembers} setPrayDone={setPrayDone} />

          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PrayDrawer;
