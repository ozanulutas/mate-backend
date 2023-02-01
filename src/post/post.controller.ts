import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { ParseIntPipe } from 'src/config/pipes';

@Controller('posts')
export class PostController {
  constructor(private commentService: CommentService) {}

  @Get(':postId/comments')
  getComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentService.getCommentsByPostId(postId);
  }
}
