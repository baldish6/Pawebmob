import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchPost } from "@/services/api/ImageCall";
import { SearchUser } from "@/services/api/UserCall";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        <div className="flex w-full max-w-sm flex-col gap-6">
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
                    {searchParam == "" ? (
                        <div>Start searching</div>
                    ) : (
                        <>
                            <TabsContent value="image">
                                <h1>Images : </h1>
                                {images?.map((image) => {
                                    return (
                                        <>
                                            <h1>{image.title}</h1>
                                            <img src={image.imgUrl} />
                                        </>
                                    );
                                })}
                            </TabsContent>
                            <TabsContent value="user">
                                <h1>Users : </h1>
                                {users?.map((user) => {
                                    return (
                                        <div className="flex">
                                          <a href={"http://localhost:5174/profile/" + user._id}>
                                          <h1>{user.name}</h1>
                                            <Avatar className="h-20 w-20" >
        <AvatarImage src={user.avatarUrl} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
                                          </a>
                                            
                                        </div>
                                    );
                                })}
                            </TabsContent>
                        </>
                    )}
                </Tabs>
            </>

            <Label>Search</Label>
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

            <h1>Result : </h1>
        </div>
    );
};

export default SearchItem;