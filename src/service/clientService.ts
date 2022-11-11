import { transporter } from "../config/mailer";
import { ClientDAO } from "../dao/clientDAO";
import ErrorHandler from "../helpers/ErrorHandler";
import _config from "../config/config";
import ResponseBase from "../helpers/ResponseBase";

export class ClientService {
  private clientDAO: ClientDAO;

  constructor() {
    this.clientDAO = new ClientDAO();
  }

  public getUserProfile = async (username: any) => {
    return await this.clientDAO.getUserProfile(username);
  };

  public getUserProfileId = async (id: any) => {
    return await this.clientDAO.getUserProfileId(id);
  };

  public updateUserProfile = async (id: string, body: any) => {
    return await this.clientDAO.updateUserProfile(id, body);
  };

  public updateUserProfileId = async (body: any) => {
    return await this.clientDAO.updateUserProfileId(body);
  };

  public readClient = async (id: string) => {
    return await this.clientDAO.readClient(id);
  };

  public readClients = async () => {
    return await this.clientDAO.readClients();
  };

  public addFavorite = async (body: any) => {
    return await this.clientDAO.addFavorite(body);
  };

  public removeFavorite = async (body: any) => {
    return await this.clientDAO.removeFavorite(body);
  };

  public readFavorites = async (id: string) => {
    return await this.clientDAO.readFavorites(id);
  };

  public addCompleted = async (body: any) => {
    return await this.clientDAO.addCompleted(body);
  };

  public removeCompleted = async (body: any) => {
    return await this.clientDAO.removeCompleted(body);
  };

  public readCompleted = async (id: string) => {
    return await this.clientDAO.readCompleted(id);
  };

  public sendFeedbackMessage = async (body: any) => {
    try {
      const { name, email, message } = body;
      if (!name || !email || !message) {
        return new ErrorHandler(400, "Campos incompletos");
      }
      const info = await transporter.sendMail({
        from: `"Feedbakc from" <${email}>`,
        to: `${_config.mailUser}`,
        subject: "Nuevo mensaje de feedback de " + name,
        html: `
        <p>${message}</p>
        <hr>
        <p>Gourse.com</p>
        `,
      });
      if (!info.accepted) {
        return new ErrorHandler(400, "Error al enviar correo");
      }
      return new ResponseBase(200, "Mensaje enviado con éxito");
    } catch (error) {
      return new ErrorHandler(400, "Error al enviar correo");
    }
  };
}
