import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class employees1639278581777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name: 'employees',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'id_occupation',
                    type: 'integer'
                },
                {
                    name: 'id_schooling',
                    type: 'integer'
                },
                {
                    name: 'id_departament',
                    type: 'integer'
                },
                {
                    name: 'costcenter',
                    type: 'integer'
                },
                {
                    name: 'telephone',
                    type: 'integer'
                },
                {
                    name: 'email',
                    type: 'varchar',   
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],

            foreignKeys: [
                {
                  name: 'EmployeesOccupation',
                  columnNames: ['id_occupation'],
                  referencedTableName: 'occupations',
                  referencedColumnNames: ['id'],
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
                },
                {
                    name: 'EmployeesSchooling',
                    columnNames: ['id_schooling'],
                    referencedTableName: 'schoolings',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    name: 'EmployeesDepartament',
                    columnNames: ['id_departament'],
                    referencedTableName: 'departaments',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('employees')
    }
}
