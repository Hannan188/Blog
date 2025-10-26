import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name = "content", control, label, defaultValue = "" }) {
  if (!control) {
    console.warn("⚠️ RTE: 'control' prop missing!");
    return null;
  }

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="dn5wpnchy6u2tea2yf994k3pkzq3crrundtyf3p9ywdrz76t"
            tinymceScriptSrc="https://cdn.tiny.cloud/1/dn5wpnchy6u2tea2yf994k3pkzq3crrundtyf3p9ywdrz76t/tinymce/6/tinymce.min.js"
            init={{
              base_url:
                "https://cdn.tiny.cloud/1/dn5wpnchy6u2tea2yf994k3pkzq3crrundtyf3p9ywdrz76t/tinymce/6",
              suffix: ".min",
              height: 400,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic forecolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            value={value || ""}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
