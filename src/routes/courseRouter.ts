import { Router } from "express";
import { CourseController } from "../controller/courseController";

export class CourseRouter {
  private readonly _router: Router = Router();
  private readonly _controller: CourseController = new CourseController();

  constructor() {
    this._configure();
  }

  get router(): Router {
    return this._router;
  }

  private _configure(): void {
    this._router.post('/', this._controller.addCourse);
    this._router.get('/', this._controller.readCourses);
    this._router.get('/:id', this._controller.readCourse);
    this._router.put('/:id', this._controller.updateCourse);
    this._router.delete('/all', this._controller.removeAllCourses); 
    this._router.delete('/:id', this._controller.removeCourse);
    this._router.delete('/institution/:institutionName', this._controller.removeCourseByInstitution);
    this._router.get('/institution/:institutionId', this._controller.readCoursesByInstitutionId);
  }
}
