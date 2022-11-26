import ErrorHandler from "../helpers/ErrorHandler";
import ResponseBase from "../helpers/ResponseBase";
import ResponseData from "../helpers/ResponseData";
import Course from "../models/Course";
import Institution, { IInstitution } from "../models/Institution";
import User, { IUser } from "../models/User";
import ClientInstitution, {
  IClientInstitution,
} from "../models/ClientInstitution";

export class InstitutionDAO {
  constructor() {}

  public addInstitution = async (body: any) => {
    const { name, description, url, social, email, logo, status } = body;
    try {
      if (
        !name ||
        !description ||
        !url ||
        !social ||
        !email ||
        !logo ||
        (!status && status !== 0)
      )
        return new ErrorHandler(400, "Faltan datos");

      const institution: IInstitution = new Institution({
        name,
        description,
        url,
        social,
        email,
        logo,
        status,
      });
      await institution.save();
      return new ResponseBase(200, "Institución creada correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al crear institución");
    }
  };

  public updateInstitution = async (body: any) => {
    const { _id, name, description, url, social, email, logo, status } = body;
    try {
      if (
        !_id ||
        !name ||
        !description ||
        !url ||
        !social ||
        !email ||
        !logo ||
        (!status && status !== 0)
      )
        return new ErrorHandler(400, "Faltan datos");

      const institution = await Institution.findById(_id);
      if (!institution)
        return new ErrorHandler(404, "Error al obtener institución");

      await Institution.findByIdAndUpdate(_id, {
        name,
        description,
        url,
        social,
        email,
        logo,
        status,
      });

      if (status !== institution.status) {
        await Course.updateMany({ institution }, { status });
      }
      return new ResponseBase(200, "Institución actualizada correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al actualizar institución");
    }
  };

  public readInstitutions = async (name: string) => {
    try {
      let data;
      if (name) {
        data = await Institution.find({
          name: { $regex: new RegExp(name, "i") },
          status: 1,
        });
      } else {
        data = await Institution.find({ status: 1 });
      }
      return new ResponseData(
        200,
        "Instituciones obtenidas correctamente",
        data
      );
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener instituciones");
    }
  };

  public readAllInstitutions = async (name: string) => {
    try {
      let data;
      if (name) {
        data = await Institution.find({
          name: { $regex: new RegExp(name, "i") },
        });
      } else {
        data = await Institution.find();
      }
      return new ResponseData(
        200,
        "Instituciones obtenidas correctamente",
        data
      );
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener instituciones");
    }
  };

  public readInstitution = async (id: string) => {
    try {
      const data = await Institution.findOne({ _id: id, status: 1 });

      if (!data) return new ErrorHandler(404, "No existe la institución");

      return new ResponseData(200, "Institución obtenida correctamente", data);
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener institución");
    }
  };

  public deleteInstitution = async (id: string) => {
    try {
      const data = await Institution.deleteOne({ _id: id });
      return new ResponseData(200, "Institución eliminada correctamente", data);
    } catch (error) {
      return new ErrorHandler(404, "Error al eliminar institución");
    }
  };

  public removeAllInstitutions = async () => {
    try {
      const data = await Institution.deleteMany({});
      return new ResponseData(
        200,
        "Instituciones eliminadas correctamente",
        data
      );
    } catch (error) {
      return new ErrorHandler(404, "Error al eliminar instituciones");
    }
  };

  public scoreInstitution = async (
    idUser: string,
    idInstitution: string,
    score: number,
    comment: string
  ) => {
    try {
      if (
        !idUser ||
        !idInstitution ||
        score === undefined ||
        score === null ||
        !comment
      ) {
        return new ErrorHandler(400, "Faltan datos");
      }
      const institution = await Institution.findById(idInstitution);

      if (!institution)
        return new ErrorHandler(400, "No se encontró la institución");

      const institutionUrl = institution.url;

      const user: (IUser & { _id: any }) | null = await User.findById(idUser);

      if (!user) return new ErrorHandler(400, "No se encontró el usuario");

      let clientInstitution: (IClientInstitution & { _id: any }) | null =
        await ClientInstitution.findOne({
          user: user._id,
          institution: institutionUrl,
        });

      if (!clientInstitution) {
        clientInstitution = new ClientInstitution({
          user: idUser,
          institution: institutionUrl,
          score,
          comment,
        });
        await clientInstitution.save();
      } else {
        clientInstitution = await ClientInstitution.findByIdAndUpdate(
          clientInstitution._id,
          {
            score,
            comment,
          },
          { new: true }
        );
      }

      return new ResponseBase(200, "Institución calificada correctamente");
    } catch (error) {
      return new ErrorHandler(400, "Error al calificar institución");
    }
  };

  public readInstitutionRating = async (idInstitution: string) => {
    try {
      if (!idInstitution) {
        return new ErrorHandler(400, "Faltan datos");
      }

      const institution = await Institution.findById(idInstitution);

      if (!institution)
        return new ErrorHandler(400, "No se encontró la institución");

      const institutionUrl = institution.url;

      const clientInstitutions: (IClientInstitution & { _id: any })[] =
        await ClientInstitution.find({ institution: institutionUrl });

      const totalScore = clientInstitutions.reduce(
        (total, clientInstitution) => total + clientInstitution.score,
        0
      );

      const averageScore = totalScore / clientInstitutions.length;

      const comments = await Promise.all(
        clientInstitutions.map(async (clientInstitution) => {
          const user = await User.findById(clientInstitution.user);

          if (!user) return new ErrorHandler(400, "Error al obtener usuarios");

          return {
            user: user.username,
            score: clientInstitution.score,
            comment: clientInstitution.comment,
          };
        })
      );

      return new ResponseData(
        200,
        "Calificación de la institución obtenida correctamente",
        {
          averageScore,
          comments,
        }
      );
    } catch (error) {
      return new ErrorHandler(
        400,
        "Error al obtener calificación de la institución"
      );
    }
  };
}
