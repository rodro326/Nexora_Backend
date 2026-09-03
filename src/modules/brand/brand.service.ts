import Brand from "./brand.model";

const createBrand = async (payload: {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
}) => {
  const existingBrand = await Brand.findOne({
    $or: [
      { name: payload.name },
      { slug: payload.slug.toLowerCase() },
    ],
  });

  if (existingBrand) {
    throw new Error("Brand with this name or slug already exists");
  }

  const brand = await Brand.create({
    ...payload,
    slug: payload.slug.toLowerCase(),
  });

  return brand;
};

const getAllBrands = async () => {
  const brands = await Brand.find().sort({ createdAt: -1 });

  return brands;
};

const getBrandById = async (brandId: string) => {
  const brand = await Brand.findById(brandId);

  return brand;
};

const updateBrand = async (
  brandId: string,
  payload: {
    name?: string;
    slug?: string;
    description?: string;
    logo?: string;
    isActive?: boolean;
  }
) => {
  const brand = await Brand.findByIdAndUpdate(
    brandId,
    {
      ...payload,
      ...(payload.slug && { slug: payload.slug.toLowerCase() }),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return brand;
};

const deleteBrand = async (brandId: string) => {
  const brand = await Brand.findByIdAndDelete(brandId);

  return brand;
};

export const brandService = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};