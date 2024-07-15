import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Profile from "./Profile";

const MemberPrayDrawer = ({ member }) => {
  return (
    <div className="w-full flex justify-center">
      <Drawer>
        <DrawerTrigger className="w-5/6">
          <Profile key={member.id} member={member} />
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

          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MemberPrayDrawer;
