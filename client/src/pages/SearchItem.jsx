import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchPost } from "@/services/api/ImageCall";
import { SearchUser } from "@/services/api/UserCall";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
const SearchItem = () => {
  const [inputv, setInputv] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [searchImg, setSearchImg] = useState(true);

  const {
    data: images,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryFn: () => SearchPost(searchParam),
    queryKey: ["SearchPost", { searchParam }],
    enabled: Boolean(searchParam) && Boolean(searchImg), //searchParam != "",
  });

  const {
    data: users,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
    refetch: refetch2,
  } = useQuery({
    queryFn: () => SearchUser(searchParam),
    queryKey: ["SearchUser", { searchParam }],
    enabled: Boolean(searchParam) && Boolean(!searchImg), //searchParam != "",
  });

  const GiveSearchFeed = () => {
    setSearchParam(inputv);
  };

  return (
    <div className="flex w-full flex-col gap-6 pl-5">
      <>
        <h1>search res</h1>
        <Tabs
          defaultValue="image"
          onValueChange={() => {
            setSearchImg(!searchImg);
          }}
        >
          <TabsList>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="user">User</TabsTrigger>
          </TabsList>
          <div className="flex w-full max-w-sm align-middle justify-center pl-4">
            <Input
              type={"search"}
              onChange={(e) => {
                setInputv(e.target.value);
              }}
              placeholder="Type to search..."
            />
            <Button type="button" onClick={GiveSearchFeed}>
              Search
            </Button>
          </div>
          {searchParam == "" ? (
            <div>Start searching</div>
          ) : (
            <>
              <TabsContent value="image">
                <h1>Images : </h1>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    //height: '100vh'
                  }}
                >
                  {images?.map((image) => {
                    return (
                      <>
                        <Link className="pt-2 pb-2" to={"/image/" + image._id}>
                          <h1>{image.title}</h1>
                          <img src={image.imgUrl} />
                        </Link>
                      </>
                    );
                  })}
                </div>
              </TabsContent>
              <TabsContent value="user">
                <h1>Users : </h1>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    //height: '100vh'
                  }}
                >
                  {users?.map((user) => {
                    return (
                      <>
                        <Link
                          className="flex gap-4 pt-2 pb-2"
                          to={"/profile/" + user._id}
                        >
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatarUrl} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <h1 className="content-center">{user.name}</h1>
                        </Link>
                      </>
                    );
                  })}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </>
    </div>
  );
};

export default SearchItem;