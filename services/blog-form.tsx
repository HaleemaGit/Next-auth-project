import axios from "axios";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import classes from "./blog-form.module.css";

type FormData = {
  title: string;
  content: string;
  img: string;
  file: any;
  author: string;
};

export default function BlogForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    let toastId;
    toastId = toast.loading("Submitting post....");
    try {
      await axios.post("/api/post", data);
      toast.success("Successfully posted", { id: toastId });
      reset();
    } catch (error) {
      toast.error("Unable to submit your new post", { id: toastId });
    }
    router.push("");
  };
  // title and content will have correct type

  return (
    <div className="space-y-10 m-28">
      <div className="space-y-10 md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className=" mt-16 px-4 sm:px-0">
            <h3 className=" mt-5 text-2xl font-medium leading-6 text-gray-900">
              MAKE A POST
            </h3>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="author"
                      className=" pt-6 block text-sm font-medium text-gray-700"
                    >
                     Author
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      {/* <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">http://</span> */}
                      <input
                        {...register("author")}
                        type="text"
                        name="author"
                        id="author"
                        className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                    <label
                      htmlFor="title"
                      className=" pt-6 block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      {/* <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">http://</span> */}
                      <input
                        {...register("title")}
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="We made it!"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Content
                  </label>
                  <div className="mt-1">
                    <textarea
                      {...register("content")}
                      id="about"
                      name="content"
                      rows="3"
                      className=" first-line:uppercase first-line:tracking-widest
         first-letter:text-7xl first-letter:font-bold first-letter:text-white
          first-letter:mr-3 first-letter:float-left mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Share your success story here..."
                    ></textarea>
                  </div>
                  {/* <p className="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p> */}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <label className="block text-sm font-medium text-gray-700">
                        Upload Something Worthwhile
                      </label>
                      <div className="shrink-0">
                        {/* <img className="h-16 w-16 object-cover rounded-full" src="https://unsplash.com/photos/cYpqYxGeqts" /> */}
                      </div>
                      <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                          {...register("file")}
                          name="file"
                          type="file"
                          className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
     "
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                {/* <button
                  type="submit"
                  className="bg-gray-300 rounded-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Post
                </button> */}
                <button
                  type="submit"
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div>

    //  <div className="row">
    //    <label>Title</label>
    //   </div>
    //   <div className="row">
    //   <input  {...register("title")} />
    //   </div>

    //   <div className="row">
    //   <label>Content</label>
    //   </div>
    //   <div>
    //   <input className={classes.header}{...register("content")} />
    //   </div>
    //   <div className="form-group">
    //     <button type="submit" className="btn btn-primary mr-1">
    //       Post
    //     </button>

    //   </div>
    //   </div>
    // </form>
  );
}

{
  /* <button type="button" onClick={() => reset()} className="btn btn-secondary">
          Reset
        </button> */
}
