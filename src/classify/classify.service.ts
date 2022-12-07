import { Classify } from './../models/classify.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDto } from './dto/create.dto';
import { WhereOptions } from 'sequelize';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class ClassifyService {
  constructor(
    @InjectModel(Classify)
    private classifyModel: typeof Classify,
  ) {}
  async lists(opstion: { is_tree?: number; parent_id?: number }) {
    console.log(opstion);

    try {
      const WHERE: { parent_id?: number } = {};
      if (opstion.parent_id != null) {
        WHERE.parent_id = opstion.parent_id;
      }
      console.log('查询条件:', WHERE);

      const classify = await this.classifyModel.findAll({
        where: WHERE,
      });
      console.log(classify);

      if (opstion.is_tree === 1) {
        function toTree(list, root) {
          const arr = [];
          // 1.遍历
          list.forEach((item) => {
            console.log(item.dataValues);

            // 2.首次传入parent_id为0  判断list的parent_id是否为0 如果为空就是一级节点
            if (item.dataValues.parent_id === root) {
              // 找到之后就要去找item下面有没有子节点  以 item.id 作为 父 id, 接着往下找
              const children = toTree(list, item.dataValues.id);
              if (children.length > 0) {
                // 如果children的长度大于0,说明找到了子节点
                item.dataValues.children = children;
              }
              // 将item项, 追加到arr数组中
              arr.push(item);
            }
          });
          return arr;
        }

        const result = toTree(classify, opstion.parent_id);
        return result;
      } else if (opstion.is_tree === 0 || opstion.is_tree == null) {
        return classify;
      }
    } catch (error) {
      throw error;
    }
  }

  async create(opstion: { data: CreateDto }) {
    try {
      if (opstion.data.parent_id != null) {
        const count = await this.classifyModel.count({
          where: { id: opstion.data.parent_id },
        });
        if (count < 1) {
          throw {
            message: '父级分类不存在',
          };
        }
      }
      return await this.classifyModel.create(opstion.data);
    } catch (error) {
      throw error;
    }
  }

  async update(opstion: { where: WhereOptions; data: UpdateDto }) {
    try {
      return await this.classifyModel.update(opstion.data, {
        where: opstion.where,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(opstion: { where: WhereOptions }) {
    try {
      return await this.classifyModel.destroy({ where: opstion.where });
    } catch (error) {
      throw error;
    }
  }
}
