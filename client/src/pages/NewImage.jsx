import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreatePost } from "@/services/api/ImageCall";
import { PostSchema } from "@/lib/schema/PostSchema";
import { useState } from "react";
import { ImageAppWriteUpload } from "@/lib/AppWriteUtil";
import { getImgUrl } from "@/lib/GetImgUrl";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "../styles/MiddlePost.css";


const NewImage = () => {
  const CreatePostMutation = useMutation({ mutationFn: CreatePost });
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setError,
  } = useForm({
    defaultValues: {
      title: "",
      image: undefined,
      desc: undefined,
      imgUrl: undefined,
    },
    resolver: zodResolver(PostSchema),
  });

  const watchImg = watch("image");

  const onSubmit = (data) => {
    setIsLoadingUpload(true);

    const response = ImageAppWriteUpload(data.image[0]);

    response.then((res) => {
      data["imgUrl"] = getImgUrl(res);

      const responseData = CreatePostMutation.mutateAsync(data);

      responseData
        .then(() => {
          reset();
          setIsLoadingUpload(false);
        })
        .catch((error) => {
          setIsLoadingUpload(false);
          console.log(error); // Failure
        });
    }),
      function (error) {
        console.log(error); // Failure
      };
  };

  if (isLoadingUpload) {
    return <div>Uploading Post ... </div>;
  }

  return (
    <div className="middle-post pt-9" >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Upload an Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className=" flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Label>File</Label>
            <Input
              type="file"
              {...register("image")}
              placeholder="file..."
              accept="image/*"
            />
            {errors.image && (
              <span className="error text-red-600">{errors.image.message}</span>
            )}
            {
              watchImg != undefined && watchImg.length > 0 && (
                <img src={URL.createObjectURL(watchImg[0])} alt="alt" />
              )
            }
            <Label>Title</Label>
            <Input
              type="text"
              {...register("title")}
              placeholder="Title"
            ></Input>
            {errors.title && (
              <span className="error text-red-600">{errors.title.message}</span>
            )}
            <Label>Description</Label>
            <Input
              type="text"
              {...register("desc")}
              placeholder="Description"
              rows={8}
            ></Input>
            {errors.desc && (
              <span className="error text-red-600">{errors.desc.message}</span>
            )}

             <Button type="submit">Upload</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewImage;