import { CommentDAO } from "../dao/commentDAO";

export class CommentService {
  private commentDAO: CommentDAO;

  constructor() {
    this.commentDAO = new CommentDAO();
  }

  public addComment = async (body: any) => {
    return await this.commentDAO.addComment(body);
  };

  public getComments = async (idEntity: string) => {
    return await this.commentDAO.getComments(idEntity);
  };
}
