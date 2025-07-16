"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const createUserController_1 = require("../controller/users/createUserController");
const getUserController_1 = require("../controller/users/getUserController");
const UpdateUserController_1 = require("../controller/users/UpdateUserController");
const DeleteUserController_1 = require("../controller/users/DeleteUserController");
async function userRoutes(app) {
    const create = new createUserController_1.UserController();
    const get = new getUserController_1.GetUserController();
    const update = new UpdateUserController_1.UpdateUserController();
    const del = new DeleteUserController_1.DeleteUserController();
    app.post('/register', create.store.bind(create));
    app.get('/user', get.index.bind(get));
    app.put('/user/:id', update.handle.bind(update));
    app.delete('/user/:id', del.handle.bind(del));
}
