import * as userService from '../../src/services/userService';
import User from '../../src/repositories/userRepository';

export async function createToken(): Promise<string> {
  const user: User = {
    name: 'user_test',
    email: 'user_test' + Date.now() + '@gmail.com',
    password: '123',
    image: 'testImage.png',
    is_adm: false,
  };
  await userService.signUp(user);
  const { token } = await userService.login({
    email: user.email,
    password: user.password,
  });
  return token;
}
