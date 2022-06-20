import * as jwt from 'jsonwebtoken'

 type AuthenticationData = {
  id: string
}

export class Authenticator {
  public generateToken(
    input: AuthenticationData
  ): string {
    const token = jwt.sign(
      {
        id: input.id
      },
      process.env.JWT_KEY as string,
    );
    return token;
  }

  public getData(token: string): AuthenticationData {
    const data = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: data.id
    };
    return result;
  }
}