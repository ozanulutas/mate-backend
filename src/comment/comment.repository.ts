import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

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
