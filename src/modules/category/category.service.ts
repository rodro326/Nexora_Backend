import Category from "./category.model";

const createCategory = async (payload: {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}) => {
  const existingCategory = await Category.findOne({
    $or: [
      { name: payload.name },
      { slug: payload.slug.toLowerCase() },
    ],
  });

  if (existingCategory) {
    throw new Error("Category with this name or slug already exists");
  }

  const category = await Category.create({
    ...payload,
    slug: payload.slug.toLowerCase(),
  });

  return category;
};

const getAllCategories = async () => {
  const categories = await Category.find().sort({ createdAt: -1 });

  return categories;
};

const getCategoryById = async (categoryId: string) => {
  const category = await Category.findById(categoryId);

  return category;
};

const updateCategory = async (
  categoryId: string,
  payload: {
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
    isActive?: boolean;
  }
) => {
  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      ...payload,
      ...(payload.slug && { slug: payload.slug.toLowerCase() }),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return category;
};

const deleteCategory = async (categoryId: string) => {
  const category = await Category.findByIdAndDelete(categoryId);

  return category;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};