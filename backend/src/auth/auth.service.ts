import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    const { email, password } = registerDto;

    // Check if user exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get default role (you might want to create a default role first)
    const defaultRole = await this.roleRepository.findOne({
      where: { name: 'user' },
    });
    if (!defaultRole) {
      throw new Error('Default role not found');
    }

    // Create user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      roles: [defaultRole],
    });

    await this.userRepository.save(user);

    // Generate JWT
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map((role) => role.name),
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }
}
