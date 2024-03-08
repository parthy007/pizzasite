"use client";
import { useCheckAdmin } from "@/components/CheckAdmin";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const { loading, isAdmin } = useCheckAdmin();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    await fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const categoryPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editingCategory) {
        data._id = editingCategory._id;
      }
      const res = await fetch("/api/categories", {
        method: editingCategory ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      setCategoryName("");
      fetchCategories();
      setEditingCategory(null);
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(categoryPromise, {
      loading: editingCategory
        ? "Updating Category"
        : "Creating new categories...",
      success: editingCategory ? "Updated Category" : "Created category!",
      error: "Error",
    });
  };

  if (loading) {
    return "Loading...";
  }

  return (
    <section className="mx-auto mt-16 max-w-lg">
      <UserTabs isAdmin={isAdmin} />
      <form className="mt-8" onSubmit={handleFormSubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label htmlFor="">
              {editingCategory ? "Edit Category: " : "New Category Name"}
              {editingCategory && (
                <>
                  <b>{editingCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-2">
            <button type="submit">
              {editingCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="text-sm mt-8 text-gray-500">Edit Category:</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <button
              onClick={() => {
                setEditingCategory(c);
                setCategoryName(c.name);
              }}
              className="bg-gray-200 rounded-xl p-2 px-4 mb-1"
            >
              {c.name}
            </button>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
