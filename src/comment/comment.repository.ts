import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  createComment(createComment: CreateCommentDto) {
    return this.prisma.comment.create({
      data: createComment,
      select: {
        id: true,
      },
    });
  }

  getCommentsByPostId(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      select: {
        id: true,
        text: true,
        postId: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
}
