import { InstitutionDAO } from "../dao/institutionDAO";

export class InstitutionService {
  private institutionDAO: InstitutionDAO;

  constructor() {
    this.institutionDAO = new InstitutionDAO();
  }

  public addInstitution = async (body: any) => {
    return await this.institutionDAO.addInstitution(body);
  };

  public updateInstitution = async (body: any) => {
    return await this.institutionDAO.updateInstitution(body);
  };

  public readInstitutions = async (name: string) => {
    return await this.institutionDAO.readInstitutions(name);
  };

  public readAllInstitutions = async (name: string) => {
    return await this.institutionDAO.readAllInstitutions(name);
  };

  public readInstitution = async (id: string) => {
    return await this.institutionDAO.readInstitution(id);
  };

  public deleteInstitution = async (id: string) => {
    return await this.institutionDAO.deleteInstitution(id);
  };

  public removeAllInstitutions = async () => {
    return await this.institutionDAO.removeAllInstitutions();
  };

  public scoreInstitution = async (
    idUser: string,
    idInstitution: string,
    score: number,
    comment: string
  ) => {
    return await this.institutionDAO.scoreInstitution(
      idUser,
      idInstitution,
      score,
      comment
    );
  };

  public readInstitutionRating = async (idInstitution: string) => {
    return await this.institutionDAO.readInstitutionRating(idInstitution);
  };
}
