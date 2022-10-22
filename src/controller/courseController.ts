import { NextFunction, Request, Response } from "express";
import { CourseService } from "../service/courseService";

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  public addCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.courseService.addCourse(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public readCourses = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const name = req.query.name as string;
    const field = req.query.field as string | "start";
    const sort = req.query.sort as string | "1";

    const response = await this.courseService.readCourses(
      name,
      field,
      Number(sort)
    );

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public readCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const response = await this.courseService.readCourse(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public updateCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const response = await this.courseService.updateCourse(id, req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public removeCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const response = await this.courseService.removeCourse(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public removeCourseByInstitution = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { institutionName } = req.params;
    const response = await this.courseService.removeCourseByInstitution(
      institutionName
    );

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public readCoursesByInstitutionId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { institutionId } = req.params;
    const response = await this.courseService.readCoursesByInstitutionId(
      institutionId
    );

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public removeAllCourses = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.courseService.removeAllCourses();

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };
}
