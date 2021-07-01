import { Router } from "express";
import { AuthenticateUserController } from "./src/controllers/AuthenticateUserController";
import { CreateComplimentController } from "./src/controllers/CreateComplimentController";
import { CreateTagController } from "./src/controllers/CreateTagController";
import { CreateUserController } from "./src/controllers/CreateUserController";
import { ListTagsController } from "./src/controllers/ListTagsController";
import { ListUserReceivedComplimentsController } from "./src/controllers/ListUserReceivedComplimentsController";
import { ListUsersController } from "./src/controllers/ListUsersController";
import { ListUserSentComplimentsController } from "./src/controllers/ListUserSentComplimentsController";
import { ensureAdmin } from "./src/middlewares/ensureAdmin";
import { ensureAuthenticated } from "./src/middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSentComplimentsController =
  new ListUserSentComplimentsController();
const listUserReceivedComplimentsController =
  new ListUserReceivedComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/users", createUserController.handle);
router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
router.get("/tags", ensureAuthenticated, listTagsController.handle);

router.post("/login", authenticateUserController.handle);
router.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  "/users/compliments/sent",
  ensureAuthenticated,
  listUserSentComplimentsController.handle
);
router.get(
  "/users/compliments/received",
  ensureAuthenticated,
  listUserReceivedComplimentsController.handle
);

router.get("/users", ensureAuthenticated, listUsersController.handle);

export { router };