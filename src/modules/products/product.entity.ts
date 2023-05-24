import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ProdutoCaracteristicaEntity } from './product-caracteristic.entity';
import { ImagemProdutoDTO } from './dto/CreateProduct.dto';
import { ProdutoImagem } from './product-image.entity';

@Entity({ name: 'produtos' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', length: 100, nullable: false })
  usuarioId: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  categoria: string;

  @OneToMany(
    () => ProdutoCaracteristicaEntity,
    (productCaracteristicEntity) => productCaracteristicEntity.product,
    { cascade: true, eager: true },
  )
  caracteristicas: ProdutoCaracteristicaEntity[];

  @OneToMany(() => ProdutoImagem, (produtoImagem) => produtoImagem.product, {
    cascade: true,
    eager: true,
  })
  images: ProdutoImagem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
