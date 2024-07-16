import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PrayerListDailyTabs = () => {
  return (
    <div>
      <Tabs defaultValue="1">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger
            value="1"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            1일차
          </TabsTrigger>
          <TabsTrigger
            value="2"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            2일차
          </TabsTrigger>
          <TabsTrigger
            value="3"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            3일차
          </TabsTrigger>
          <TabsTrigger
            value="4"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            4일차
          </TabsTrigger>
          <TabsTrigger
            value="5"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            5일차
          </TabsTrigger>
          <TabsTrigger
            value="6"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            6일차
          </TabsTrigger>
          <TabsTrigger
            value="7"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            7일차
          </TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <p>1일차 내용</p>
        </TabsContent>
        <TabsContent value="2">
          <p>2일차 내용</p>
        </TabsContent>
        <TabsContent value="3">
          <p>3일차 내용</p>
        </TabsContent>
        <TabsContent value="4">
          <p>4일차 내용</p>
        </TabsContent>
        <TabsContent value="5">
          <p>5일차 내용</p>
        </TabsContent>
        <TabsContent value="6">
          <p>6일차 내용</p>
        </TabsContent>
        <TabsContent value="7">
          <p>7일차 내용</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrayerListDailyTabs;
