import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../database/connection';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
};

interface UserCreationAttributes extends Optional < UserAttributes, "id" > {}

export class User extends Model < UserAttributes, UserCreationAttributes > implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async verifyPassword (password: string) {
    return await bcrypt.compare(password, this.password);
  }
  public static async generateHash (password: string) {
    return await bcrypt.hash(password, bcrypt.genSaltSync(5));
  }
}
User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(32),
    unique: true,
    allowNull: false,
    validate: {
      is: /^.{4,32}$/
    }
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      is: /^.{0,100}$/
    }
  }
}, {
  sequelize: connection,
  modelName: 'users'
});

User.beforeCreate(async (user, options) => {
  const hashedPassword = await User.generateHash(user.password);
  user.password = hashedPassword;
});
User.beforeUpdate(async (user) => {
  const hashedPassword = user.password ? await User.generateHash(user.password) : user.previous('password');
  user.password = hashedPassword;
});

export default User;