import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseModel } from 'src/common/decorators/use-model.decorator';
import { FindInterceptor } from 'src/common/filters/find.interceptor';
import { CommentService } from '../services/comment.service';
import { Comment } from '../entities/comments.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Комментарии')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@GetCurrentUser() user: any, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto, user.id);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }


  @Post('all')
  @UseModel(Comment)
  @UseInterceptors(FindInterceptor)
  filterAll(@Body() FilterDto:any){}

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }

}
