import ErrorHandler from "../helpers/ErrorHandler";
import ResponseBase from "../helpers/ResponseBase";
import ResponseData from "../helpers/ResponseData";
import Course, { ICourse } from "../models/Course";
import Institution, { IInstitution } from "../models/Institution";

export class CourseDAO {
  constructor() {}

  public addCourse = async (body: any) => {
    const { 
      institutionName,
      name, 
      description, 
      image, 
      price, 
      currency, 
      start, 
      duration, 
      schedule, 
      url } = body;
    
    try {
      if (!institutionName || !name || !price || !currency || !start || !url) {
        return new ErrorHandler(400, "Faltan datos");
      }

      const institution: (IInstitution & { _id: string; }) | null = await Institution.findOne({
        name: institutionName
      }).exec(); 

      if (!institution) {
        return new ErrorHandler(400, "No se encontró la institución");
      }

      const course: (ICourse & { _id: string; }) | null = await Course.findOne({
        name
      }).exec();

      if (course) {
        return new ErrorHandler(422, "El curso ya está registrado");
      }

      const newCourse: ICourse = new Course({
        institution: institution._id,
        name,
        description,
        image,
        price,
        currency,
        start,
        duration,
        schedule,
        url
      });
      await newCourse.save();

      return new ResponseBase(200, "Curso registrado correctamente");
    } catch (error) { 
      console.log(error);
      return new ErrorHandler(400, "Error al registrar curso");
    }
  };

  public readCourses = async (name: string, field: string, sort: number) => {
    try {
      let data;
      if (name) {
        data = await Course.find({ name: {$regex: new RegExp(name, 'i')}, status: 1 }).sort([[field, sort]]).exec();
      } else {
        data = await Course.find({ status: 1 }).sort([[field, sort]]).exec();
      }
      return new ResponseData(200, "Cursos obtenidos correctamente", data);
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener cursos");
    }
  };

  public readCourse = async (id: string) => {
    try {
      const data = await Course.findOne({ _id: id, status: 1 });

      if (!data)
        return new ErrorHandler(404, "No existe el curso");

      return new ResponseData(200, "Curso obtenido correctamente", data);
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener curso");
    }
  };

  public updateCourse = async (id: string, body: any) => {
    const { 
      institutionName,
      name, 
      description, 
      image, 
      price, 
      currency, 
      start, 
      duration, 
      schedule, 
      url } = body;
    
    try {
      if (!institutionName || !name || !price || !currency || !start || !url) {
        return new ErrorHandler(400, "Faltan datos");
      }
      
      const course: (ICourse & { _id: string; }) | null = await Course.findOne({
        name
      }).exec();

      if (!course) {
        return new ErrorHandler(422, "No se encontró el curso");
      }

      const institution: (IInstitution & { _id: string; }) | null = await Institution.findOne({
        name: institutionName
      }).exec(); 

      if (!institution) {
        return new ErrorHandler(400, "No se encontró la institución");
      }

      await Course.findByIdAndUpdate(id, {
        institution,
        name,
        description,
        image,
        price,
        currency,
        start,
        duration,
        schedule,
        url
      });

      return new ResponseBase(200, "Curso actualizado correctamente");
    } catch (error) { 
      console.log(error);
      return new ErrorHandler(400, "Error al actualizar curso");
    }    
  };

  public removeCourse = async (id: string) => {
    try {
      await Course.findByIdAndDelete(id);
      return new ResponseBase(200, "Curso eliminado correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al eliminar curso");
    }
  };

  public removeCourseByInstitution = async (institutionName: string) => {
    try {
      const institution = await Institution.findOne({name: institutionName});

      if (!institution) {
        return new ErrorHandler(400, "No se encontró la institución");
      }

      await Course.deleteMany({institution});

      return new ResponseBase(200, "Cursos eliminado correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al eliminar cursos");
    }
  };

  public readCoursesByInstitutionId = async (institutionId: string) => {
    try {
      const institution = await Institution.findById(institutionId);

      if (!institution) {
        return new ErrorHandler(400, "No se encontró la institución");
      }

      const data = await Course.find({institution});

      return new ResponseData(200, "Cursos obtenidos correctamente", data);
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener cursos");
    }
  };

  public removeAllCourses = async () => {
    try {
      await Course.deleteMany({});
      return new ResponseBase(200, "Cursos eliminados correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al eliminar cursos");
    }
  }

}