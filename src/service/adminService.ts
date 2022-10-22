import { AdminDAO } from "../dao/adminDAO";

export class AdminService {
  private adminDAO: AdminDAO;

  constructor() {
    this.adminDAO = new AdminDAO();
  }

  public getUserProfileId = async (id: any) => {
    return await this.adminDAO.getUserProfileId(id);
  };

  public createUser = async (request: any) => {
    return await this.adminDAO.createUser(request);
  };

  public updateUser = async (request: any) => {
    return await this.adminDAO.updateUser(request);
  };

  public deleteUser = async (id: string) => {
    return await this.adminDAO.deleteUser(id);
  };
}
