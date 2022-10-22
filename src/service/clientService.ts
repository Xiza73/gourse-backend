import { ClientDAO } from "../dao/clientDAO";

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
  }

  public removeFavorite = async (body: any) => {
    return await this.clientDAO.removeFavorite(body);
  }

  public readFavorites = async (id: string) => {
    return await this.clientDAO.readFavorites(id);
  }
}
