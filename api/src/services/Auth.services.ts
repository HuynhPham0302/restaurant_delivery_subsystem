import bcrypt from 'bcrypt';
import prismaInstance from '../configs/database.config';
import { TLogin, TRegister } from '../dto/Auth.dto';
import JWT, { TJwtPayload } from '../utils/Jwt.utils';
import { Filter, Success } from '../utils/Response.utils';
import { UnauthorizedError } from '../utils/Error.utils';

class AuthService {
  private ProfileModel = prismaInstance.profile;

  async getProfile() {
    const profiles = await this.ProfileModel.findMany({
      include: {
        user: true,
      },
    });
    return Success(profiles, null, 200, 'Get profile success');
  }

  async register(data: TRegister) {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const profile = await this.ProfileModel.create({
      data: {
        email: data.email,
        password: hashedPassword,
        avatar: data.avatar,
        user: {
          create: {
            fullName: data.fullName,
            username: data.username,
            phone_number: data.phone_number,
            address: data.address,
            birth_date: data.birth_date,
            gender: data.gender,
          },
        },
      },
    });
    return Success(profile, null, 201, 'Register success');
  }

  // Use Local Strategy (Email & Password) login
  async login(data: TLogin) {
    const profile = await this.ProfileModel.findUnique({
      where: {
        email: data.email,
        provider: 'local',
        is_blocked: false,
        is_deleted: false,
      },
      include: {
        user: true,
      },
    });
    if (!profile) {
      throw new UnauthorizedError('Email or password is not valid!');
    }
    const isPasswordMatch = bcrypt.compareSync(data.password, profile.password!);
    if (!isPasswordMatch) {
      throw new UnauthorizedError('Email or password is not valid!');
    }
    // Generate JWT token
    const token = JWT.sign({ id: profile.id, provider: profile.provider, role: profile.role, email: profile.email });
    return Success({ ...profile, token }, null, 200, 'Login success');
  }

  async me(user: any) {
    return Success(user, null, 200, 'Get profile success');
  }

  // Use Google Strategy login
  async googleProvider(data: TJwtPayload) {
    const token = JWT.sign({
      id: data.id,
      provider: data.provider,
      role: data.role,
      email: data.email,
    });
    return Success({ ...data, token }, null, 200, 'Google login success');
  }

  async getAllUser(pagination: Filter, query: any) {
    const users = await this.ProfileModel.findMany({
      where: {
        is_deleted: false,
        ...query,
      },
      skip: pagination.limit * (pagination.page - 1),
      take: pagination.limit,
      orderBy: {
        [pagination.order]: pagination.sort,
      },
      include: {
        user: true,
      },
    });

    const total = await this.ProfileModel.count({
      where: {
        is_deleted: false,
      },
    });
    return Success(users, total, 200, 'Get all user success');
  }

  async updateUser(id: number, data: any) {
    const profile = await this.ProfileModel.update({
      where: {
        id,
      },
      data: data,
    });

    return Success(profile, null, 200, 'Update user success');
  }
}

export default new AuthService();
