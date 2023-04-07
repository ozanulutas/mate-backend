import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private postRespository: PostRepository) {}

  createPost(createPostDto: CreatePostDto) {
    return this.postRespository.createPost(createPostDto);
  }

  getPostsByUserId(userId: number) {
    return this.postRespository.getPostsByUserId(userId);
  }

  getFeed(userId: number) {
    return this.postRespository.getFeed(userId);
  }
}
