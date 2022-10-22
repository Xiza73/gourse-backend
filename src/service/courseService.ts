import { CourseDAO } from "../dao/courseDAO";

export class CourseService {
  private courseDAO: CourseDAO;

  constructor() {
    this.courseDAO = new CourseDAO();
  }

  public addCourse = async (body: any) => {
    return await this.courseDAO.addCourse(body);
  };

  public readCourses = async (name: string, field: string, order: number) => {
    return await this.courseDAO.readCourses(name, field, order);
  };

  public readCourse = async (id: string) => {
    return await this.courseDAO.readCourse(id);
  };

  public updateCourse = async (id: string, body: any) => {
    return await this.courseDAO.updateCourse(id, body);
  };

  public removeCourse = async (id: string) => {
    return await this.courseDAO.removeCourse(id);
  };

  public removeCourseByInstitution = async (institutionName: string) => {
    return await this.courseDAO.removeCourseByInstitution(institutionName);
  };

  public readCoursesByInstitutionId = async (institutionId: string) => {
    return await this.courseDAO.readCoursesByInstitutionId(institutionId);
  };

  public removeAllCourses = async () => {
    return await this.courseDAO.removeAllCourses();
  };
}
