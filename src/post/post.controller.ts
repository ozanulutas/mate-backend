import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CommentService } from 'src/comment/comment.service';
import { ParseIntPipe } from 'src/config/pipes';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private commentService: CommentService) {}

  @Get(':postId/comments')
  getComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentService.getCommentsByPostId(postId);
  }

  @Post(':postId/comments')
  createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @User('userId') userId: number,
    @Body('text') text: string,
  ) {
    return this.commentService.createComment({ postId, userId, text });
  }
}
