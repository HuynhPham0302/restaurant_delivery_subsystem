import bcrypt from 'bcrypt';
import prismaInstance from '../configs/database.config';
import { TRegister } from '../dto/Auth.dto';
import TResponse from '../utils/Response.utils';

class AuthService {
  constructor(private ProfileModel = prismaInstance.profile) {
    this.ProfileModel = ProfileModel;
  }

  async getProfile() {
    const profiles = await this.ProfileModel.findMany({
      include: {
        user: true,
      },
    });
    return TResponse.success(profiles, 200, 'Get profile success');
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
    return TResponse.success(profile, 201, 'Register success');
  }
}

export default AuthService;
