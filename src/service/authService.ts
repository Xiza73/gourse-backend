import { AuthDAO } from "../dao/authDAO";
import { transporter } from "../config/mailer";
import _config from "../config/config";
import ResponseBase from "../helpers/ResponseBase";
import ErrorHandler from "../helpers/ErrorHandler";
import ResponseData from "../helpers/ResponseData";

export class AuthService {
  private authDAO: AuthDAO;

  constructor() {
    this.authDAO = new AuthDAO();
  }

  public signIn = async (request: any) => {
    return await this.authDAO.signIn(request);
  };

  public signUp = async (request: any) => {
    return await this.authDAO.signUp(request);
  };

  public async logout() {
    return await this.authDAO.logout();
  }

  public sendRecoverEmail = async (body: any) => {
    try {
      const response: ResponseData | ErrorHandler =
        await this.authDAO.sendRecoverEmail(body);
      if (response instanceof ErrorHandler) {
        return response;
      }
      const { email } = body;
      const info = await transporter.sendMail({
        from: `"Contraseña olvidada 👻" <${_config.mailUser}>`,
        to: `${email}`,
        subject: "Reestablecimiento de contraseña ✔",
        html: `
        <b>Por favor ingresa al siguiente enlace para continuar con la recuperación de contraseña: </b>
        <p><a href="${_config.clientUrl}/new-password?id=${response.data.id}">Cambiar contraseña</a></p>
        <hr>
        <p>Gourse.com</p>
        `,
      });
      if (!info.accepted) {
        return new ErrorHandler(400, "Error al enviar correo");
      }
      response.message +=
        ". Correo enviado con éxito. Por favor revise su bandeja de entrada";
      return new ResponseBase(200, response.message);
    } catch (error) {
      return new ErrorHandler(400, "Error al enviar correo");
    }
  };

  public async isUser(body: any) {
    return await this.authDAO.isUser(body);
  }

  public async changePassword(body: any) {
    return await this.authDAO.changePassword(body);
  }
}
