/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import useTasks from "../Hooks/useTasks";
import PrivateAxios from "../Hooks/PrivateAxios";
import toast from "react-hot-toast";

const AddTaskForm = () => {
  const [, refetch] = useTasks();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data) => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const time = month + "/" + date + "/" + year;
    const status = "pending";
    const taskInfo = { ...data, time, status };
    try {
      PrivateAxios.post("/taskMate/tasks", taskInfo)
        .then((res) => {
          if (res.data.acknowledged) {
            toast.success("Task Added.");
            refetch();
          }
        })
        .catch((err) => console.log(err));
    } catch (errors) {
      console.log(errors);
    }
  };

  const handleTaskCancel = () => {
    reset();
  };

  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="px-3 pt-6 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            {...register("title", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
          />
          {errors.title && (
            <span className="text-red-500 text-xs">Title is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-xs">
              Description is required
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="team"
          >
            Team
          </label>
          <input
            {...register("team")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="team"
            type="text"
            placeholder="Team"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="assignee"
          >
            Assignee
          </label>
          <input
            {...register("assignee")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="assignee"
            type="text"
            placeholder="Assignee"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="priority"
          >
            Priority
          </label>
          <select
            {...register("priority")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleTaskCancel}
            className="bg-gray-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Reset
          </button>
          <button
            className="bg-[#FA963A] hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
