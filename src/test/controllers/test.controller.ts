import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TestService } from '../services/test.service';
import CreateTestDto from '../dto/create-test.dto';
import UpdateTestDto from '../dto/update-test.dto';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import TestDto from '../dto/complex/test.dto';
import CompleteTestDto from '../dto/complete-test.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Тесты')
@Controller()
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly questionService: QuestionService,
    private readonly answerService: AnswerService
  ) { }

  @Post('submitTest')
  async submitTest(@Body() testDto: TestDto) {
    const createdTest = await this.testService.create(testDto as CreateTestDto);

    for (const question of testDto.questions) {
      const answers = [...question.answers];

      delete question['id'];
      delete question['answers'];

      const createdQuestion = await this.questionService.create({ ...question, test_id: createdTest.id });

      for (const answer of answers) {
        delete answer['id'];

        await this.answerService.create({ ...answer, question_id: createdQuestion.id });
      }
    }
  }

  @Post('createOne')
  async createTest(@Body() testDto) {
    const createdTest = await this.testService.create(testDto as CreateTestDto);
    
    return createdTest;
  }

  @Get('test/all')
  async getAll() {
    return await this.testService.findAll();
  }

  @Get('test/one/:id')
  async getTest(@Param('id') id) {
    return await this.testService.findOne(id);
  }

  @Patch('test/:id')
  async editTest(@Param('id') id, @Body() updateTestDto: UpdateTestDto) {
    return await this.testService.update(id, updateTestDto);
  }

  @Delete('test/:id')
  async deleteTest(@Param('id') id) {
    return await this.testService.remove(id);
  }

  // Прохождение
  // @UseGuards(JwtGuard)
  @Post('complete')
  async completeTest(@Query('isVr') isVr, @Body() completeTestDto: CompleteTestDto) {
    let finalScore = 0;

    isVr = isVr == "true";

    if(!isVr) {
      for (const answer of completeTestDto.answers) {
        const answerFetch = await this.answerService.findOne(answer.answer_id);
  
        if (answerFetch && answerFetch.is_correct) {
          finalScore += answer.score;
        }
      }
    }

    return await this.testService.createTestResult({ test_id: completeTestDto.test_id, score: finalScore, is_vr: isVr, user_id: completeTestDto.user_id });
  }
}
