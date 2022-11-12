import { NextFunction, Request, Response } from "express";
import { CommentService } from "../service/commentService";

export class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  public addComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.commentService.addComment(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public getComments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.commentService.getComments(
      req.params.id as string
    );

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };
}
