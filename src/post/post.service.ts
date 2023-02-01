import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private postRespository: PostRepository) {}

  getPostsByUserId(userId: number) {
    return this.postRespository.getPostsByUserId(userId);
  }

  getFeed(userId: number) {
    return this.postRespository.getFeed(userId);
  }
}
