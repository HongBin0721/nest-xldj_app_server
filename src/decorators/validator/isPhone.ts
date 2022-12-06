import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import regular from '../../utils/regular';

// 配置验证注解
export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    // 注册一个装饰器
    registerDecorator({
      name: 'IsPhone',
      target: object.constructor,
      options: validationOptions,
      propertyName: propertyName,
      validator: IsPhoneConstraint,
    });
  };
}

// 配置验证程序
@ValidatorConstraint({ async: true })
export class IsPhoneConstraint implements ValidatorConstraintInterface {
  validate(value: string): Promise<boolean> | boolean {
    // 对草稿配置进行校验
    // 校验程序返回值为boolean类型则代数据格式错误
    return regular.isPhone(value);
  }
  // 验证失败时的默认错误信息
  defaultMessage(args: ValidationArguments): string {
    return `${args.property} 不是合法的手机号`;
  }
}
