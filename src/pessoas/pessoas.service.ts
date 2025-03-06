import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const dadosPessoa = {
        nome: createPessoaDto.nome,
        passwordHash: createPessoaDto.password,
        email: createPessoaDto.email,
      };

      const novaPessoa = this.pessoaRepository.create(dadosPessoa);
      await this.pessoaRepository.save(novaPessoa);
      return novaPessoa;
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error) {
        const pgError = error as { code: string };
        if (pgError.code === '23505') {
          throw new ConflictException('E-mail já cadastrado');
        }
      }
      throw error;
    }
  }

  async findAll() {
    const pessoas = this.pessoaRepository.find({
      order: {
        id: 'DESC',
      },
    });
    return pessoas;
  }

  throwErrorIfNotFound(pessoa: Pessoa | null | undefined) {
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOne({
      where: { id },
    });

    this.throwErrorIfNotFound(pessoa);

    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const dadosPessoa = {
      nome: updatePessoaDto?.nome,
      passwordHash: updatePessoaDto?.password,
    };

    const pessoa = await this.pessoaRepository.preload({
      id,
      ...dadosPessoa,
    });

    this.throwErrorIfNotFound(pessoa);

    return this.pessoaRepository.save(pessoa as Pessoa);
  }

  async remove(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }

    return this.pessoaRepository.remove(pessoa);
  }
}
