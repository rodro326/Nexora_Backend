import { Request, Response } from "express";
import { brandService } from "./brand.service";

const createBrand = async (req: Request, res: Response) => {
  try {
    const brand = await brandService.createBrand(req.body);

    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Brand creation failed",
    });
  }
};

const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await brandService.getAllBrands();

    res.status(200).json({
      success: true,
      message: "Brands retrieved successfully",
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to retrieve brands",
    });
  }
};

const getBrandById = async (req: Request, res: Response) => {
  try {
    const brandId = req.params.brandId as string;

    const brand = await brandService.getBrandById(brandId);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand retrieved successfully",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to retrieve brand",
    });
  }
};

const updateBrand = async (req: Request, res: Response) => {
  try {
    const brandId = req.params.brandId as string;

    const brand = await brandService.updateBrand(brandId, req.body);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Brand update failed",
    });
  }
};

const deleteBrand = async (req: Request, res: Response) => {
  try {
    const brandId = req.params.brandId as string;

    const brand = await brandService.deleteBrand(brandId);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Brand deletion failed",
    });
  }
};

export const brandController = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};