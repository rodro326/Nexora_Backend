
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validationMiddleware = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
          receivedValue: issue.path.reduce(
            (value: unknown, key) => {
              if (
                value !== null &&
                typeof value === "object"
              ) {
                return (value as Record<string, unknown>)[String(key)];
              }

              return undefined;
            },
            req.body as unknown
          ),
        })),
      });
    }

    req.body = result.data;
    next();
  };
};

export default validationMiddleware;
