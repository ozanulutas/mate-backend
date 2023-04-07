import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto';
import { createToast } from 'src/config/notification/notification';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async createComment(createCommentDto: CreateCommentDto) {
    const data = await this.commentRepository.createComment(createCommentDto);

    return {
      data,
      ...createToast({ text: 'Your comment is published.' }),
    };
  }

  getCommentsByPostId(postId: number) {
    return this.commentRepository.getCommentsByPostId(postId);
  }
}
