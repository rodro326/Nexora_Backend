"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                    receivedValue: issue.path.reduce((value, key) => {
                        if (value !== null &&
                            typeof value === "object") {
                            return value[String(key)];
                        }
                        return undefined;
                    }, req.body),
                })),
            });
        }
        req.body = result.data;
        next();
    };
};
exports.default = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map