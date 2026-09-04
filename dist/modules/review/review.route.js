"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const review_controller_1 = require("./review.controller");
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
// Customer: Create review
router.post("/", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), (0, validation_middleware_1.default)(review_validation_1.createReviewValidationSchema), review_controller_1.reviewController.createReview);
// Public: Get approved reviews for a product
router.get("/product/:productId", review_controller_1.reviewController.getProductReviews);
// Customer: Get my reviews
router.get("/my", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), review_controller_1.reviewController.getMyReviews);
// Customer: Update own review
router.patch("/:reviewId", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), (0, validation_middleware_1.default)(review_validation_1.updateReviewValidationSchema), review_controller_1.reviewController.updateReview);
// Customer: Delete own review
router.delete("/:reviewId", auth_middleware_1.default, (0, role_middleware_1.default)("customer"), review_controller_1.reviewController.deleteReview);
// Admin: Get all reviews
router.get("/", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), review_controller_1.reviewController.getAllReviews);
// Admin: Approve/reject review
router.patch("/:reviewId/approval", auth_middleware_1.default, (0, role_middleware_1.default)("admin"), (0, validation_middleware_1.default)(review_validation_1.updateReviewApprovalValidationSchema), review_controller_1.reviewController.updateReviewApproval);
exports.default = router;
//# sourceMappingURL=review.route.js.map