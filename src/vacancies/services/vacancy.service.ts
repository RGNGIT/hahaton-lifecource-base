import { Inject, Injectable } from '@nestjs/common';
import { CreateVacancyDto } from '../dto/create-vacancy.dto';
import { UpdateVacancyDto } from '../dto/update-vacancy.dto';
import { Vacancy } from '../entities/vacancy.entity';
import constants from 'src/common/constants';
import { UserVacancies } from '../entities/vacancy-user.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class VacancyService {
  constructor(
    @Inject(constants.VACANCIES_REPOSITORY)
    private vacanciesRepository: typeof Vacancy,
    @Inject(constants.USER_VACANCIES_REPOSITORY)
    private userVacanciesRepository: typeof UserVacancies
  ) { }

  async create(createVacancyDto: CreateVacancyDto) {
    const vacancy = await this.vacanciesRepository.create({ ...createVacancyDto });
    return vacancy;
  }

  async findAll() {
    const vacancies = await this.vacanciesRepository.findAll({ include: { all: true } });
    return vacancies;
  }

  async findOne(id: number) {
    const vacancy = await this.vacanciesRepository.findOne({ where: { id }, include: { all: true } });
    return vacancy;
  }

  async update(id: number, updateDepartmentDto: UpdateVacancyDto) {
    const vacancy = await this.vacanciesRepository.update({ ...updateDepartmentDto }, { where: { id } });
    return vacancy;
  }

  async remove(id: number) {
    const vacancy = await this.vacanciesRepository.destroy({ where: { id } });
    return vacancy;
  }

  async subscribe(id: number, subscriber_id: number) {
    const existingSubscribe = await this.userVacanciesRepository.findOne({ where: { userId: subscriber_id, vacancyId: id } });

    if (existingSubscribe)
      return -1;

    const userVacancy = await this.userVacanciesRepository.create({ userId: subscriber_id, vacancyId: id });

    return userVacancy;
  }

  async findManyByAuthor(id: number) {
    const vacancies = await this.vacanciesRepository.findAll({ where: { author_id: id }, include: { all: true } });
    return vacancies;
  }
}
