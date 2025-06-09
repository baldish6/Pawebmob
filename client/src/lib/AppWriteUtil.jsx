import { ID, Storage } from "appwrite";
import client from "@/config/AppwriteConfig";

export const ImageAppWriteUpload = (imageFile) => {
    const storage = new Storage(client);

    const promise = storage.createFile(
        "682f15180037da65c98f",
        ID.unique(),
        imageFile,
    );
    return promise;
};

export const ImageAppWriteDelete = (imgUrl) => {
    const one = imgUrl.split("buckets/")[1].split("/files/");
    const bucket_id = one[0];
    const two = (one[1].split("project="))[0].split("/view");
    const file_id = two[0];

    const storage = new Storage(client);
    const promise = storage.deleteFile(bucket_id, file_id);

    return promise;
};
