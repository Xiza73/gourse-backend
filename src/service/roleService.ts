import { RoleDAO } from '../dao/roleDAO';

export class RoleService {
  private roleDAO: RoleDAO;

  constructor() {
    this.roleDAO = new RoleDAO();
  }

  public addRole = async (description: string) => {
    return await this.roleDAO.addRole(description);
  };
  
  public getRole = async (id: string) => {
    return await this.roleDAO.getRole(id);
  };

  public readRoles = async () => {
    return await this.roleDAO.readRoles()
  };
  
  public updateRole = async (body: any) => {
    return await this.roleDAO.updateRole(body)
  };
  
  public deleteRole = async (body: any) => {
    return await this.roleDAO.deleteRole(body)
  };
}
