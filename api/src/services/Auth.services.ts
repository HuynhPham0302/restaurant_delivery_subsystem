import bcrypt from 'bcrypt';
import prismaInstance from '../configs/database.config';
import { TLogin, TRegister } from '../dto/Auth.dto';
import JWT from '../utils/Jwt.utils';
import TRes from '../utils/Response.utils';
import { UnauthorizedError } from '../utils/Error.utils';

class AuthService {
  private ProfileModel = prismaInstance.profile;

  async getProfile() {
    const profiles = await this.ProfileModel.findMany({
      include: {
        user: true,
      },
    });
    return TRes.success(profiles, 200, 'Get profile success');
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
    return TRes.success(profile, 201, 'Register success');
  }

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
      throw new UnauthorizedError('Email or password is wrong');
    }
    const isPasswordMatch = bcrypt.compareSync(data.password, profile.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedError('Email or password is wrong');
    }
    const token = JWT.sign({ id: profile.id, provider: profile.provider, role: profile.role, email: profile.email });
    return TRes.success({ ...profile, token }, 200, 'Login success');
  }

  async googleProvider() {
    return TRes.success({}, 200, 'Google provider success');
  }
}

export default new AuthService();
