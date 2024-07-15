import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/memberDrawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Profile from "./Profile";

const MemberPrayDrawer = ({ member }) => {
  console.log(member);
  return (
    <div className="w-full flex justify-center">
      <Drawer>
        <DrawerTrigger className="w-5/6">
          <Profile key={member.id} member={member} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-white"></DrawerTitle>
            <DrawerDescription className="text-white flex flex-col justify-center">
              <Card className="bg-white w-[360px] h-[450px] flex justify-center items-center rounded-2xl border-2 border-blue-100">
                <Card className="bg-cardInsideBlue text-black w-[300px] h-[300px] rounded-2xl mb-10">
                  <CardHeader>
                    <CardTitle>
                      <div>
                        <img
                          src={member.profiles.avatar_url}
                          alt={`${member.profiles.full_name}'s avatar`}
                          className="w-5 h-5 rounded-full mr-4"
                        />
                        {member.profiles.full_name}
                      </div>
                    </CardTitle>
                    <CardDescription>이번주 기도제목</CardDescription>
                  </CardHeader>
                  <CardContent className="text-2xl">
                    {member.prayCards[0]?.content}
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </Card>

              <Card className="flex flex-col items-center justify-center w-[360px] h-[150px] mt-5 bg-white text-black border-2 border-blue-100 rounded-2xl">
                <CardTitle className="text-xl">기도하기</CardTitle>
                <div className="flex justify-center space-x-4 mt-2">
                  <button className="bg-purple-100 text-black py-2 px-4 flex flex-col items-center rounded-2xl">
                    <span className="text-2xl">🙏</span>
                    <span>기도해요</span>
                  </button>
                  <button className="bg-blue-100 text-black py-2 px-4 rounded-2xl flex flex-col items-center">
                    <span className="text-2xl">👍</span>
                    <span>응원해요</span>
                  </button>
                  <button className="bg-red-100 text-black py-2 px-4 rounded-2xl flex flex-col items-center">
                    <span className="text-2xl">❤️</span>
                    <span>좋아요</span>
                  </button>
                </div>
              </Card>
            </DrawerDescription>
          </DrawerHeader>

          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MemberPrayDrawer;
