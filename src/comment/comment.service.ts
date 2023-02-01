import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  getCommentsByPostId(postId: number) {
    return this.commentRepository.getCommentsByPostId(postId);
  }
}
