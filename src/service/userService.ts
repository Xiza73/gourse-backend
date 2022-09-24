import { UserDAO } from "../dao/userDAO";

export class UserService {
  private userDAO: UserDAO;

  constructor() {
    this.userDAO = new UserDAO();
  }

  public getUsers = async (person: string) => {
    return await this.userDAO.getUsers(person);
  };
  
  public getUsersByRole = async (body: any) => {
    return await this.userDAO.getUsersByRole(body);
  };
  
  public getUser = async (body: any) => {
    return await this.userDAO.getUser(body);
  };
  
  public updateUser = async (body: any) => {
    return await this.userDAO.updateUser(body);
  };
  
  public deleteUser = async (id: string) => {
    return await this.userDAO.deleteUser(id);
  };

  public updatePassword = async (body: any) => {
    return await this.userDAO.updatePassword(body);
  };
  
}
