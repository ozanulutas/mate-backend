import { Module } from '@nestjs/common';
import { CommentModule } from 'src/comment/comment.module';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [CommentModule],
  controllers: [PostController],
  providers: [PostRepository, PostService],
  exports: [PostService],
})
export class PostModule {}
