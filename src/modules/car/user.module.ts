import Router from "koa-router";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

const router = new Router();

const service = new UserService();
const controller = new UserController(service);

router.get("/", async (ctx) => {
  await controller.getAllUsers(ctx);
});
router.get("/:id", async (ctx) => {
  await controller.getOneUser(ctx);
});
router.post("/", async (ctx) => {
  await controller.create(ctx);
});
router.put("/:id", async (ctx) => {
  await controller.update(ctx);
});
router.delete("/:id", async (ctx) => {
  await controller.deleteUser(ctx);
});

export { router };
