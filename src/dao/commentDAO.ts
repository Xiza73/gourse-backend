import ErrorHandler from "../helpers/ErrorHandler";
import ResponseBase from "../helpers/ResponseBase";
import ResponseData from "../helpers/ResponseData";
import User, { IUser } from "../models/User";
import Client, { IClient } from "../models/Client";
import Institution from "../models/Institution";
import Course, { ICourse } from "../models/Course";
import Comment from "../models/Comment";

export class CommentDAO {
  constructor() {}

  private getCourseOrInstitutionById = async (id: string) => {
    try {
      const course = await Course.findById(id);
      if (course) return course;
      const institution = await Institution.findById(id);
      if (institution) return institution;
      return null;
    } catch (error) {
      return null;
    }
  };

  public addComment = async (body: any) => {
    const { comment, idEntity, idUser } = body;
    try {
      if (!comment || !idEntity || !idUser)
        return new ErrorHandler(400, "Error al obtener los datos");

      const user: (IUser & { _id: any }) | null = await User.findById(idUser);
      if (!user)
        return new ErrorHandler(400, "Datos de usuario no encontrados");

      const client: (IClient & { _id: any }) | null = await Client.findById(
        user.person._id
      );
      if (!client)
        return new ErrorHandler(400, "Datos de usuario no encontrados");

      const entity = await this.getCourseOrInstitutionById(idEntity);
      if (!entity)
        return new ErrorHandler(400, "Datos de la entidad no encontrados");

      const newComment = new Comment({
        user: user._id,
        content: comment,
        url: entity.url,
      });

      await newComment.save();

      return new ResponseBase(200, "Comentario agregado");
    } catch (error) {
      return new ErrorHandler(404, "Error al agregar comentario");
    }
  };

  public getComments = async (idEntity: string) => {
    try {
      if (!idEntity) return new ErrorHandler(400, "Error al obtener los datos");

      const entity = await this.getCourseOrInstitutionById(idEntity);
      if (!entity)
        return new ErrorHandler(400, "Datos de la entidad no encontrados");

      const comments = await Comment.find({ url: entity.url })
        .populate("user", "username")
        .sort({ createdAt: -1 });

      return new ResponseData(200, "Comentarios obtenidos", comments);
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener comentarios");
    }
  };
}
