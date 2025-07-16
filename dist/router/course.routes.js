"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = courseRoutes;
const createCourseController_1 = require("../controller/course/createCourseController");
const getCourseWhereIdController_1 = require("../controller/course/getCourseWhereIdController");
const getCourseController_1 = require("../controller/course/getCourseController");
const updateCourseController_1 = require("../controller/course/updateCourseController");
const deleteCourseController_1 = require("../controller/course/deleteCourseController");
async function courseRoutes(app) {
    const create = new createCourseController_1.CreateCourseController();
    const get = new getCourseController_1.GetCourseController();
    const getById = new getCourseWhereIdController_1.GetCourseWhereIdController();
    const update = new updateCourseController_1.UpdateCourseController();
    const del = new deleteCourseController_1.DeleteCourseController();
    app.post('/course', create.store.bind(create));
    app.get('/course', get.index.bind(get));
    app.get('/course/:id', getById.show.bind(getById));
    app.put('/course/:id', update.handle.bind(update));
    app.delete('/course/:id', del.handle.bind(del));
}
