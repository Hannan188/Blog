import React, { useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Slug transformer
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    return "";
  }, []);

  // Auto-update slug when title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      let fileId = post?.featuredimage || null;

      // Upload file if new image selected
      if (data.image && data.image[0]) {
        const uploadedFile = await appwriteService.uploadFile(data.image[0]);
        if (!uploadedFile) {
          alert("File upload failed");
          return;
        }
        if (post?.featuredimage) await appwriteService.deleteFile(post.featuredimage);
        fileId = uploadedFile.$id;
      }

      const postPayload = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
        featuredimage: fileId,
        userid: userData.$id,
      };

      if (!post) {
        // Create new post
        const dbPost = await appwriteService.createPost(postPayload);
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        // Update existing post
        const dbPost = await appwriteService.updatePost(post.$id, postPayload);
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("An error occurred. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Left column */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
          }
        />
        {/* TinyMCE Editor */}
        <RTE name="content" control={control} defaultValue={getValues("content")} />
      </div>

      {/* Right column */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {/* Image preview */}
        {post?.featuredimage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredimage) || "/placeholder.png"}
              alt={post.title || "Featured"}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
